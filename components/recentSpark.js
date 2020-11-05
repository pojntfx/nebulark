import React from "react";
import styled from "styled-components";

function RecentSpark() {
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

  function clickHandler() {
    console.log("Button was clicked");
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
            <button onClick={clickHandler}>More</button>
          </li>
        </ul>
      </Wrapper>
      <Divider />
    </>
  );
}

export default RecentSpark;