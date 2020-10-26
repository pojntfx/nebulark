class Transceiver {
  #config = {};
  #connection = undefined;
  #sendChannel = undefined;

  constructor(config) {
    this.#config = config;
  }

  generateOffer = async () => {
    this.#connection = new RTCPeerConnection(this.#config);
    this.#sendChannel = this.#connection.createDataChannel("sendChannel");

    this.#sendChannel.onopen = async () => {
      console.log("send channel opened");
    };
    this.#sendChannel.onclose = async () => {
      console.log("send channel closed");
    };

    const offer = this.#connection.createOffer();
    this.#connection.setLocalDescription(offer);

    return offer;
  };

  generateAnswer = async (offer) => {
    this.#connection = new RTCPeerConnection(this.#config);
    this.#connection.setRemoteDescription(offer);

    this.#connection.ondatachannel = async () => {
      console.log("received data channel");
    };

    const answer = this.#connection.createAnswer();
    this.#connection.setLocalDescription(answer);

    return answer;
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

const sender = new Transceiver(config);

document.getElementById("sender__generate-offer").onclick = async () => {
  console.log("generating offer");

  const offer = await sender.generateOffer();

  document.getElementById("sender__offer").value = offer.sdp;
};

const receiver = new Transceiver(config);

document.getElementById("receiver__generate-answer").onclick = async () => {
  console.log("generating answer");

  const answer = await receiver.generateAnswer({
    type: "offer",
    sdp: document.getElementById("receiver__offer").value,
  });

  document.getElementById("receiver__answer").value = answer.sdp;
};
