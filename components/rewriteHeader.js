import React from "react";
import styled from "styled-components";

const Nebula = styled.h1`
    font-size: 20px;
    color: #404240;
  `;

  const Divider = styled.hr`
    background-color: #404240;
    height: 5px;
    border: none;
    border-radius: 2px;
  `;

function Header({ nebulaID, category, ...otherProps }) {
  
  return (
    <div {...otherProps}>
      <Nebula> nebulark / {nebulaID}</Nebula>
      <Divider />
    </div>
  );
}

export default Header;