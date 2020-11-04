import React from "react";
import styled from "styled-components";
import IonDashboard from "../../components/ionDashboard";
import Header from "../../components/header";
import SparkDashboard from "../../components/sparkDashboard";

const Body = styled.body`
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  color: #404240;
  position: relative;
`;

const StyledHeader = styled(Header)``;

const StyledIonDashboard = styled(IonDashboard)``;

const StyledSparkDashboard = styled(SparkDashboard)`
  float: right;
  margin-top: -10em;
`;

const StyledVerticalLine = styled.span`
  display: inline-block;
  border-left: 5px solid #404240;
  height: 500px;
  border-radius: 2px;
  margin-left: 300px;
  margin-top: -230px;
`;

const Div = styled.div`
  max-width: 1150px;
  margin: 50px 200px 50px auto;
  padding: 0 50px 0px 0;
  position: relative;
  min-width: 1150px;
`;

function Control() {
  const nebulaID = "woody-wood-wood";

  return (
    <>
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
