# Aliases
all: build

build: build-ion build-sparkexamples-tinygo-simple_calculator build-sparkexamples-tinygo-json_calculator build-sparkexamples-go-simple_calculator build-sparkexamples-go-json_calculator build-sparkexamples-c-simple_calculator build-sparkexamples-c-json_calculator build-sparkexamples-cpp-simple_calculator build-sparkexamples-jwebassembly-simple_calculator build-sparkexamples-teavm-json_calculator build-sparkexamples-assemblyscript-simple_calculator

# Builders
build-ion:
	@GOARCH=wasm GOOS=js go build -o web/app.wasm cmd/nebulark-ion-app/main.go
	@go build -o nebulark-ion-server cmd/nebulark-ion-server/main.go

build-wasi-sdk-container:
	@docker build -t pojntfx/wasi-sdk pkg/sparkexamples/c/json_calculator

build-sparkexamples-tinygo-simple_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/tinygo/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/tinygo/simple_calculator/ tinygo/tinygo sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && tinygo build -o $$OUTDIR/main.wasm -target=wasm main.go'

build-sparkexamples-tinygo-json_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/tinygo/json_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/tinygo/json_calculator/ tinygo/tinygo sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && tinygo build -o $$OUTDIR/main.wasm -target=wasm main.go'

build-sparkexamples-go-simple_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e GOARCH=wasm -e GOOS=js -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/go/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/go/simple_calculator/ golang sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && go build -o $$OUTDIR/main.wasm main.go'

build-sparkexamples-go-json_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e GOARCH=wasm -e GOOS=js -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/go/json_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/go/json_calculator/ golang sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && go build -o $$OUTDIR/main.wasm main.go'

build-sparkexamples-c-simple_calculator: build-wasi-sdk-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/c/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/c/simple_calculator/ pojntfx/wasi-sdk sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR rm -rf build && mkdir -p build && cd build && cmake .. && make && cp calculator.wasm $$OUTDIR/main.wasm'

build-sparkexamples-c-json_calculator: build-wasi-sdk-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/c/json_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/c/json_calculator/ pojntfx/wasi-sdk sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && rm -rf _deps && mkdir -p _deps && git clone https://github.com/zhicheng/base64.git _deps/base64 && rm -rf build && mkdir -p build && cd build && cmake .. && make && cp calculator.wasm $$OUTDIR/main.wasm'

build-sparkexamples-cpp-simple_calculator: build-wasi-sdk-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/cpp/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/cpp/simple_calculator/ pojntfx/wasi-sdk sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR rm -rf build && mkdir -p build && cd build && cmake .. && make && cp calculator.wasm $$OUTDIR/main.wasm'

build-sparkexamples-jwebassembly-simple_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/jwebassembly/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/jwebassembly/simple_calculator/ gradle sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && ./gradlew build && cp build/distributions/* $$OUTDIR && echo "export default wasmImports;" >> $$OUTDIR/$$(ls $$OUTDIR | grep .wasm.js)'

build-sparkexamples-teavm-json_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/teavm/json_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/teavm/json_calculator/ maven sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && mvn clean install && cp target/generated/wasm/teavm/classes.wasm $$OUTDIR/main.wasm'

build-sparkexamples-assemblyscript-simple_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark:Z -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/assemblyscript/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/assemblyscript/simple_calculator/ node sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && yarn && yarn asbuild && cp build/untouched.wasm $$OUTDIR/main.wasm'

# Runners
run-ion: build-ion
	@./nebulark-ion-server