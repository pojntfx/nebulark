import React from "react";
import Stats from "./stats";
import Ion from "./ion";
import styled from "styled-components";

const Wrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledIon = styled(Ion)`
  margin-top: 15.5px;
`;

function NebulaStats() {
  return (
    <>
      <Wrapper>
        <h1>NebulaStats</h1>
        <Stats />
        <StyledIon ionName="John's Phone" ionStatus={true} />
        fr;      </Wrapper>
    </>
  );
}

export default NebulaStats;
