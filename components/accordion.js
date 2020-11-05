import React, { useState, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
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

const Accordion__button = styled.button``;

const Accordion__title = styled.p`
  background-color: #eee;
  color: #444;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  transition: background-color 0.6s ease;
`;

const Accordion__content = styled.div`
  background-color: white;
  overflow: hidden;
  transition: max-height 0.6s ease;
`;

const Accordion__text = styled.div`
  font-weight: 400;
  font-size: 14px;
  padding: 18px;
`;

function Accordion(props) {

    const[setActive, setActiveState] = useState("");
    const[setHeight, setHeightState] = useState("0px")
    const[setRotate, setRotateStatet] = useState("accordion_icon");
 
    const content = useRef(null);

    function toggleAccordion() {
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);

        setRotateStatet(
            setActive == "active" ? "accordion__icon" : "accordion_icon rotate"
            )
        console.log(content.current.scrollHeight);
    }

  return (
    <Wrapper>
      <Accordion__section>
        <Accordion__button  onClick={toggleAccordion}>
          <Accordion__title>{props.title}</Accordion__title>
        </Accordion__button>
        <Accordion__content ref={content} style={{maxHeight: `${setHeight}`}}>
          <Accordion__text
            dangerouslySetInnerHTML={{ __html: props.content }}
          />
        </Accordion__content>
      </Accordion__section>
    </Wrapper>
  );
}

export default Accordion;
