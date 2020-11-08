import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/header";
import NebulaStats from "../../components/nebulaStats";
import SparkStats from "../../components/sparkStats";
import styled from "styled-components";

const Wrapper = styled.section`
  * {
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    position: relative;
    color: #404240;
  }

  margin: 8px;
`;

const StyledVerticalLine = styled.span`
  display: inline-block;
  border-left: 5px solid #404240;
  height: 500px;
  border-radius: 2px;
  margin-left: 301px;
  margin-top: -240px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Div = styled.div`
  max-width: 900px;
  margin: 50px auto;
  padding: 0 0px 0px 0;
  position: relative;
  min-width: 768px;
`;

const StyledSparkStats= styled(SparkStats)`
  margin-left: 375px;
  margin-top: 11em;
  
  @media (max-width: 768px) {
    margin-left: 0px;
    margin-top: 400px;
  }
`;

const StyledNebulaStats = styled(NebulaStats)`
`;

function SparkDashboard() {
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

      <Wrapper>
        <Header nebulaID={nebulaID} category="Setup"/>

        <Div>
          <StyledNebulaStats />

          <StyledVerticalLine />

          <StyledSparkStats />
        </Div>
      </Wrapper>
    </>
  );
}

export default SparkDashboard;