export const TRANSCEIVER_TYPE_MANAGER = 0;
export const TRANSCEIVER_TYPE_WORKER = 1;

export default class Transceiver {
  #config = {};
  #transceiverType = "";

  #connection = undefined;
  #sendChannel = undefined;
  #receiveChannel = undefined;

  #onConnect = () => {};
  #onMessage = () => {};
  #onDisconnect = () => {};

  constructor(config, transceiverType, onConnect, onMessage, onDisconnect) {
    this.#config = config;
    this.#transceiverType = transceiverType;

    this.#onConnect = onConnect;
    this.#onMessage = onMessage;
    this.#onDisconnect = onDisconnect;
  }

  static Builder = class {
    #config = {};
    #transceiverType = TRANSCEIVER_TYPE_MANAGER;

    #onConnect = () => {};
    #onMessage = () => {};
    #onDisconnect = () => {};

    setConfig = (config) => {
      this.#config = config;

      return this;
    };

    useManager = () => {
      this.#transceiverType = TRANSCEIVER_TYPE_MANAGER;

      return this;
    };

    useWorker = () => {
      this.#transceiverType = TRANSCEIVER_TYPE_WORKER;

      return this;
    };

    setOnMessage = (onMessage) => {
      this.#onMessage = onMessage;

      return this;
    };

    setOnConnect = (onConnect) => {
      this.#onConnect = onConnect;

      return this;
    };

    setOnDisconnect = (onDisconnect) => {
      this.#onDisconnect = onDisconnect;

      return this;
    };

    build = () =>
      new Transceiver(
        this.#config,
        this.#transceiverType,
        this.#onConnect,
        this.#onMessage,
        this.#onDisconnect
      );
  };

  /**
   * Get the connection info
   * @param {*} offer (Only required if the transceiver is a worker) Offer to compute answer to
   */
  getConnectionInfo = async (offer) =>
    new Promise(async (res) => {
      switch (this.#transceiverType) {
        case TRANSCEIVER_TYPE_MANAGER: {
          this.#connection = new RTCPeerConnection(this.#config);
          this.#connection.onicecandidate = async (e) => {
            e.candidate || res(this.#connection.localDescription);
          };

          this.#sendChannel = this.#connection.createDataChannel("sendChannel");
          this.#sendChannel.onopen = this.#onConnect;
          this.#sendChannel.onmessage = this.#onMessage;
          this.#sendChannel.onclose = this.#onDisconnect;

          const offer = await this.#connection.createOffer();
          this.#connection.setLocalDescription(offer);

          break;
        }
        case TRANSCEIVER_TYPE_WORKER: {
          this.#connection = new RTCPeerConnection(this.#config);
          this.#connection.onicecandidate = async (e) => {
            e.candidate || res(this.#connection.localDescription);
          };

          this.#connection.setRemoteDescription(offer);
          this.#connection.ondatachannel = async (channel) => {
            this.#receiveChannel = channel;
            this.#receiveChannel.channel.onopen = this.#onConnect;
            this.#receiveChannel.channel.onmessage = this.#onMessage;
            this.#receiveChannel.channel.onclose = this.#onDisconnect;
          };

          const answer = await this.#connection.createAnswer();
          this.#connection.setLocalDescription(answer);

          break;
        }
      }
    });

  /**
   * Connect to a worker
   * @param {*} answer (Only required if the transceiver is a manager) Answer to use for connection
   */
  connect = async (answer) => {
    this.#transceiverType === TRANSCEIVER_TYPE_MANAGER &&
      this.#connection.setRemoteDescription(answer);
  };

  sendMessage = async (message) => {
    switch (this.#transceiverType) {
      case TRANSCEIVER_TYPE_MANAGER: {
        await this.#sendChannel.send(message);

        break;
      }
      case TRANSCEIVER_TYPE_WORKER: {
        await this.#receiveChannel.channel.send(message);

        break;
      }
    }
  };
}

const config = {
  iceServers: [
    {
      url: "stun:global.stun.twilio.com:3478?transport=udp",
      urls: "stun:global.stun.twilio.com:3478?transport=udp",
    },
    {
      url: "turn:global.turn.twilio.com:3478?transport=udp",
      username:
        "cd4dfc8127082a04b865f5607c031410726df919c4ced0f93619be0ed2b811b3",
      urls: "turn:global.turn.twilio.com:3478?transport=udp",
      credential: "h/sD5UftD1H2Tjlux/u6kqdqsIleXtEEZthVgY/BciA=",
    },
    {
      url: "turn:global.turn.twilio.com:3478?transport=tcp",
      username:
        "cd4dfc8127082a04b865f5607c031410726df919c4ced0f93619be0ed2b811b3",
      urls: "turn:global.turn.twilio.com:3478?transport=tcp",
      credential: "h/sD5UftD1H2Tjlux/u6kqdqsIleXtEEZthVgY/BciA=",
    },
    {
      url: "turn:global.turn.twilio.com:443?transport=tcp",
      username:
        "cd4dfc8127082a04b865f5607c031410726df919c4ced0f93619be0ed2b811b3",
      urls: "turn:global.turn.twilio.com:443?transport=tcp",
      credential: "h/sD5UftD1H2Tjlux/u6kqdqsIleXtEEZthVgY/BciA=",
    },
  ],
};

const sender = new Transceiver.Builder()
  .setConfig(config)
  .useManager()
  .setOnConnect(() => {
    console.log("connected");

    document.getElementById("sender__connection_status").innerText =
      "Connected";
  })
  .setOnMessage((message) => {
    console.log("received message");

    const messageElement = document.createElement("li");
    messageElement.innerText = `[${new Date().toLocaleString()}] <receiver> ${atob(
      message.data
    )}`;

    document.getElementById("sender_messages").appendChild(messageElement);
  })
  .setOnDisconnect(() => {
    console.log("disconnected");

    document.getElementById("sender__connection_status").innerText =
      "Disconnected";
  })
  .build();

document.getElementById("sender__generate-offer").onclick = async () => {
  console.log("generating offer");

  const offer = await sender.getConnectionInfo();

  document.getElementById("sender__offer").value = btoa(offer.sdp);
};

document.getElementById("sender__connect").onclick = async () => {
  console.log("connecting");

  await sender.connect(
    new RTCSessionDescription({
      type: "answer",
      sdp: atob(document.getElementById("sender__answer").value),
    })
  );
};

document.getElementById("sender__message-send").onclick = async () => {
  console.log("sending message");

  await sender.sendMessage(
    btoa(document.getElementById("sender__message-content").value)
  );

  document.getElementById("sender__message-content").value = "";
};

const receiver = new Transceiver.Builder()
  .setConfig(config)
  .useWorker()
  .setOnConnect(() => {
    console.log("connected");

    document.getElementById("receiver__connection_status").innerText =
      "Connected";
  })
  .setOnMessage((message) => {
    console.log("received message");

    const messageElement = document.createElement("li");
    messageElement.innerText = `[${new Date().toLocaleString()}] <receiver> ${atob(
      message.data
    )}`;

    document.getElementById("receiver_messages").appendChild(messageElement);
  })
  .setOnDisconnect(() => {
    console.log("disconnected");

    document.getElementById("receiver__connection_status").innerText =
      "Disconnected";
  })
  .build();

document.getElementById("receiver__generate-answer").onclick = async () => {
  console.log("generating answer");

  const answer = await receiver.getConnectionInfo(
    new RTCSessionDescription({
      type: "offer",
      sdp: atob(document.getElementById("receiver__offer").value),
    })
  );

  document.getElementById("receiver__answer").value = btoa(answer.sdp);
};

document.getElementById("receiver__message-send").onclick = async () => {
  console.log("sending message");

  await receiver.sendMessage(
    btoa(document.getElementById("receiver__message-content").value)
  );

  document.getElementById("receiver__message-content").value = "";
};
