class Transceiver {
  #config = {};
  #connection = undefined;
  #sendChannel = undefined;

  constructor(config) {
    this.#config = config;
  }

  generateOffer = async () => {
    console.log("generating offer");

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

const transceiver = new Transceiver(config);

document.getElementById("sender__generate-offer").onclick = async () => {
  const offer = await transceiver.generateOffer();

  document.getElementById("sender__offer").innerText = offer.sdp;
};
