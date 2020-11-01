import React from "react";
import styled from "styled-components";
import Ion from "../../components/ion";
import IPFS from "ipfs";

var QRCode = require("qrcode.react");

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

  // This data will be fetched from an API later on
  const nebulaID = "woody-wood-wood";
  const qrCode =
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO";
  const ions = "";
  const ionStatus = "";

  var uint8View = []
  function handleClick() {
    console.error("Executing spark");
  }

  function captureFile(event) {
    console.log("capture file...");
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {

      // setState is not defined
      //setState({ buffer: Buffer(reader.result) });

      uint8View = new Uint8Array(reader.result);

      console.log(uint8View);

      //console.log(uint8View[0]);
    };
  }

  async function onSubmit (event) {

    event.preventDefault();
    console.log("on submit...");

    const node = await IPFS.create()
    const version = await node.version()

    console.log('Version: ', version.version)

    const file = await node.add({
      path: 'hello.txt',
      content: uint8View
    })
    
    console.log('Added file: ', file.path, file.cid.toString())
    node.stop()
    getResult()
  }


  // This works without changes 
  async function getResult() {

    const node = await IPFS.create()
    
    const stream = node.cat('QmdBQ2eBqvTtr714jygcGzhbvoMR96pch8NbJn1eSxmQNH')
    let data = ''

    for await (const chunk of stream) {

      data += chunk.toString()
    }

    console.log(data)

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
