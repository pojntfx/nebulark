import Link from "next/link";
import React from "react";
import Transceiver from "../../lib/transceiver";

function NetworkingExamples() {
  const [sender, setSender] = React.useState();
  const [receiver, setReceiver] = React.useState();

  const [senderMessages, setSenderMessages] = React.useState([]);
  const [receiverMessages, setReceiverMessages] = React.useState([]);

  const [senderConnected, setSenderConnected] = React.useState(false);
  const [receiverConnected, setReceiverConnected] = React.useState(false);

  const [senderOffer, setSenderOffer] = React.useState("");
  const [senderAnswer, setSenderAnswer] = React.useState("");

  const [senderMessageContent, setSenderMessageContent] = React.useState("");

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

  React.useState(() => {
    setSender(
      new Transceiver.Builder()
        .setConfig(config)
        .useManager()
        .setOnConnect(() => {
          console.log("connected");

          setSenderConnected(true);
        })
        .setOnMessage((message) => {
          console.log("received message");

          setSenderMessages((oldMessages) => [
            ...oldMessages,
            `[${new Date().toLocaleString()}] <receiver> ${atob(message.data)}`,
          ]);
        })
        .setOnDisconnect(() => {
          console.log("disconnected");

          setSenderConnected(false);
        })
        .build()
    );
    setReceiver(
      new Transceiver.Builder()
        .setConfig(config)
        .useWorker()
        .setOnConnect(() => {
          console.log("connected");

          setReceiverConnected(true);
        })
        .setOnMessage((message) => {
          console.log("received message");

          setReceiverMessages((oldMessages) => [
            ...oldMessages,
            `[${new Date().toLocaleString()}] <sender> ${atob(message.data)}`,
          ]);
        })
        .setOnDisconnect(() => {
          console.log("disconnected");

          setReceiverConnected(false);
        })
        .build()
    );
  }, []);

  return (
    <>
      <Link href="/">🔙 Back</Link>

      <h1>Nebulark Networking Examples</h1>

      {/* Instructions */}
      <section id="instructions">
        <h2>Instructions</h2>

        <em>
          Please ensure that you are in a <strong>secure context</strong> (i.e.
          a HTTPS secured page or localhost), otherwise the examples below won't
          work.
        </em>

        <ol>
          <li>Generate offer on sender</li>
          <li>Copy offer to receiver</li>
          <li>
            Generate answer on receiver (on this page, on this page in another
            tab, on another device, ...)
          </li>
          <li>Copy answer to sender</li>
          <li>Connect to receiver from sender</li>
        </ol>
      </section>

      {/* Sender */}
      <section id="sender">
        <details>
          <summary>Sender</summary>

          <h2>Sender</h2>

          <button
            onClick={async () => {
              console.log("generating offer");

              setSenderOffer(btoa(await sender.getConnectionInfo()));
            }}
          >
            Generate offer
          </button>
          <br />
          <textarea
            placeholder="Sender's offer"
            value={senderOffer}
            readOnly
            rows="5"
            cols="50"
          ></textarea>
          <br />
          <textarea
            placeholder="Receiver's answer"
            rows="5"
            cols="50"
            value={senderAnswer}
            onChange={(e) => setSenderAnswer(e.target.value)}
          ></textarea>
          <br />
          <button
            onClick={() => {
              console.log("connecting");

              sender.connect(
                new RTCSessionDescription({
                  type: "answer",
                  sdp: atob(senderAnswer),
                })
              );
            }}
          >
            Connect to receiver
          </button>
          <span>{senderConnected ? "Connected" : "Disconnected"}</span>
          <br />
          <input
            type="text"
            placeholder="Message to send to receiver"
            value={senderMessageContent}
            onChange={(e) => setSenderMessageContent(e.target.value)}
          />
          <button
            onClick={() => {
              setSenderMessageContent("");

              sender.sendMessage(btoa(senderMessageContent));
            }}
          >
            Send message to receiver
          </button>
          <br />
          <h3>Messages</h3>
          <ul>
            {senderMessages.map((message, i) => (
              <li key={i}>{message}</li>
            ))}
          </ul>
        </details>
      </section>

      {/* Receiver */}
      <section id="receiver">
        <details>
          <summary>Receiver</summary>

          <h2>Receiver</h2>

          <textarea
            placeholder="Sender's offer"
            id="receiver__offer"
            rows="5"
            cols="50"
          ></textarea>
          <br />
          <button id="receiver__generate-answer">Generate answer</button>
          <br />
          <textarea
            placeholder="Receiver's answer"
            id="receiver__answer"
            readOnly
            rows="5"
            cols="50"
          ></textarea>
          <br />
          <input
            type="text"
            placeholder="Message to send to sender"
            id="receiver__message-content"
          />
          <button id="receiver__message-send">Send message to sender</button>
          <span id="receiver__connection_status">Disconnected</span>
          <br />
          <h3>Messages</h3>
          <ul id="receiver_messages"></ul>
        </details>
      </section>
    </>
  );
}

export default NetworkingExamples;
