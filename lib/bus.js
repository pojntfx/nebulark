import IPFS from "ipfs";


export default class Bus {
  #prefix = "";
  #key = "";

  #node = undefined;

  constructor(prefix, key) {
    this.#prefix = prefix;
    this.#key = key;
  }

  #getChannelName = (prefix, suffix) => `${prefix}:${suffix}`;

  connect = async () => {
    this.#node = await IPFS.create();
  };

  getChannel = async (suffix) => {
    const channelName = this.#getChannelName(this.#prefix, suffix);

    return {
      subscribe: async (cb) =>
        await this.#node.pubsub.subscribe(channelName, cb), // TODO: Decrypt message
      publish: async (message) =>
        await this.#node.pubsub.publish(channelName, message), // TODO: Encrypt message
      unsubscribe: async () => await this.#node.pubsub.unsubscribe(channelName),
    };
  };
}
