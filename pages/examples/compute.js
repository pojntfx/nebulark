import VirtualMachine from "../../lib/virtualmachine";
import Example from "../../components/example";
import React from "react";
import Link from "next/link";

function ComputeExamples() {
  const [simpleExamples, setSimpleExamples] = React.useState([
    [
      "C Simple Calculator",
      new VirtualMachine.Builder()
        .setBinaryURL("/c-simple-calculator.wasm")
        .useWASIRuntime()
        .build(),
      0,
      0,
      0,
    ],
    [
      "C++ Simple Calculator",
      new VirtualMachine.Builder()
        .setBinaryURL("/cpp-simple-calculator.wasm")
        .useWASIRuntime()
        .build(),
      0,
      0,
      0,
    ],
    [
      "Rust Simple Calculator",
      new VirtualMachine.Builder()
        .setBinaryURL("/rust-simple-calculator.wasm")
        .useWASIRuntime()
        .build(),
      0,
      0,
      0,
    ],
    [
      "AssemblyScript Simple Calculator",
      new VirtualMachine.Builder()
        .setBinaryURL("/assemblyscript-simple-calculator.wasm")
        .useWASIRuntime()
        .build(),
      0,
      0,
      0,
    ],
    [
      "Zig Simple Calculator",
      new VirtualMachine.Builder()
        .setBinaryURL("/zig-simple-calculator.wasm")
        .useWASIRuntime()
        .build(),
      0,
      0,
      0,
    ],
    [
      "Go Simple Calculator",
      new VirtualMachine.Builder()
        .setBinaryURL("/go-simple-calculator.wasm")
        .useTinyGoRuntime()
        .build(),
      0,
      0,
      0,
    ],
    [
      "Java Simple Calculator",
      new VirtualMachine.Builder()
        .setBinaryURL("/java-simple-calculator.wasm")
        .useTeaVMRuntime()
        .build(),
      0,
      0,
      0,
    ],
  ]);

  const [jsonExamples, setJSONExamples] = React.useState([
    [
      "C JSON Calculator",
      new VirtualMachine.Builder()
        .setBinaryURL("/c-json-calculator.wasm")
        .useWASIRuntime()
        .build(),
      0,
      0,
      0,
    ],
    [
      "C++ JSON Calculator",
      new VirtualMachine.Builder()
        .setBinaryURL("/cpp-json-calculator.wasm")
        .useWASIRuntime()
        .build(),
      0,
      0,
      0,
    ],
    [
      "Rust JSON Calculator",
      new VirtualMachine.Builder()
        .setBinaryURL("/rust-json-calculator.wasm")
        .useWASIRuntime()
        .build(),
      0,
      0,
      0,
    ],
    [
      "AssemblyScript JSON Calculator",
      new VirtualMachine.Builder()
        .setBinaryURL("/assemblyscript-json-calculator.wasm")
        .useWASIRuntime()
        .build(),
      0,
      0,
      0,
    ],
    [
      "Zig JSON Calculator",
      new VirtualMachine.Builder()
        .setBinaryURL("/zig-json-calculator.wasm")
        .useWASIRuntime()
        .build(),
      0,
      0,
      0,
    ],
    [
      "Go JSON Calculator",
      new VirtualMachine.Builder()
        .setBinaryURL("/go-json-calculator.wasm")
        .useTinyGoRuntime()
        .build(),
      0,
      0,
      0,
    ],
    [
      "Java JSON Calculator",
      new VirtualMachine.Builder()
        .setBinaryURL("/java-json-calculator.wasm")
        .useTeaVMRuntime()
        .build(),
      0,
      0,
      0,
    ],
  ]);

  const [examplesRunning, setExamplesRunning] = React.useState(false);

  return (
    <>
      <Link href="/">🔙 Back</Link>

      <h1>Nebulark Compute Examples</h1>

      <button
        onClick={async () => {
          setExamplesRunning(true);

          await Promise.all([
            ...simpleExamples.map(async (example, i) => {
              const firstAddend = Math.floor(Math.random() * 10000);
              const secondAddend = Math.floor(Math.random() * 10000);

              example[3] = firstAddend;
              example[4] = secondAddend;

              await example[1].loadExports();

              let sum = 0;
              try {
                await example[1].start();

                sum = await example[1].call("add", firstAddend, secondAddend);

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
                  i === j
                    ? [
                        oldExample[0],
                        oldExample[1],
                        sum,
                        example[3],
                        example[4],
                      ]
                    : oldExample
                )
              );
            }),
            ...jsonExamples.map(async (example, i) => {
              const firstAddend = Math.floor(Math.random() * 10000);
              const secondAddend = Math.floor(Math.random() * 10000);

              example[3] = firstAddend;
              example[4] = secondAddend;

              let sum = 0;
              try {
                const res = await example[1].run({
                  firstAddend,
                  secondAddend,
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
                  i === j
                    ? [
                        oldExample[0],
                        oldExample[1],
                        sum,
                        example[3],
                        example[4],
                      ]
                    : oldExample
                )
              );
            }),
          ]);

          setExamplesRunning(false);
        }}
      >
        {examplesRunning ? "Running All Examples ..." : "Run All Examples"}
      </button>

      {/* Simple Examples */}
      <section id="simple-examples">
        <h2>Simple Examples</h2>
        <ul>
          {simpleExamples.map((example, i) => {
            return (
              <li key={i}>
                <Example
                  title={example[0]}
                  firstAddend={example[3]}
                  setFirstAddend={(a) =>
                    setSimpleExamples((oldExamples) =>
                      oldExamples.map((oldExample, j) =>
                        i === j
                          ? [
                              oldExample[0],
                              oldExample[1],
                              oldExample[2],
                              a,
                              oldExample[4],
                            ]
                          : oldExample
                      )
                    )
                  }
                  secondAddend={example[4]}
                  setSecondAddend={(a) =>
                    setSimpleExamples((oldExamples) =>
                      oldExamples.map((oldExample, j) =>
                        i === j
                          ? [
                              oldExample[0],
                              oldExample[1],
                              oldExample[2],
                              oldExample[3],
                              a,
                            ]
                          : oldExample
                      )
                    )
                  }
                  calculate={async (firstAddend, secondAddend) => {
                    await example[1].loadExports();

                    let sum = 0;
                    try {
                      await example[1].start();

                      sum = await example[1].call(
                        "add",
                        firstAddend == "" ? 0 : parseInt(firstAddend),
                        secondAddend == "" ? 0 : parseInt(secondAddend)
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
                        i === j
                          ? [
                              oldExample[0],
                              oldExample[1],
                              sum,
                              oldExample[3],
                              oldExample[4],
                            ]
                          : oldExample
                      )
                    );
                  }}
                  output={example[2]}
                />
              </li>
            );
          })}
        </ul>
      </section>

      {/* JSON Examples */}
      <section id="json-examples">
        <h2>JSON Examples</h2>
        <ul>
          {jsonExamples.map((example, i) => {
            return (
              <li key={i}>
                <Example
                  title={example[0]}
                  firstAddend={example[3]}
                  setFirstAddend={(a) =>
                    setJSONExamples((oldExamples) =>
                      oldExamples.map((oldExample, j) =>
                        i === j
                          ? [
                              oldExample[0],
                              oldExample[1],
                              oldExample[2],
                              a,
                              oldExample[4],
                            ]
                          : oldExample
                      )
                    )
                  }
                  secondAddend={example[4]}
                  setSecondAddend={(a) =>
                    setJSONExamples((oldExamples) =>
                      oldExamples.map((oldExample, j) =>
                        i === j
                          ? [
                              oldExample[0],
                              oldExample[1],
                              oldExample[2],
                              oldExample[3],
                              a,
                            ]
                          : oldExample
                      )
                    )
                  }
                  calculate={async (firstAddend, secondAddend) => {
                    let sum = 0;
                    try {
                      const res = await example[1].run({
                        firstAddend:
                          firstAddend == "" ? 0 : parseInt(firstAddend),
                        secondAddend:
                          secondAddend == "" ? 0 : parseInt(secondAddend),
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
                        i === j
                          ? [
                              oldExample[0],
                              oldExample[1],
                              sum,
                              oldExample[3],
                              oldExample[4],
                            ]
                          : oldExample
                      )
                    );
                  }}
                  output={example[2]}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default ComputeExamples;
