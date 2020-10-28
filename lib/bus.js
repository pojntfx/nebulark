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
    this.#node = await IPFS.create({
      repo: `${this.#prefix}-repo-${Math.random().toString(36).substring(7)}`,
      config: {
        Addresses: {
          Swarm: ["/ip4/127.0.0.1/tcp/13579/wss/p2p-webrtc-star"],
        },
      },
    });
  };

  getChannel = async (suffix) => {
    const channelName = this.#getChannelName(this.#prefix, suffix);

    return {
      subscribe: async (cb) =>
        await this.#node.pubsub.subscribe(channelName, cb), // TODO: Decrypt message with SimpleCrypto
      publish: async (message) =>
        await this.#node.pubsub.publish(channelName, message), // TODO: Encrypt message with SimpleCrypto
      unsubscribe: async () => await this.#node.pubsub.unsubscribe(channelName),
    };
  };
}
