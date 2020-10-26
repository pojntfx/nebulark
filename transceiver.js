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
