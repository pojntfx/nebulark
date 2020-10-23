import VirtualMachine from "../lib/virtualmachine";
import Example from "../components/example";
import React from "react";

function Examples() {
  const [simpleExamples, setSimpleExample] = React.useState([
    [
      "Zig Simple Calculator",
      new VirtualMachine("/zig-simple-calculator.wasm"),
      0,
    ],
  ]);

  const [jsonExamples, setJSONExample] = React.useState([
    ["Zig JSON Calculator", new VirtualMachine("/zig-json-calculator.wasm"), 0],
  ]);

  return (
    <>
      <h1>Examples</h1>

      <h2>Simple Examples</h2>
      <ul>
        {simpleExamples.map((example, i) => {
          return (
            <li key={i}>
              <Example
                calculate={async (firstAddend, secondAddend) => {
                  await example[1].loadExports();

                  let sum = 0;
                  try {
                    await example[1].start();

                    sum = await example[1].call(
                      "add",
                      parseInt(firstAddend),
                      parseInt(secondAddend)
                    );

                    const stdout = await example[1].getStdout();
                    if (stdout.length !== 0) {
                      console.log(stdout);
                    }
                  } catch (e) {
                    const stdout = await example[1].getStdout();
                    if (stdout.length !== 0) {
                      console.log(stdout);
                    }

                    console.error(e);

                    return;
                  }

                  setSimpleExample((oldExamples) =>
                    oldExamples.map((oldExample, j) =>
                      i === j ? [oldExample[0], oldExample[1], sum] : oldExample
                    )
                  );
                }}
                output={example[2]}
              />
            </li>
          );
        })}
      </ul>

      <h2>JSON Examples</h2>
      <ul>
        {jsonExamples.map((example, i) => {
          return (
            <li key={i}>
              <Example
                calculate={async (firstAddend, secondAddend) => {
                  let sum = 0;
                  try {
                    const res = await example[1].run({
                      firstAddend: parseInt(firstAddend),
                      secondAddend: parseInt(secondAddend),
                    });

                    const stdout = await example[1].getStdout();
                    if (stdout.length !== 0) {
                      console.log(stdout);
                    }

                    sum = res.sum;
                  } catch (e) {
                    const stdout = await example[1].getStdout();
                    if (stdout.length !== 0) {
                      console.log(stdout);
                    }

                    console.error(e);

                    return;
                  }

                  setJSONExample((oldExamples) =>
                    oldExamples.map((oldExample, j) =>
                      i === j ? [oldExample[0], oldExample[1], sum] : oldExample
                    )
                  );
                }}
                output={example[2]}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Examples;
