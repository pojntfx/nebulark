import React from "react";
import styled from "styled-components";
import IonDashboard from "../../components/ionDashboard";
import Header from "../../components/header";
import SparkDashboard from "../../components/sparkDashboard";

function Control() {
  const Body = styled.body`
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    color: #404240;
  `;

  const nebulaID = "woody-wood-wood";

  return (
    <>
      <Body>
        <Header nebulaID={nebulaID} />

        <IonDashboard nebulaID={nebulaID} />

        <SparkDashboard />
      </Body>
    </>
  );
}

export default Control;
