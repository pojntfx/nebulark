import React from "react";
import styled from "styled-components";
import Ion from "../../components/ion";
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
  `

  // This data will be fetched from an API later on
  const nebulaID = "woody-wood-wood";
  const qrCode =
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO";
  const ions = "";
  const ionStatus = "";

  function handleClick() {
    console.error("Executing spark");
  }

  return (
    <>
      <Body>
        <Header> nebulark / {nebulaID}</Header>
        <Category>Setup</Category>
        <Divider />

        <QRCode value={qrCode} />
        <br></br>
        <QRCodeCaption href="https://google.com">https://nebulark.spark/{nebulaID}</QRCodeCaption>
        <Ion ionName="John's Phone" ionStatus={true} />
        <Button onClick={handleClick}>
          Execute
        </Button>
      </Body>
    </>
  );
}

export default Control;
