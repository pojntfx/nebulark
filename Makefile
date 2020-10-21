# Aliases
all: build

build: build-ion build-sparkexamples-tinygo-simple_calculator build-sparkexamples-tinygo-json_calculator build-sparkexamples-c-simple_calculator build-sparkexamples-c-json_calculator build-sparkexamples-cpp-simple_calculator build-sparkexamples-teavm-json_calculator build-sparkexamples-teavm-simple_calculator build-sparkexamples-assemblyscript-simple_calculator build-sparkexamples-assemblyscript-json_calculator build-sparkexamples-zig-simple_calculator build-sparkexamples-zig-json_calculator

# Builders
build-ion:
	@GOARCH=wasm GOOS=js go build -o web/app.wasm cmd/nebulark-ion-app/main.go
	@go build -o nebulark-ion-server cmd/nebulark-ion-server/main.go

# Containers
build-wasi-sdk-container:
	@docker build -t pojntfx/wasi-sdk pkg/sparkexamples/c/json_calculator

build-zig-container:
	@docker build -t pojntfx/zig pkg/sparkexamples/zig/simple_calculator

# Spark Examples
build-sparkexamples-tinygo-simple_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/tinygo/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/tinygo/simple_calculator/ tinygo/tinygo sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && tinygo build -o $$OUTDIR/main.wasm -target=wasm main.go'

build-sparkexamples-tinygo-json_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/tinygo/json_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/tinygo/json_calculator/ tinygo/tinygo sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && tinygo build -o $$OUTDIR/main.wasm -target=wasm main.go'

build-sparkexamples-c-simple_calculator: build-wasi-sdk-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/c/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/c/simple_calculator/ pojntfx/wasi-sdk sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR rm -rf build && mkdir -p build && cd build && cmake .. && make && cp calculator.wasm $$OUTDIR/main.wasm'

build-sparkexamples-c-json_calculator: build-wasi-sdk-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/c/json_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/c/json_calculator/ pojntfx/wasi-sdk sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && rm -rf _deps && mkdir -p _deps && git clone https://github.com/zhicheng/base64.git _deps/base64 && rm -rf build && mkdir -p build && cd build && cmake .. && make && cp calculator.wasm $$OUTDIR/main.wasm'

build-sparkexamples-cpp-simple_calculator: build-wasi-sdk-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/cpp/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/cpp/simple_calculator/ pojntfx/wasi-sdk sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR rm -rf build && mkdir -p build && cd build && cmake .. && make && cp calculator.wasm $$OUTDIR/main.wasm'

build-sparkexamples-teavm-json_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/teavm/json_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/teavm/json_calculator/ maven sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && mvn clean install && cp target/javascript/classes.wasm $$OUTDIR/main.wasm'

build-sparkexamples-teavm-simple_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/teavm/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/teavm/simple_calculator/ maven sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && mvn clean install && cp target/javascript/classes.wasm $$OUTDIR/main.wasm'

build-sparkexamples-assemblyscript-simple_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/assemblyscript/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/assemblyscript/simple_calculator/ node sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && yarn && yarn asbuild && cp build/untouched.wasm $$OUTDIR/main.wasm'

build-sparkexamples-assemblyscript-json_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/assemblyscript/json_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/assemblyscript/json_calculator/ node sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && yarn && yarn asbuild && cp build/untouched.wasm $$OUTDIR/main.wasm'

build-sparkexamples-zig-simple_calculator: build-zig-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/zig/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/zig/simple_calculator/ pojntfx/zig sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && zig build-lib calculator.zig -target wasm32-wasi && cp calculator.wasm $$OUTDIR/main.wasm'

build-sparkexamples-zig-json_calculator: build-zig-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/zig/json_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/zig/json_calculator/ pojntfx/zig sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && zig build-lib calculator.zig -target wasm32-wasi && cp calculator.wasm $$OUTDIR/main.wasm'

# Runners
run-ion: build-ion
	@./nebulark-ion-server