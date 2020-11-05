import React from "react";
import Stats from "./stats";
import Ion from "./ion";

// 3 dots containing data
function NebulaStats() {
  return (
    <>
      <h1>NebulaStats</h1>
      <Stats />
      <Ion ionName="Jakob's Handy" ionStatus={true}/>
    </>
  );
}

export default NebulaStats;
