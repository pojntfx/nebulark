import React from "react";
import RunningSpark from "./runningSpark";
import styled from "styled-components";
import RecentSpark from "./recentSpark";

const Wrapper = styled.section`
  margin-left: 390px;
  margin-top: -528px;  

  @media (max-width: 768px) {
    margin-top: 240px;
    margin-left: 0;
  }
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
