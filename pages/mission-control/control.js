import React from "react";
import styled from "styled-components";

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

  const nebulaID = "woody-wood-wood";

  return (
    <>
    <Body>
        <Header> nebulark / {nebulaID} </Header>
        <Divider />
    </Body>
      
    </>
  );
}

export default Control;
