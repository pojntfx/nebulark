import React from "react";
import styled from "styled-components";
import IonDashboard from "../../components/ionDashboard";
import Header from "../../components/header";
import SparkDashboard from "../../components/sparkDashboard";
import { Helmet } from "react-helmet";

const Body = styled.body`
  * {
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    color: #404240;
    position: relative;
  }
`;

const StyledHeader = styled(Header)``;

const StyledIonDashboard = styled(IonDashboard)``;

const StyledSparkDashboard = styled(SparkDashboard)`
  margin-left: 375px;
  margin-top: -35em;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 12em;
  }
`;

const StyledVerticalLine = styled.span`
  display: inline-block;
  border-left: 5px solid #404240;
  height: 500px;
  border-radius: 2px;
  margin-left: 285px;
  margin-top: -240px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Div = styled.div`
  max-width: 768px;
  margin: 50px auto;
  padding: 0 100px 0px 0;
  position: relative;
  min-width: 768px;
`;

function Control() {
  const nebulaID = "woody-wood-wood";

  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="HandheldFriendly" content="true" />
      </Helmet>
      <Body>
        <StyledHeader nebulaID={nebulaID} />

        <Div>
          <StyledIonDashboard nebulaID={nebulaID} />

          <StyledVerticalLine />

          <StyledSparkDashboard />
        </Div>
      </Body>
    </>
  );
}

export default Control;
