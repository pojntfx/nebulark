import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/header";
import NebulaStats from "../../components/nebulaStats";
import SparkStats from "../../components/sparkStats";
import styled from "styled-components";
import Example from "../../components/accordion"

const Wrapper = styled.section`
  * {
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    color: #404240;
    position: relative;
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
      <Wrapper>
        <Header nebulaID={nebulaID} />

        <NebulaStats />

        <SparkStats />

        <Example />
      </Wrapper>
    </>
  );
}

export default SparkDashboard;
