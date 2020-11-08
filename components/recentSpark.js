import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

function RecentSpark() {
  const sparkName = "my-spark-1";
  const ionNumber = 1;
  const output = '{"sum": 3}';
  const logs = "200: OK";
  const minutes = 2;

  const Wrapper = styled.section`
    ul {
      display: flex;
      list-style-type: none;
    }
    li {
      margin-right: 40px;
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
    max-width: 500px;
    margin-left: 0px;
    margin-top: 0px;
  `;

  const Accordion__content = styled.div`
    background-color: white;
    overflow: hidden;
    transition: max-height 0.6s ease;
  `;

  const Accordion__text = styled.div`
    position: relative;
    font-weight: 400;
    padding: 18px;
    height: 200px;

    textarea {
      resize: none;
      width: 400px;
      height: 60px;
    }
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

  const OutputWrapper = styled.div`
    display: flex;
    

    button {
      width: 45px;
      height: 20px;
      color: white;
      background-color: #4287f5;
      border: none;
      border-radius: 2px;
      margin-right: 4px;
      margin-bottom: 2px;
    }

    #download {
      width: 75px;
    }

    em {
      font-style: normal;
      margin-right: 240px;
    }

    #outputLogs {
      margin-right: 251px;
    }
  `;

  const Wrapp = styled.section`
    margin-top: 25px;
  `;

  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setButton, setButtonState] = useState("More");
  const [setPluralIon, setPluralIonState] = useState("s");
  const [setPluralMin, setPluralMinState] = useState("s");

  const content = useRef(null);
  const outputContent = useRef(null);
  const outputLogs = useRef(null);

  useEffect(() => {
    setPluralIonState(ionNumber === 1 ? "" : "s");
    setPluralMinState(minutes === 1 ? "" : "s");
  })
  

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setButtonState(setActive === "active" ? "More" : "Less");
  }

  function copyOutputToClipboard(e) {
    outputContent.current.select();
    document.execCommand("copy");
    e.target.focus();
  }

  function copyLogsToClipboard(e) {
    outputLogs.current.select();
    document.execCommand("copy");
    e.target.focus();
  }

  function downloadJsonFile() {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById("output").value], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${sparkName}-output.json`;
    document.body.appendChild(element);
    element.click();
  }

  function downloadLogFile() {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById("logs").value], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${sparkName}-logs.txt`;
    document.body.appendChild(element);
    element.click();
  }

  return (
    <>
    <Wrapp>
    <Wrapper>
        <ul>
          <li><img src="/success.svg"></img></li>
          <li>{sparkName}</li>
          <li>{ionNumber} Ion{setPluralIon}</li>
          <li>{minutes} min{setPluralMin}</li>
          <li>
            <AccordionWrapper>
              <Accordion__section>
                <Accordion__button onClick={toggleAccordion}>
                  {setButton}
                </Accordion__button>
              </Accordion__section>
            </AccordionWrapper>
          </li>
        </ul>
      </Wrapper>
      <Accordion__content ref={content} style={{ maxHeight: `${setHeight}` }}>
        <Accordion__text>
          <OutputWrapper>
            <em>Output</em>
            <button onClick={copyOutputToClipboard}>Copy</button>
            <button id="download" onClick={downloadJsonFile}>Download</button>
          </OutputWrapper>
          <textarea id="output" ref={outputContent} readOnly>
            {output}
          </textarea>
          <OutputWrapper>
            <em id="outputLogs">Logs</em>
            <button onClick={copyLogsToClipboard}>Copy</button>
            <button id="download" onClick={downloadLogFile}>Download</button>
          </OutputWrapper>
          <textarea id="logs" ref={outputLogs} readOnly>
            {logs}
          </textarea>
        </Accordion__text>
      </Accordion__content>
      <Divider />
    </Wrapp>
      
    </>
  );
}

export default RecentSpark;
