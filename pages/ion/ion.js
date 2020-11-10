import React, { useState } from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  align-content: center;
  justify-content: center;
  row-gap: 15px;

  img {
    width: 260px;
    height: 260px;
    margin-bottom: 20px;
  }

  button {
    color: white;
    width: 260px;
    height: 40px;
    border: none;
    background-color: #404040;
    font-size: 24px;
    border-radius: 2px;
  }

  input {
    color: #404040;
    height: 40px;
    width: 252px;
    radius: 2px;
  }
`;


function Ion() {

    const [string, setString] = useState();

  return (
    <>
      <GridContainer>
        <img src="/nebulark-logo.png"></img>
        <button>New Nebula</button>
        <form><input defaultValue="Got a key? Type it here!" type="text" value={string} onChange={(event) => setString(event.target.value)} /></form>
      </GridContainer>
    </>
  );
}

export default Ion;
