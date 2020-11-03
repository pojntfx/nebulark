import React from "react";
import styled from "styled-components";
import IPFS from "ipfs";

const Button = styled.button`
  background-color: green;
  color: white;
  border: none;
  border-radius: 2px;
`;

const TextArea = styled.textarea`
  width: 200px;
  height: 50px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

function SparkDashboard() {
  const [string, setString] = React.useState("");
  const [readerResult, setReaderResult] = React.useState();

  var fileHash = null;
  var fileHashJSON = null;

  async function handleExecute() {
    const node = await IPFS.create();
    const file = await node.add({
      path: "hello.txt",
      content: new Uint8Array(readerResult),
    });
    fileHash = file.cid.toString();

    const fileJSON = await node.add({
      path: "hello.txt",
      content: new Uint8Array(new TextEncoder().encode(string)),
    });
    fileHashJSON = fileJSON.cid.toString();

    console.log(fileHash);
    console.log(fileHashJSON);
  }

  async function captureFile(event) {
    event.preventDefault();

    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      setReaderResult(reader.result);
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
      <br/>
      <TextArea
        type="text"
        value={string}
        onChange={(event) => setString(event.target.value)}
      ></TextArea>
      <br />

      <Button onClick={handleExecute}>Execute</Button>
    </>
  );
}

export default SparkDashboard;
