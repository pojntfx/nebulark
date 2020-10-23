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

                  await example[1].start();

                  const sum = await example[1].call(
                    "add",
                    firstAddend,
                    secondAddend
                  );

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
    </>
  );
}

export default Examples;
