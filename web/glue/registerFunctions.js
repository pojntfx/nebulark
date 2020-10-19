global.import = (...args) => import(args);

global.openTinyGoWASMModule = (url, handler) => {
  const go = new TinyGo();

  fetch(url)
    .then((resp) => resp.arrayBuffer())
    .then((bytes) =>
      WebAssembly.instantiate(bytes, go.importObject).then(({ instance }) => {
        go.run(instance);

        handler(instance);
      })
    );
};

global.openGoWASMModule = (url, handler) => {
  const go = new Go();

  fetch(url)
    .then((resp) => resp.arrayBuffer())
    .then((bytes) =>
      WebAssembly.instantiate(bytes, go.importObject).then(({ instance }) => {
        go.run(instance);

        handler(instance);
      })
    );
};

global.openWASIWASMModule = (url, handler) =>
  import("https://unpkg.com/@wasmer/wasi@0.12.0/lib/index.esm.js").then(
    (wasiModule) =>
      import("https://unpkg.com/@wasmer/wasmfs@0.12.0/lib/index.esm.js").then(
        (wasmFsModule) =>
          fetch(url)
            .then((resp) => resp.arrayBuffer())
            .then((res) => new Uint8Array(res).buffer)
            .then(WebAssembly.compile)
            .then((bytes) => {
              const wasmFs = new wasmFsModule.WasmFs();

              const wasi = new wasiModule.WASI({
                args: [],
                env: {},
                bindings: {
                  ...wasiModule.WASI.defaultBindings,
                  fs: wasmFs.fs,
                },
              });

              WebAssembly.instantiate(bytes, {
                ...wasi.getImports(bytes),
              }).then(async (vm) => {
                wasi.start(vm);

                handler(vm);

                wasmFs.getStdOut().then((stdout) => console.log(stdout));
              });
            })
      )
  );

global.openJWebAssemblyWASMModule = (url, wasmExecURL, handler) =>
  import(wasmExecURL).then((wasmImports) =>
    fetch(url)
      .then((resp) => resp.arrayBuffer())
      .then((bytes) =>
        WebAssembly.instantiate(
          bytes,
          wasmImports.default
        ).then(({ instance }) => handler(instance))
      )
  );

global.openTeaVMWASMModule = (url, wasmRuntimeURL, handler) =>
  import(wasmRuntimeURL).then((wasmImports) => {
    let options = {};
    let importObj = {};

    wasmImports.default.wasm.importDefaults(importObj);
    if (typeof options.installImports !== "undefined") {
      options.installImports(importObj);
    }

    fetch(url)
      .then((resp) => resp.arrayBuffer())
      .then((bytes) =>
        WebAssembly.instantiate(bytes, importObj).then((vm) => {
          importObj.teavm.logString.memory = vm.instance.exports.memory;

          vm.instance.exports.main();

          handler(vm.instance);
        })
      );
  });
