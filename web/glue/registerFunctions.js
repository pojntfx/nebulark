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
                  fs: wasmFs,
                },
              });

              WebAssembly.instantiate(bytes, {
                ...wasi.getImports(bytes),
              }).then((obj) => {
                wasi.start(obj);

                handler(obj);
              });
            })
      )
  );

global.openJavaWASMModule = (url, wasmExecURL, handler) =>
  import(wasmExecURL).then((wasmImports) => {
    fetch(url)
      .then((resp) => resp.arrayBuffer())
      .then((bytes) =>
        WebAssembly.instantiate(
          bytes,
          wasmImports.default
        ).then(({ instance }) => handler(instance))
      );
  });
