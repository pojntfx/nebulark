import React, { useRef, useState } from "react";
import styled from "styled-components";
//import Accordion from "./accordion";

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
`;

const AccordionWrapper = styled.section`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const Accordion__section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Accordion__button = styled.button`
  background-color: red;
  border-radius: 2px;
  border: none;
  width: 80px;
  height: 20px;
  color: white;
`;

const [setActive, setActiveState] = useState("");
const [setHeight, setHeightState] = useState("0px");
const [setRotate, setRotateStatet] = useState("accordion_icon");

const content = useRef(null);

function toggleAccordion() {
  setActiveState(setActive === "" ? "active" : "");
  setHeightState(
    setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
  );

  setRotateStatet(
    setActive == "active" ? "accordion__icon" : "accordion_icon rotate"
  );
  console.log(content.current.scrollHeight);
}
  
  function cancelSpark(e) {
    console.log("OK")
  }

  return (
    <>
      <Wrapper>
        <ul>
          <li>loadingbar</li>
          <li>{sparkName}</li>
          <li>{ionNumber} Ions</li>
          <li>7 mins</li>
          <li>
          <AccordionWrapper>
      <Accordion__section>
        <Accordion__button onClick={(e) => { if (window.confirm(`Are your sure you want to cancel spark ${sparkName}?`)) cancelSpark(e) } }>
          Cancel
        </Accordion__button>
        {/* <Accordion__content ref={content} style={{ maxHeight: `${setHeight}` }}>
          <Accordion__text
            dangerouslySetInnerHTML={{ __html: props.content }}
          />
        </Accordion__content> */}
      </Accordion__section>
    </AccordionWrapper>  
          </li>
        </ul>
      </Wrapper>
      <Divider />
    </>
  );
}

export default RunningSpark;
