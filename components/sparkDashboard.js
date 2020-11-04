import React from "react";
import styled from "styled-components";
import IPFS from "ipfs";

const Button = styled.button`
  background-color: green;
  color: white;
  border: none;
  border-radius: 2px;
  height: 30px;
  width: 80px;
  margin-left: -434px;
  margin-top: 12px;
`;

const TextArea = styled.textarea`
  width: 420px;
  height: 200px;
  margin-left: -780px;
`;

const InputFile = styled.input`
  margin: -100px;
  margin-left: -780px;
`;

const InputJSON = styled.input`
  margin-left: -780px;
  margin-bottom: 30px;
`;

const H1 = styled.h1`
  margin-left: -780px;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const Div = styled.div`
  margin-top: -125px;
`;

function SparkDashboard({ ...otherProps }) {
  const [string, setString] = React.useState("");
  const [readerResult, setReaderResult] = React.useState();

  var fileHash = null;
  var fileHashJSON = null;

  async function handleExecute() {
    const node = await IPFS.create();
    const file = await node.add({
      path: "hello.txt",
      content: new Uint8Array(readerResult),
    });
    fileHash = file.cid.toString();

    const fileJSON = await node.add({
      path: "hello.txt",
      content: new Uint8Array(new TextEncoder().encode(string)),
    });
    fileHashJSON = fileJSON.cid.toString();

    console.log(fileHash);
    console.log(fileHashJSON);
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

    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setString(new TextDecoder().decode(new Uint8Array(reader.result)));
    };
  }

  return (
    <>
      <div {...otherProps}>
        <Div>
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
        </Div>
      </div>
    </>
  );
}

export default SparkDashboard;
