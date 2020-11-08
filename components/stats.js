import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    margin: 0;
    padding: 0;
    margin-bottom: 80px;
    margin-top: 60px;
  }
  li {
    margin-right: 40px;
  }
`;

function Stats() {
  const [cpu, setCPU] = React.useState(0);
  const [ram, setRAM] = React.useState(0);
  const [storage, setStorage] = React.useState(0);
  const [setPluralCore, setPluralCoreState] = useState("s");

  useEffect(() => {
    setCPU(1);
    setRAM(233);
    setStorage(4);
    setPluralCoreState(cpu === 1 ? "" : "s");
  });

  // [ ] Plural of Core if Core is bigger than 1
  return (
    <>
      <Wrapper>
        <ul>
          <li>{cpu} Core{setPluralCore}</li>
          <li>{ram} MB</li>
          <li>{storage} MB</li>
        </ul>
      </Wrapper>
    </>
  );
}

export default Stats;
