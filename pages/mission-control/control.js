import React from "react";
import styled from "styled-components";
var QRCode = require('qrcode.react');

function Control() {

  const Body = styled.body`
    font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
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

  // This data will be fetched from an API later on
  const nebulaID = "woody-wood-wood";
  const qrCode = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO";
  const ions = "";
  const ionStatus = "";

  return (
    <>
    <Body>
        <Header> nebulark / {nebulaID} </Header>
        <Divider />

        <QRCode value={qrCode} />
    </Body>
      
    </>
  );
}

export default Control;
