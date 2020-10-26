import Link from "next/link";
import React from "react";

function NetworkingExamples() {
  const [sender, setSender] = React.useState();
  const [receiver, setReceiver] = React.useState();

  return (
    <>
      <Link href="/">🔙 Back</Link>

      <h1>Nebulark Networking Examples</h1>

      <section id="instructions">
        <h2>Instructions</h2>

        <ol>
          <li>Generate offer on sender</li>
          <li>Copy offer to receiver</li>
          <li>Generate answer on receiver</li>
          <li>Copy answer to sender</li>
          <li>Connect to receiver from sender</li>
        </ol>
      </section>
    </>
  );
}

export default NetworkingExamples;
