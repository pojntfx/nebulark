import React from "react";
import styled from "styled-components";
import IPFS from "ipfs";

const Button = styled.button`
  background-color: green;
  color: white;
  border: none;
  border-radius: 2px;
`;

var fileHash = null;

function SparkDashboard() {
  const [string, setString] = React.useState("");

  function handleClick() {
    alert("Executing spark");
  }

  async function captureFile(event) {
    event.preventDefault();

    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const node = await IPFS.create();
      const file = await node.add({
        path: "hello.txt",
        content: new Uint8Array(reader.result),
      });
      fileHash = file.cid.toString();
      console.log("https://ipfs.io/ipfs/" + fileHash);
    };
  }

  function captureFileJSON(event) {
    event.preventDefault();

    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setString(new TextDecoder().decode(new Uint8Array(reader.result)));
    };
  }

  return (
    <>
      <input type="file" onChange={(event) => captureFile(event)}></input>
      <br />
      <input type="file" onChange={(event) => captureFileJSON(event)}></input>
      <input
        type="text"
        value={string}
        onChange={(event) => setString(event.target.value)}
      ></input>
      <br />

      <Button onClick={handleClick}>Execute</Button>
    </>
  );
}

export default SparkDashboard;
