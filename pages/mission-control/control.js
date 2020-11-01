import React from "react";
import styled from "styled-components";
import Ion from "../../components/ion";
import IPFS from "ipfs";
import QRCode from "qrcode.react";

function Control() {
  const Body = styled.body`
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    color: #404240;
  `;

  const Header = styled.h1`
    font-size: 20px;
  `;

  const Divider = styled.hr`
    background-color: #404240;
    height: 5px;
    border: none;
    border-radius: 2px;
  `;

  const QRCodeCaption = styled.a`
    color: #404240;
    font-size: 12px;
  `;

  const Category = styled.h1`
    font-size: 20px;
    text-align: right;
  `;

  const Button = styled.button`
    background-color: green;
    color: white;
    border: none;
    border-radius: 2px;
  `;

  const nebulaID = "woody-wood-wood";
  const qrCode =
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO";
  const ions = "";
  const ionStatus = "";

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
    console.log(fileHash)

    node.stop();
  }

  return (
    <>
      <Body>
        <Header> nebulark / {nebulaID}</Header>
        <Category>Setup</Category>
        <Divider />

        <QRCode value={qrCode} />
        <br></br>
        <QRCodeCaption href="https://google.com">
          https://nebulark.spark/{nebulaID}
        </QRCodeCaption>
        <Ion ionName="John's Phone" ionStatus={true} />

        <Button onClick={handleClick}>Execute</Button>
        <h1>Your Image</h1>
        <p>This image is stored on IPFS & The Etherium Blockchain!</p>
        <img src="" alt="" />
        <h2>Upload Image</h2>
        <form onSubmit={onSubmit}>
          <input type="file" onChange={captureFile} />
          <input type="submit" />
        </form>
      </Body>
    </>
  );
}

export default Control;
