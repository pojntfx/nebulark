import React from "react";
import Stats from "./stats";
import Ion from "./ion";

function NebulaStats() {
  return (
    <>
      <h1>NebulaStats</h1>
      <Stats />
      <Ion ionName="Jakob's MoBilTelEfOn" ionStatus={true}/>
    </>
  );
}

export default NebulaStats;
