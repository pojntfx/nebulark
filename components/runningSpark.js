import React, { useRef } from "react";
import styled from "styled-components";
import Accordion from "./accordion";

function RunningSpark() {
  const sparkName = "my-spark-1";
  const ionNumber = 4;
  // Information on one spark (only running ones)
  // if sparkstatus == running => display loading bar
  // spark name
  // number of ions calculating spark
  // progess - either time since it started or "Waiting..."
  // Red cancel button
  // Divider below each row
  // style hr

  // [ ] if ionNumber bigger than 1 show Ions otherwhise show Ion
  // [ ] Make timer working
  // [ ] Implement loadingbar

  const Wrapper = styled.section`
    ul {
      display: flex;
      list-style-type: none;
      justify-content: space-between;
    }
    button {
      background-color: red;
      border-radius: 2px;
      border: none;
      width: 80px;
      height: 20px;
      color: white;
    }
  `;

  const Divider = styled.hr`
    background-color: #404040;
    height: 3px;
    border: none;
    border-radius: 2px;
  `;

  const Accordion__content = styled.div`
  background-color: white;
  overflow: hidden;
  transition: max-height 0.6s ease;
`;

const Accordion__text = styled.div`
  position: relative;
  font-weight: 400;
  font-size: 14px;
  padding: 18px;
  height: 200px;
  width: 200px;
`;

const content = useRef(null);

  return (
    <>
      <Wrapper>
        <ul>
          <li>loadingbar</li>
          <li>{sparkName}</li>
          <li>{ionNumber} Ions</li>
          <li>7 mins</li>
          <li>
            <Accordion title="Cancel" content="Are you sure you want to cancel the running spark?" />  
          </li>
        </ul>
      </Wrapper>
      <Accordion__content>
          <Accordion__text>Content</Accordion__text>
        </Accordion__content>
      <Divider />
    </>
  );
}

export default RunningSpark;
