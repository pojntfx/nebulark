import React from "react";
import styled from "styled-components";


const GridContainer = styled.div`
    display: grid;
    grid-template-rows: 260px 40px 40px;
    grid-template-columns: 260px;
    grid-auto-columns: minmax(120px, auto);
    align-content: center;
    justify-content: center;
    row-gap: 10px;
    
    img {
        width: 260px;
        height: 260px;
    }

    button {
        width: 260px;
        height: 40px;
        border: none;
        background-color: #2e87b0;
    }

    input {
        height: 40px;
        width: 252px;
    }

    
    
`;

function Ion() {


    return (
        <>
            <GridContainer>
                <img src="/nebulark-logo.png"></img>
                <button>New Nebula</button>
                <input value="Got a key? Type it here!"></input>
            </GridContainer>
        </>
    )
}

export default Ion;