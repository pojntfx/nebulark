# Aliases
all: build

build: build-ion build-examples-tinygo-simple_calculator build-examples-tinygo-json_calculator build-examples-c-simple_calculator build-examples-c-json_calculator build-examples-cpp-simple_calculator build-examples-cpp-json_calculator build-examples-teavm-json_calculator build-examples-teavm-simple_calculator build-examples-assemblyscript-simple_calculator build-examples-assemblyscript-json_calculator build-examples-zig-simple_calculator build-examples-zig-json_calculator

# Builders
build-ion:
	@GOARCH=wasm GOOS=js go build -o web/app.wasm cmd/nebulark-ion-app/main.go
	@go build -o nebulark-ion-server cmd/nebulark-ion-server/main.go

# Containers
build-wasi-sdk-container:
	@docker build -t pojntfx/wasi-sdk pkg/examples/c/json_calculator

build-zig-container:
	@docker build -t pojntfx/zig pkg/examples/zig/simple_calculator

# Examples
build-examples-tinygo-simple_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/examples/tinygo/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/examples/tinygo/simple_calculator/ tinygo/tinygo sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && tinygo build -o $$OUTDIR/main.wasm -target=wasm main.go'

build-examples-tinygo-json_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/examples/tinygo/json_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/examples/tinygo/json_calculator/ tinygo/tinygo sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && tinygo build -o $$OUTDIR/main.wasm -target=wasm main.go'

build-examples-c-simple_calculator: build-wasi-sdk-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/examples/c/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/examples/c/simple_calculator/ pojntfx/wasi-sdk sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && rm -rf build && mkdir -p build && cd build && cmake .. && make && cp calculator.wasm $$OUTDIR/main.wasm'

build-examples-c-json_calculator: build-wasi-sdk-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/examples/c/json_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/examples/c/json_calculator/ pojntfx/wasi-sdk sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && rm -rf _deps && mkdir -p _deps && git clone https://github.com/zhicheng/base64.git _deps/base64 && rm -rf build && mkdir -p build && cd build && cmake .. && make && cp calculator.wasm $$OUTDIR/main.wasm'

build-examples-cpp-simple_calculator: build-wasi-sdk-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/examples/cpp/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/examples/cpp/simple_calculator/ pojntfx/wasi-sdk sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && rm -rf build && mkdir -p build && cd build && cmake .. && make && cp calculator.wasm $$OUTDIR/main.wasm'

build-examples-cpp-json_calculator: build-wasi-sdk-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/examples/cpp/json_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/examples/cpp/json_calculator/ pojntfx/wasi-sdk sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && rm -rf _deps && mkdir -p _deps && git clone https://github.com/tkislan/base64.git _deps/base64 && rm -rf build && mkdir -p build && cd build && cmake .. && make && cp calculator.wasm $$OUTDIR/main.wasm'

build-examples-teavm-json_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/examples/teavm/json_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/examples/teavm/json_calculator/ maven sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && mvn clean install && cp target/javascript/classes.wasm $$OUTDIR/main.wasm'

build-examples-teavm-simple_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/examples/teavm/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/examples/teavm/simple_calculator/ maven sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && mvn clean install && cp target/javascript/classes.wasm $$OUTDIR/main.wasm'

build-examples-assemblyscript-simple_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/examples/assemblyscript/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/examples/assemblyscript/simple_calculator/ node sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && yarn && yarn asbuild && cp build/untouched.wasm $$OUTDIR/main.wasm'

build-examples-assemblyscript-json_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/examples/assemblyscript/json_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/examples/assemblyscript/json_calculator/ node sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && yarn && yarn asbuild && cp build/untouched.wasm $$OUTDIR/main.wasm'

build-examples-zig-simple_calculator: build-zig-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/examples/zig/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/examples/zig/simple_calculator/ pojntfx/zig sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && zig build-lib calculator.zig -target wasm32-wasi && cp calculator.wasm $$OUTDIR/main.wasm'

build-examples-zig-json_calculator: build-zig-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/examples/zig/json_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/examples/zig/json_calculator/ pojntfx/zig sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && zig build-lib calculator.zig -target wasm32-wasi && cp calculator.wasm $$OUTDIR/main.wasm'

# Cleaners
clean:
	@rm -f nebulark-ion-server
	@rm -f web/app.wasm
	@rm -rf web/examples
	@rm -rf pkg/examples/assemblyscript/json_calculator/build
	@rm -rf pkg/examples/assemblyscript/json_calculator/node_modules
	@rm -rf pkg/examples/assemblyscript/simple_calculator/build
	@rm -rf pkg/examples/assemblyscript/simple_calculator/node_modules
	@rm -rf pkg/examples/c/json_calculator/_deps
	@rm -rf pkg/examples/c/json_calculator/build
	@rm -rf pkg/examples/c/simple_calculator/build
	@rm -rf pkg/examples/cpp/json_calculator/_deps
	@rm -rf pkg/examples/cpp/json_calculator/build
	@rm -rf pkg/examples/cpp/simple_calculator/build
	@rm -rf pkg/examples/teavm/json_calculator/target
	@rm -rf pkg/examples/teavm/simple_calculator/target
	@rm -rf pkg/examples/zig/json_calculator/calculator.o
	@rm -rf pkg/examples/zig/json_calculator/calculator.wasm
	@rm -rf pkg/examples/zig/simple_calculator/calculator.o
	@rm -rf pkg/examples/zig/simple_calculator/calculator.wasm

# Runners
run-ion: build-ion
	@./nebulark-ion-server