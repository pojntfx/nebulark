FROM alpine

WORKDIR /wasi

RUN apk add tar clang lld

RUN wget https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-11/libclang_rt.builtins-wasm32-wasi-11.0.tar.gz
RUN wget https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-11/wasi-sysroot-11.0.tar.gz

RUN tar xvfz libclang_rt.builtins-wasm32-wasi-11.0.tar.gz
RUN tar xvzf wasi-sysroot-11.0.tar.gz

RUN mkdir -p /usr/lib/clang/$(ls /usr/lib/clang/)/lib/wasi
RUN cp lib/wasi/libclang_rt.builtins-wasm32.a /usr/lib/clang/$(ls /usr/lib/clang/)/lib/wasi
