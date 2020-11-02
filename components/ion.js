import React from "react";
import styled from "styled-components";

function Ion({ ionStatus, ionName }) {
  // We get following data from the parent component
  var statusColor = "";

  var checkIonStatus = (ionStatus) =>
    ionStatus === true ? (statusColor = "green") : (statusColor = "red");

  const StatusCircle = styled.div`
    height: 10px;
    width: 10px;
    background-color: ${checkIonStatus(ionStatus)};
    border-radius: 50%;
    margin-right: 10px;
    margin-top: 4px;
  `;

  const UnorderedList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    padding: 0;
    margin: 0;
  `;

  return (
    <>
      <div className="main">
        <UnorderedList>
          <li>
            <StatusCircle />
          </li>
          <li>{ionName}</li>
        </UnorderedList>
      </div>
    </>
  );
}

export default Ion;
