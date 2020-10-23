import { WASI } from "@wasmer/wasi";
import { lowerI64Imports } from "@wasmer/wasm-transformer";
import { WasmFs } from "@wasmer/wasmfs";

export default class VirtualMachine {
  #binaryURL = "";
  #instance = undefined;
  #wasi = undefined;
  #wasmFs = undefined;

  constructor(binaryURL) {
    this.#binaryURL = binaryURL;
  }

  #printStdout = async () => {
    const stdout = await this.#wasmFs.getStdOut();

    console.log(stdout);
  };

  loadExports = async () => {
    // Create the filesystem
    this.#wasmFs = new WasmFs();

    // Create the virtual machine
    const wasiBindings = (await import("@wasmer/wasi/lib/bindings/browser"))
      .default;
    this.#wasi = new WASI({
      args: [],
      env: {},
      bindings: {
        ...wasiBindings,
        fs: this.#wasmFs.fs,
      },
    });

    // Fetch the WASM binary
    const binary = await fetch(this.#binaryURL).then((res) =>
      res.arrayBuffer()
    );

    // Compile and instantiate the WASM binary
    const wasm_bytes = new Uint8Array(binary).buffer;
    const lowered_wasm = await lowerI64Imports(wasm_bytes);
    let module = await WebAssembly.compile(lowered_wasm);
    this.#instance = await WebAssembly.instantiate(module, {
      ...this.#wasi.getImports(module),
    });
  };

  start = async () => {
    this.#wasi.start(this.#instance);

    this.#printStdout();
  };

  call = async (functionName, ...functionArguments) => {
    console.log(this.#instance.exports[functionName]);

    return await this.#instance.exports[functionName].call(
      ...functionArguments
    );
  };
}
