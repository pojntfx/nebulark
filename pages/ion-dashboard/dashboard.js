import React from "react";
import styled from "styled-components";

const ID = styled.div`
  float: left;
  margin: 10px;
`;

const IonNumber = styled.div`
  float: left;
  position: absolute;
  bottom: 0px;
  margin: 10px;
`;

const Storage = styled.div`
  float: right;
  position: absolute;
  bottom: 0px;
  right:0px;
  margin: 10px;
`;

const Logs = styled.button`
  border: none;
  background-color: white;
  font-size: 32px;
  color: #404040;
  float: right;
  margin: 10px;

  img {
    height: 22px;
    width: 22px;
  }
`;

const Wrapper = styled.div`
    height: 100vh;
    position: relative;
    font-size: 32px;
    font-family: Helvetica;
    color: #404040;
    background-image: url("/background.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
`;

function Dashboard() {
  const id = 123;
  const ionNumber = 500;
  const storage = 23;

  return (
    <>
      <Wrapper>
        <ID>Your ID: {id}</ID>
        <Logs><img src="/speisekarte.png"></img> logs</Logs>
        <Storage>Using {storage}MB of storage</Storage>
        
        <IonNumber>Connected to {ionNumber} peers</IonNumber>
      </Wrapper>
    </>
  );
}

export default Dashboard;
