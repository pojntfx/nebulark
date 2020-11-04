import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/header";
import NebulaStats from "../../components/nebulaStats";
import SparkStats from "../../components/sparkStats";

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

      <Header nebulaID={nebulaID} />

      <NebulaStats />

      <SparkStats />
    </>
  );
}

export default SparkDashboard;
