import React from "react";
import styled from "styled-components";
import WebTorrent from 'webtorrent';

const Button = styled.button`
  background-color: green;
  color: white;
  border: none;
  border-radius: 2px;
  height: 30px;
  width: 80px;
  margin-left: 346px;
  margin-top: 12px;
  

  @media (max-width: 360px) {
    
  }
`;

const TextArea = styled.textarea`
  width: 420px;
  height: 200px;
  margin-left: 0px;
  resize: none;
  
  @media (max-width: 360px) {
    width: 360px;
  }
`;

const InputFile = styled.input`
  margin: -100px;
  margin-left: 0px;
`;

const InputJSON = styled.input`
  margin-left: 0px;
  margin-bottom: 30px;
`;

const H1 = styled.h1`
  margin-left: 0px;
  margin-bottom: 30px;
  font-size: 26px;
`;

const Wrapper = styled.div`

  @media (max-width: 768px) {
    

  }
`;

function SparkDashboard({ ...otherProps }) {

  const [string, setString] = React.useState("");
  const [readerResult, setReaderResult] = React.useState();
  
  async function handleExecute() {

    var client = new WebTorrent();
    var clientJSON = new WebTorrent();
    
    console.log(string)
    console.log(readerResult)

    var buf = Buffer.from(readerResult)
    buf.name = 'Nebulark'
    client.seed(buf, function(torrent) {
      console.log('Client is seeding: ', torrent.magnetURI)
    })

    var bufJSON = Buffer.from(string)
    bufJSON.name = 'Nebulark'
    clientJSON.seed(bufJSON, function(torrentJSON) {
      console.log('Client is seeding: ', torrentJSON.magnetURI)
    })    

  }

  async function captureFile(event) {
    event.preventDefault();

    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      setReaderResult(reader.result);
    };
  }

  function captureFileJSON(event) {
    event.preventDefault();

    const fileJSON = event.target.files[0];
    const readerJSON = new window.FileReader();

    readerJSON.readAsArrayBuffer(fileJSON);
    readerJSON.onloadend = () => {
      setString(new TextDecoder().decode(new Uint8Array(readerJSON.result)));
    };
  }

  return (
    <>
      <div {...otherProps}>
        <Wrapper>
          <H1>Upload Binary</H1>
          <InputFile
            type="file"
            onChange={(event) => captureFile(event)}
          ></InputFile>
          <br />
          <H1>Upload JSON or enter below</H1>
          <InputJSON
            type="file"
            onChange={(event) => captureFileJSON(event)}
          ></InputJSON>
          <br />
          <TextArea
            type="text"
            value={string}
            onChange={(event) => setString(event.target.value)}
          ></TextArea>
          <br />
          <Button onClick={handleExecute}>Execute</Button>
        </Wrapper>
      </div>
    </>
  );
}

export default SparkDashboard;
