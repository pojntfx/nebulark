import React from "react";
import styled from "styled-components";
import Ion from "./ion";
import QRCode from "qrcode.react";

const QRCodeCaption = styled.a`
  color: #404240;
  font-size: 11px;
`;

const QRCodeStyled = styled(QRCode)`
  margin-top: 25px;
`;

const qrCode =
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO";

function IonDashboard({ nebulaID, ...otherProps }) {
  return (
    <>
      <div {...otherProps}>
       
          <QRCodeStyled size={190} value={qrCode} />
          <br></br>
          <QRCodeCaption href="https://google.com">
            https://nebulark.spark/{nebulaID}
          </QRCodeCaption>
          <Ion ionName="John's Phone" ionStatus={true} />
        
      </div>
    </>
  );
}

export default IonDashboard;
