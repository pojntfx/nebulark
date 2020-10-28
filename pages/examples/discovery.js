import Link from "next/link";
import React from "react";
import Bus from "../../lib/bus";

function DiscoveryExamples() {
  const [bus, setBus] = React.useState();

  const [swarmMultiaddr, setSwarmMultiaddr] = React.useState(
    "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star"
  );
  const [secretKey, setSecretKey] = React.useState("");
  const [connected, setConnected] = React.useState(false);

  const [channel, setChannel] = React.useState();
  const [roomName, setRoomName] = React.useState("");
  const [joined, setJoined] = React.useState("");

  const [messageContent, setMessageContent] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  return (
    <>
      <Link href="/">🔙 Back</Link>

      <h1>Nebulark Discovery Examples</h1>

      <section id="instructions">
        <em>
          Please ensure that you are in a <strong>secure context</strong> (i.e.
          a HTTPS secured page or localhost), otherwise the examples below might
          not work. Please also note that if you use the public WebRTC star
          below, the initial connection establishment might take a very long
          time. For more information, please check out the{" "}
          <a href="https://github.com/pojntfx/nebulark#discovery">README</a>.
        </em>
      </section>

      <section id="broadcast-room">
        <h2>Network Connection</h2>
        <input
          type="text"
          placeholder="Swarm multiaddr"
          value={swarmMultiaddr}
          onChange={(e) => setSwarmMultiaddr(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Secret key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
        <button
          onClick={async () => {
            const bus = new Bus.Builder()
              .setSwarmMultiaddr(swarmMultiaddr)
              .setPrefix("nebulark-discovery-examples")
              .setSecretKey(secretKey)
              .setOnDiscoverPeer((peer) => console.log("discovered peer", peer))
              .setOnConnectPeer((peer) =>
                console.log("connected to peer", peer)
              )
              .setOnDisconnectPeer((peer) =>
                console.log("disconnected from peer", peer)
              )
              .build();

            await bus.connect();

            setBus(bus);
            setConnected(true);
          }}
        >
          Connect
        </button>
        <span>{connected ? "✅ Connected" : "❌ Disconnected"}</span>

        {connected && (
          <>
            <h2>Room Connection</h2>

            <input
              type="text"
              placeholder="Room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button
              onClick={async () => {
                const channel = bus
                  .ChannelBuilder()
                  .setOnReceiveMessage(async (message) => {
                    console.log("received message");

                    setMessages((oldMessages) => [
                      ...oldMessages,
                      new TextDecoder().decode(message.data),
                    ]);
                  })
                  .setSuffix(roomName)
                  .build();

                await channel.subscribe();

                setChannel(channel);
                setJoined(true);
              }}
            >
              Join room
            </button>
            <span>{joined ? "✅ Joined" : "❌ Not yet joined"}</span>
            <br />

            {joined && (
              <>
                <input
                  type="text"
                  placeholder="Message content"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                />
                <button
                  onClick={async () => {
                    console.group("sending message");

                    await channel.publish(
                      new TextEncoder().encode(messageContent)
                    );

                    setMessageContent("");
                  }}
                >
                  Send message
                </button>

                <h3>Messages</h3>
                <ul>
                  {messages.map((message, i) => (
                    <li key={i}>{message}</li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default DiscoveryExamples;
