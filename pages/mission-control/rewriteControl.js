import React from "react";
import styled from "styled-components";
import IonDashboard from "../../components/rewriteIonDashboard";
import Header from "../../components/rewriteHeader";
import SparkDashboard from "../../components/rewriteSparkDashboard";
import { Helmet } from "react-helmet";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 260px 50px 510px;
  grid-auto-rows: minmax(120px, auto);
  grid-template-areas: "header header header";
  justify-content: center;

  .header {
    grid-area: header;
  }

  * {
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    position: relative;
    color: #404240;
  }

  @media (max-width: 840px) {
    grid-template: "header";
    grid-template-columns: 1fr;
  }
`;

const VerticalLine = styled.span`
  display: inline-block;
  border-left: 5px solid #404240;
  height: 500px;
  border-radius: 2px;

  @media (max-width: 768px) {
    display: none;
  }
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

      <GridContainer>
        <Header className="header" nebulaID={nebulaID} category="Setup" />

        <IonDashboard nebulaID={nebulaID} />

        <VerticalLine />

        <SparkDashboard />
      </GridContainer>
    </>
  );
}

export default Control;
