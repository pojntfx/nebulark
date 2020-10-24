import { WASI } from "@wasmer/wasi";
import { lowerI64Imports } from "@wasmer/wasm-transformer";
import { WasmFs } from "@wasmer/wasmfs";
import wasiBindings from "@wasmer/wasi/lib/bindings/browser";

import TinyGoRuntime from "../vendor/tinygo";
import TeaVMRuntime from "../vendor/teavm";

export const VM_TYPE_WASI = 0;
export const VM_TYPE_TINYGO = 1;
export const VM_TYPE_TEAVM = 2;

export default class VirtualMachine {
  #binaryURL = "";

  #wasmFs = undefined;
  #wasi = undefined;
  #vm = undefined;

  #vmType = "";
  #goRuntime = undefined;
  #teaVMImports = {};

  constructor(binaryURL, vmType) {
    this.#binaryURL = binaryURL;
    this.#vmType = vmType;
  }

  static Builder = class {
    #binaryURL = "";
    #vmType = VM_TYPE_WASI;

    setBinaryURL = (binaryURL) => {
      this.#binaryURL = binaryURL;

      return this;
    };

    useWASIRuntime = () => {
      this.#vmType = VM_TYPE_WASI;

      return this;
    };

    useTinyGoRuntime = () => {
      this.#vmType = VM_TYPE_TINYGO;

      return this;
    };

    useTeaVMRuntime = () => {
      this.#vmType = VM_TYPE_TEAVM;

      return this;
    };

    build = () => new VirtualMachine(this.#binaryURL, this.#vmType);
  };

  getStdout = async () =>
    this.#vmType === VM_TYPE_TEAVM ? "" : await this.#wasmFs.getStdOut();

  loadExports = async () => {
    switch (this.#vmType) {
      case VM_TYPE_WASI: {
        // Create the filesystem
        this.#wasmFs = new WasmFs();

        // Create the virtual machine
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
        this.#vm = await WebAssembly.instantiate(
          module,
          this.#wasi.getImports(module)
        );

        break;
      }
      case VM_TYPE_TINYGO: {
        // Create the filesystem
        this.#wasmFs = new WasmFs();

        // Create the virtual machine
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

        // Create Go runtime
        this.#goRuntime = new TinyGoRuntime();

        // Compile and instantiate the WASM binary
        const wasm_bytes = new Uint8Array(binary).buffer;
        const lowered_wasm = await lowerI64Imports(wasm_bytes);
        let module = await WebAssembly.compile(lowered_wasm);
        this.#vm = await WebAssembly.instantiate(module, {
          ...this.#wasi.getImports(module),
          ...this.#goRuntime.importObject,
        });

        break;
      }
      case VM_TYPE_TEAVM: {
        // Create TeaVM runtime
        TeaVMRuntime.wasm.importDefaults(this.#teaVMImports);

        // Fetch the WASM binary
        const binary = await fetch(this.#binaryURL).then((res) =>
          res.arrayBuffer()
        );

        // Compile and instantiate the WASM binary
        const wasm_bytes = new Uint8Array(binary).buffer;
        const lowered_wasm = await lowerI64Imports(wasm_bytes);
        let module = await WebAssembly.compile(lowered_wasm);
        this.#vm = await WebAssembly.instantiate(module, this.#teaVMImports);

        break;
      }
    }
  };

  start = async () => {
    switch (this.#vmType) {
      case VM_TYPE_WASI: {
        await this.#wasi.start(this.#vm);

        break;
      }
      case VM_TYPE_TINYGO: {
        this.#goRuntime.run(this.#vm);

        break;
      }
      case VM_TYPE_TEAVM: {
        this.#teaVMImports.teavm.logString.memory = this.#vm.exports.memory;

        this.#vm.exports.main();

        break;
      }
    }
  };

  call = async (functionName, ...functionArguments) =>
    await this.#vm.exports[functionName](...functionArguments);

  construct = async () => {
    const rv = await this.call("nebulark_ion_spark_construct");

    if (rv != 0)
      throw new Error(`could not construct spark. returned error code: ${rv}`);
  };

  inputSetLength = async (length) => {
    const rv = await this.call("nebulark_ion_spark_input_set_length", length);

    if (rv != 0)
      throw new Error(
        `could not set spark input length. returned error code: ${rv}`
      );
  };

  inputSet = async (index, input) => {
    const rv = await this.call("nebulark_ion_spark_input_set", index, input);

    if (rv != 0)
      throw new Error(`could not set spark input. returned error code: ${rv}`);
  };

  open = async () => {
    const rv = await this.call("nebulark_ion_spark_open");

    if (rv != 0)
      throw new Error(`could not open spark. returned error code: ${rv}`);
  };

  ignite = async () => {
    const rv = await this.call("nebulark_ion_spark_ignite");

    if (rv != 0)
      throw new Error(`could not ignite spark. returned error code: ${rv}`);
  };

  close = async () => {
    const rv = await this.call("nebulark_ion_spark_close");

    if (rv != 0)
      throw new Error(`could not close spark. returned error code: ${rv}`);
  };

  outputGetLength = async () =>
    await this.call("nebulark_ion_spark_output_get_length");

  outputGet = async (index) =>
    await this.call("nebulark_ion_spark_output_get", index);

  deconstruct = async () => {
    const rv = await this.call("nebulark_ion_spark_deconstruct");

    if (rv != 0)
      throw new Error(
        `could not deconstruct spark. returned error code: ${rv}`
      );
  };

  run = async (input) => {
    // Init
    await this.loadExports();
    await this.start();

    // Call pre-run hooks
    await this.construct();

    // Encode input
    const decodedInput = JSON.stringify(input);
    const rawEncodedInput = btoa(decodedInput);
    const encodedInput = new TextEncoder().encode(rawEncodedInput);

    // Write input
    await this.inputSetLength(encodedInput.length);
    await Promise.all(
      encodedInput.map((character, i) => this.inputSet(i, character))
    );

    // Call run hooks
    await this.open();
    await this.ignite();
    await this.close();

    // Read output
    const encodedOutputLength = await this.outputGetLength();
    const rawEncodedOutput = new Uint8Array(encodedOutputLength);
    for (let i = 0; i < encodedOutputLength; i++) {
      rawEncodedOutput[i] = await this.outputGet(i);
    }

    // Decode output
    const encodedOutput = new TextDecoder().decode(rawEncodedOutput);
    const decodedOutput = atob(encodedOutput);

    // Call post-run hooks
    await this.deconstruct();

    return JSON.parse(decodedOutput);
  };
}
