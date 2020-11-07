import React, { useState, useRef } from "react";
import styled from "styled-components";

function RecentSpark() {
  const sparkName = "my-spark-1";
  const ionNumber = 4;
  const output = '{"sum": 3}';
  const logs = "200: OK";

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
    height: 300px;

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
    justify-content: space-between;

    button {
      width: 45px;
      height: 20px;
      color: white;
      background-color: #4287f5;
      border: none;
      border-radius: 2px;
    }

    #download {
      width: 75px;
    }
  `;

  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");

  const content = useRef(null);
  const outputContent = useRef(null);
  const outputLogs = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
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
      <Wrapper>
        <ul>
          <li>loadingbar</li>
          <li>{sparkName}</li>
          <li>{ionNumber} Ions</li>
          <li>7 mins</li>
          <li>
            <AccordionWrapper>
              <Accordion__section>
                <Accordion__button onClick={toggleAccordion}>
                  More
                </Accordion__button>
              </Accordion__section>
            </AccordionWrapper>
          </li>
        </ul>
      </Wrapper>
      <Accordion__content ref={content} style={{ maxHeight: `${setHeight}` }}>
        <Accordion__text>
          <OutputWrapper>
            <h1>Output</h1>
            <button onClick={copyOutputToClipboard}>Copy</button>
            <button id="download" onClick={downloadJsonFile}>Download</button>
          </OutputWrapper>
          <textarea id="output" ref={outputContent} readOnly>
            {output}
          </textarea>
          <OutputWrapper>
            <h1>Logs</h1>
            <button onClick={copyLogsToClipboard}>Copy</button>
            <button id="download" onClick={downloadLogFile}>Download</button>
          </OutputWrapper>
          <textarea id="logs" ref={outputLogs} readOnly>
            {logs}
          </textarea>
        </Accordion__text>
      </Accordion__content>
      <Divider />
    </>
  );
}

export default RecentSpark;
