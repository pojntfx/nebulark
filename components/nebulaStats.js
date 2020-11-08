import React from "react";
import Stats from "./stats";
import Ion from "./ion";
import styled from "styled-components";

const Wrapper = styled.section`
  position: relative;
  margin-top: 70px;
  margin-left: 14px;
`;
function NebulaStats() {
  return (
    <>
      <Wrapper>
        <h1>NebulaStats</h1>
        <Stats />
        <Ion ionName="Jakob's MoBilTelEfOn" ionStatus={true} />
      </Wrapper>
    </>
  );
}

export default NebulaStats;
