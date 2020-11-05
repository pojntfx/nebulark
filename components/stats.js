import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
    ul {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        justify-content: space-around; 
    }
`;

function Stats() {
  const [cpu, setCPU] = React.useState(0);
  const [ram, setRAM] = React.useState(0);
  const [storage, setStorage] = React.useState(0);
  // [ ] Plural of Core if Core is bigger than 1
  return (
    <>
      <Wrapper>
        <ul>
          <li>{cpu} Cores</li>
          <li>{ram} MB</li>
          <li>{storage} MB</li>
        </ul>
      </Wrapper>
    </>
  );
}

export default Stats;
