import React from "react";
import styled from "styled-components";
import Ion from "./ion";
import QRCode from "qrcode.react";

const Wrapper = styled.section`
  margin-left: 15px;
`;
const QRCodeCaption = styled.a`
  color: #404240;
  font-size: 11px;
`;

const QRCodeStyled = styled(QRCode)`
  margin-top: 25px;
`;

const StyledIon = styled(Ion)`
  margin-top: 10px;
`;

const qrCode =
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO";

function IonDashboard({ nebulaID, ...otherProps }) {
  return (
    <>
      <Wrapper>
        <div {...otherProps}>
          <QRCodeStyled size={190} value={qrCode} />
          <br></br>
          <QRCodeCaption href="https://google.com">
            https://nebulark.spark/{nebulaID}
          </QRCodeCaption>
          <StyledIon ionName="John's Phone" ionStatus={true} />
        </div>
      </Wrapper>
    </>
  );
}

export default IonDashboard;
