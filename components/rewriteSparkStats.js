import React from "react";
import RunningSpark from "./runningSpark";
import styled from "styled-components";
import RecentSpark from "./recentSpark";

const Wrapper = styled.section` 
  display: flex;
  flex-direction: column;
`;


function SparkStats() {
  return (
    <>
      <Wrapper>
        <h1>Running Sparks</h1>
        <RunningSpark />
        <h1>Recent Sparks</h1>
        <RecentSpark />
        <RecentSpark />
        <RecentSpark />
      </Wrapper>
    </>
  );
}

export default SparkStats;
