import IPFS from "ipfs";

export default class Bus {
  #swarmMultiAddr = "";
  #prefix = "";
  #secretKey = "";

  #node = undefined;

  #onDiscoverPeer = () => {};
  #onConnectPeer = () => {};
  #onDisconnectPeer = () => {};

  constructor(
    swarmMultiAddr,
    prefix,
    secretKey,
    onDiscoverPeer,
    onConnectPeer,
    onDisconnectPeer
  ) {
    this.#swarmMultiAddr = swarmMultiAddr;
    this.#prefix = prefix;
    this.#secretKey = secretKey;

    this.#onDisconnectPeer = onDiscoverPeer;
    this.#onConnectPeer = onConnectPeer;
    this.#onDiscoverPeer = onDisconnectPeer;
  }

  static Builder = class {
    #swarmMultiaddr = "";
    #prefix = "";
    #secretKey = "";

    #onDiscoverPeer = () => {};
    #onConnectPeer = () => {};
    #onDisconnectPeer = () => {};

    setSwarmMultiaddr = (multiaddr) => {
      this.#swarmMultiaddr = multiaddr;

      return this;
    };

    setPrefix = (prefix) => {
      this.#prefix = prefix;

      return this;
    };

    setSecretKey = (secretKey) => {
      this.#secretKey = secretKey;

      return this;
    };

    setOnDiscoverPeer = (onDiscoverPeer) => {
      this.#onDiscoverPeer = onDiscoverPeer;

      return this;
    };

    setOnConnectPeer = (onConnectPeer) => {
      this.#onConnectPeer = onConnectPeer;

      return this;
    };

    setOnDisconnectPeer = (onDisconnectPeer) => {
      this.#onDisconnectPeer = onDisconnectPeer;

      return this;
    };

    build = () =>
      new Bus(
        this.#swarmMultiaddr,
        this.#prefix,
        this.#secretKey,
        this.#onDiscoverPeer,
        this.#onConnectPeer,
        this.#onDisconnectPeer
      );
  };

  connect = async () => {
    this.#node = await IPFS.create({
      repo: `${this.#prefix}-repo-${Math.random().toString(36).substring(7)}`,
      config: {
        Addresses: {
          Swarm: [this.#swarmMultiAddr],
        },
      },
    });

    this.#node.libp2p.on("peer:discovery", this.#onDiscoverPeer);
    this.#node.libp2p.connectionManager.on("peer:connect", this.#onConnectPeer);
    this.#node.libp2p.connectionManager.on(
      "peer:disconnect",
      this.#onDisconnectPeer
    );
  };

  ChannelBuilder = () => {
    const prefix = this.#prefix;
    const secretKey = this.#secretKey;
    const node = this.#node;

    return new (class {
      #onReceiveMessage = () => {};

      #channelName = "";

      setOnReceiveMessage = (onReceiveMessage) => {
        this.#onReceiveMessage = onReceiveMessage;

        return this;
      };

      setSuffix = (suffix) => {
        this.#channelName = `${prefix}:${suffix}`;

        return this;
      };

      build = () => ({
        subscribe: async () =>
          await node.pubsub.subscribe(
            this.#channelName,
            this.#onReceiveMessage
          ), // TODO: Decrypt message with SimpleCrypto and secretKey
        publish: async (message) =>
          await node.pubsub.publish(this.#channelName, message), // TODO: Encrypt message with SimpleCrypto and secretKey
        unsubscribe: async () =>
          await node.pubsub.unsubscribe(this.#channelName),
      });
    })();
  };
}
