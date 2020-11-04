import React from "react";
import styled from "styled-components";

const Nebula = styled.h1`
    font-size: 20px;
  `;

  const Divider = styled.hr`
    background-color: #404240;
    height: 5px;
    border: none;
    border-radius: 2px;
  `;

  const Category = styled.h1`
    font-size: 20px;
    text-align: right;
    margin-top: -1.8em;

    @media (max-width: 420px) {
      display: none;
    }
  `;
  
function Header({ nebulaID, ...otherProps }) {
  
  return (
    <div {...otherProps}>
      <Nebula> nebulark / {nebulaID}</Nebula>
      <Category>Setup</Category>
      <Divider />
    </div>
  );
}

export default Header;
