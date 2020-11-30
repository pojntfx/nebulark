import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/header";
import NebulaStats from "../../components/nebulaStats";
import SparkStats from "../../components/sparkStats";
import styled from "styled-components";

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
 
  @media (max-width: 840px) {
    display: none;
  }
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

      <GridContainer>
        <Header className="header" nebulaID={nebulaID} category="Setup" />

        <NebulaStats />

        <VerticalLine />

        <SparkStats />
      </GridContainer>
    </>
  );
}

export default SparkDashboard;
