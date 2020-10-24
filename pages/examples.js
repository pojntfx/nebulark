import VirtualMachine from "../lib/virtualmachine";
import Example from "../components/example";
import React from "react";

function Examples() {
  const [simpleExamples, setSimpleExamples] = React.useState([
    [
      "Zig Simple Calculator",
      new VirtualMachine.Builder()
        .setBinaryURL("/zig-simple-calculator.wasm")
        .useWASIRuntime()
        .build(),
      0,
    ],
    [
      "TinyGo Simple Calculator",
      new VirtualMachine.Builder()
        .setBinaryURL("/tinygo-simple-calculator.wasm")
        .useTinyGoRuntime()
        .build(),
      0,
    ],
  ]);

  const [jsonExamples, setJSONExamples] = React.useState([
    [
      "Zig JSON Calculator",
      new VirtualMachine.Builder()
        .setBinaryURL("/zig-json-calculator.wasm")
        .useWASIRuntime()
        .build(),
      0,
    ],
    [
      "TinyGo JSON Calculator",
      new VirtualMachine.Builder()
        .setBinaryURL("/tinygo-json-calculator.wasm")
        .useTinyGoRuntime()
        .build(),
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
                title={example[0]}
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

                  setSimpleExamples((oldExamples) =>
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
                title={example[0]}
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

                  setJSONExamples((oldExamples) =>
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
