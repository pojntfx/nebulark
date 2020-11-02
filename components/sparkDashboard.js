import React from "react";
import styled from "styled-components";
import IPFS from "ipfs";

const Button = styled.button`
  background-color: green;
  color: white;
  border: none;
  border-radius: 2px;
`;

var uint8View = [];
var fileHash = null;

function handleClick() {
  alert("Executing spark");
}

function captureFile(event) {
  event.preventDefault();

  const file = event.target.files[0];
  const reader = new window.FileReader();

  reader.readAsArrayBuffer(file);
  reader.onloadend = () => {
    uint8View = new Uint8Array(reader.result);
  };
}

async function onSubmit(event) {
  event.preventDefault();

  const node = await IPFS.create();
  const file = await node.add({
    path: "hello.txt",
    content: uint8View,
  });
  fileHash = file.cid.toString();
  console.log("https://ipfs.io/ipfs/" + fileHash);

  //node.stop();
}

function SparkDashboard() {
  return (
    <>
      <Button onClick={handleClick}>Execute</Button>
      <img src="" alt="" />
      <h2>Upload Image</h2>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={captureFile} />
        <input type="submit" />
      </form>
    </>
  );
}

export default SparkDashboard;
