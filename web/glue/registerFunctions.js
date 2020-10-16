global.import = (...args) => import(args);

global.openTinyGoWASMModule = (url, handler) => {
  const go = new TinyGo();

  fetch(url)
    .then((resp) => resp.arrayBuffer())
    .then((bytes) =>
      WebAssembly.instantiate(bytes, go.importObject).then((obj) => {
        go.run(obj.instance);

        handler(obj.instance);
      })
    );
};

global.openGoWASMModule = (url, handler) => {
  const go = new Go();

  fetch(url)
    .then((resp) => resp.arrayBuffer())
    .then((bytes) =>
      WebAssembly.instantiate(bytes, go.importObject).then((obj) => {
        go.run(obj.instance);

        handler(obj.instance);
      })
    );
};
