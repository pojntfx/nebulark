import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

function RunningSpark() {
  const sparkName = "my-spark-1";
  const ionNumber = 4;
  const minutes = 1;

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
    img {
      height: 25px;
      width: 25px;
    }
  `;

  const Divider = styled.hr`
    background-color: #404040;
    height: 3px;
    border: none;
    border-radius: 2px;
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

  const [setPluralIon, setPluralIonState] = useState("s");
  const [setPluralMin, setPluralMinState] = useState("s");

  function cancelSpark(e) {
    console.log("OK");
  }

  useEffect(() => {
    setPluralIonState(ionNumber === 1 ? "" : "s");
    setPluralMinState(minutes === 1 ? "" : "s");
  })

  return (
    <>
      <Wrapper>
        <ul>
          <li><img src="/loadingSpinner.svg"></img></li>
          <li>{sparkName}</li>
          <li>{ionNumber} Ion{setPluralIon}</li>
          <li>{minutes} min{setPluralMin}</li>
          <li>
            <AccordionWrapper>
              <Accordion__section>
                <Accordion__button
                  onClick={(e) => {
                    if (
                      window.confirm(
                        `Are your sure you want to cancel spark ${sparkName}?`
                      )
                    )
                      cancelSpark(e);
                  }}
                >
                  Cancel
                </Accordion__button>
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
