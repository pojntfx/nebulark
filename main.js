class Transceiver {
  #config = {};
  #connection = undefined;
  #sendChannel = undefined;
  #receiveChannel = undefined;
  #onConnect = () => {};
  #onMessage = () => {};
  #onDisconnect = () => {};

  constructor(config) {
    this.#config = config;
  }

  offer = async () =>
    new Promise(async (res) => {
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
    });

  answer = async (offer) =>
    new Promise(async (res) => {
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
    });

  connect = async (answer) => {
    this.#connection.setRemoteDescription(answer);
  };

  sendMessage = async (message) => {
    this.#sendChannel && (await this.#sendChannel.send(message));
    this.#receiveChannel && (await this.#receiveChannel.channel.send(message));
  };

  setOnMessage = (onMessage) => (this.#onMessage = onMessage);

  setOnConnect = (onConnect) => (this.#onConnect = onConnect);

  setOnDisconnect = (onDisconnect) => (this.#onDisconnect = onDisconnect);
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

const sender = new Transceiver(config);

sender.setOnConnect(() => {
  console.log("connected");

  document.getElementById("sender__connection_status").innerText = "Connected";
});

sender.setOnMessage((message) => {
  console.log("received message");

  const messageElement = document.createElement("li");
  messageElement.innerText = `[${new Date().toLocaleString()}] <receiver> ${atob(
    message.data
  )}`;

  document.getElementById("sender_messages").appendChild(messageElement);
});

sender.setOnDisconnect(() => {
  console.log("disconnected");

  document.getElementById("sender__connection_status").innerText =
    "Disconnected";
});

document.getElementById("sender__generate-offer").onclick = async () => {
  console.log("generating offer");

  const offer = await sender.offer();

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

const receiver = new Transceiver(config);

receiver.setOnConnect(() => {
  console.log("connected");

  document.getElementById("receiver__connection_status").innerText =
    "Connected";
});

receiver.setOnMessage((message) => {
  console.log("received message");

  const messageElement = document.createElement("li");
  messageElement.innerText = `[${new Date().toLocaleString()}] <receiver> ${atob(
    message.data
  )}`;

  document.getElementById("receiver_messages").appendChild(messageElement);
});

receiver.setOnDisconnect(() => {
  console.log("disconnected");

  document.getElementById("receiver__connection_status").innerText =
    "Disconnected";
});

document.getElementById("receiver__generate-answer").onclick = async () => {
  console.log("generating answer");

  const answer = await receiver.answer(
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
