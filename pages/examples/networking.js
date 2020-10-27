import Link from "next/link";
import React from "react";
import Transceiver from "../../lib/transceiver";

function NetworkingExamples() {
  const [manager, setManager] = React.useState();
  const [worker, setWorker] = React.useState();

  const [managerMessages, setManagerMessages] = React.useState([]);
  const [workerMessages, setWorkerMessages] = React.useState([]);

  const [managerConnected, setManagerConnected] = React.useState(false);
  const [workerConnected, setWorkerConnected] = React.useState(false);

  const [managerOffer, setManagerOffer] = React.useState("");
  const [workerOffer, setWorkerOffer] = React.useState("");

  const [managerAnswer, setManagerAnswer] = React.useState("");
  const [workerAnswer, setWorkerAnswer] = React.useState("");

  const [managerMessageContent, setManagerMessageContent] = React.useState("");
  const [workerMessageContent, setWorkerMessageContent] = React.useState("");

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
    setManager(
      new Transceiver.Builder()
        .setConfig(config)
        .useManager()
        .setOnConnect(() => {
          console.log("connected");

          setManagerConnected(true);
        })
        .setOnMessage((message) => {
          console.log("received message");

          setManagerMessages((oldMessages) => [
            ...oldMessages,
            `[${new Date().toLocaleString()}] <worker> ${atob(message.data)}`,
          ]);
        })
        .setOnDisconnect(() => {
          console.log("disconnected");

          setManagerConnected(false);
        })
        .build()
    );
    setWorker(
      new Transceiver.Builder()
        .setConfig(config)
        .useWorker()
        .setOnConnect(() => {
          console.log("connected");

          setWorkerConnected(true);
        })
        .setOnMessage((message) => {
          console.log("received message");

          setWorkerMessages((oldMessages) => [
            ...oldMessages,
            `[${new Date().toLocaleString()}] <manager> ${atob(message.data)}`,
          ]);
        })
        .setOnDisconnect(() => {
          console.log("disconnected");

          setWorkerConnected(false);
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
          a HTTPS secured page or localhost), otherwise the examples below might
          not work.
        </em>

        <ol>
          <li>Generate offer on manager</li>
          <li>Copy offer to worker</li>
          <li>
            Generate answer on worker (on this page, on this page in another
            tab, on another device, ...)
          </li>
          <li>Copy answer to manager</li>
          <li>Connect to worker from manager</li>
          <li>Try it out and send some messages back and forth!</li>
        </ol>
      </section>

      {/* Manager */}
      <section id="manager">
        <details>
          <summary>Manager</summary>

          <h2>Manager</h2>

          <button
            onClick={async () => {
              console.log("generating offer");

              setManagerOffer(btoa((await manager.getConnectionInfo()).sdp));
            }}
          >
            Generate offer
          </button>
          <br />
          <textarea
            placeholder="Manager's offer"
            value={managerOffer}
            readOnly
            rows="5"
            cols="50"
          ></textarea>
          <br />
          <textarea
            placeholder="Worker's answer"
            rows="5"
            cols="50"
            value={managerAnswer}
            onChange={(e) => setManagerAnswer(e.target.value)}
          ></textarea>
          <br />
          <button
            onClick={() => {
              console.log("connecting");

              manager.connect(
                new RTCSessionDescription({
                  type: "answer",
                  sdp: atob(managerAnswer),
                })
              );
            }}
          >
            Connect to worker
          </button>
          <br />
          {managerConnected ? (
            <>
              <span>✅ Connected</span>

              <input
                type="text"
                placeholder="Message to send to worker"
                value={managerMessageContent}
                onChange={(e) => setManagerMessageContent(e.target.value)}
              />
              <button
                onClick={() => {
                  console.log("sending message");

                  setManagerMessageContent("");

                  manager.sendMessage(btoa(managerMessageContent));
                }}
              >
                Send message to worker
              </button>
              <br />
              <h3>Messages</h3>
              <ul>
                {managerMessages.map((message, i) => (
                  <li key={i}>{message}</li>
                ))}
              </ul>
            </>
          ) : (
            <span>❌ Disconnected</span>
          )}
        </details>
      </section>

      {/* Worker */}
      <section id="worker">
        <details>
          <summary>Worker</summary>

          <h2>Worker</h2>

          <textarea
            placeholder="Manager's offer"
            value={workerOffer}
            onChange={(e) => setWorkerOffer(e.target.value)}
            rows="5"
            cols="50"
          ></textarea>
          <br />
          <button
            onClick={async () => {
              console.log("generating answer");

              setWorkerAnswer(
                btoa(
                  (
                    await worker.getConnectionInfo(
                      new RTCSessionDescription({
                        type: "offer",
                        sdp: atob(workerOffer),
                      })
                    )
                  ).sdp
                )
              );
            }}
          >
            Generate answer
          </button>
          <br />
          <textarea
            placeholder="Worker's answer"
            value={workerAnswer}
            readOnly
            rows="5"
            cols="50"
          ></textarea>
          <br />
          {workerConnected ? (
            <>
              <span>✅ Connected</span>

              <br />
              <input
                type="text"
                placeholder="Message to send to manager"
                value={workerMessageContent}
                onChange={(e) => setWorkerMessageContent(e.target.value)}
              />
              <button
                onClick={() => {
                  console.log("sending message");

                  setWorkerMessageContent("");

                  worker.sendMessage(btoa(workerMessageContent));
                }}
              >
                Send message to manager
              </button>
              <br />
              <h3>Messages</h3>
              <ul>
                {workerMessages.map((message, i) => (
                  <li key={i}>{message}</li>
                ))}
              </ul>
            </>
          ) : (
            <span>❌ Disconnected</span>
          )}
        </details>
      </section>
    </>
  );
}

export default NetworkingExamples;
