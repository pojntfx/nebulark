# Aliases
all: build

build: build-ion build-sparkexamples-tinygo-simple_calculator build-sparkexamples-tinygo-json_calculator build-sparkexamples-go-simple_calculator build-sparkexamples-go-json_calculator build-sparkexamples-c-simple_calculator build-sparkexamples-c-json_calculator build-sparkexamples-cpp-simple_calculator build-sparkexamples-java-simple_calculator

# Builders
build-ion:
	@GOARCH=wasm GOOS=js go build -o web/app.wasm cmd/nebulark-ion-app/main.go
	@go build -o nebulark-ion-server cmd/nebulark-ion-server/main.go

build-sparkexamples-tinygo-simple_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/tinygo/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/tinygo/simple_calculator/ tinygo/tinygo sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && tinygo build -o $$OUTDIR/main.wasm -target=wasm main.go'

build-sparkexamples-tinygo-json_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/tinygo/json_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/tinygo/json_calculator/ tinygo/tinygo sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && tinygo build -o $$OUTDIR/main.wasm -target=wasm main.go'

build-sparkexamples-go-simple_calculator:
	@GOARCH=wasm GOOS=js go build -o web/sparkexamples/go/simple_calculator/main.wasm ./pkg/sparkexamples/go/simple_calculator/main.go

build-sparkexamples-go-json_calculator:
	@GOARCH=wasm GOOS=js go build -o web/sparkexamples/go/json_calculator/main.wasm ./pkg/sparkexamples/go/json_calculator/main.go

build-wasi-sdk-container:
	@docker build -t pojntfx/wasi-sdk pkg/sparkexamples/c/json_calculator

build-sparkexamples-c-simple_calculator: build-wasi-sdk-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/c/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/c/simple_calculator/ pojntfx/wasi-sdk sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR rm -rf build && mkdir -p build && cd build && cmake .. && make && cp calculator.wasm $$OUTDIR/main.wasm'

build-sparkexamples-c-json_calculator: build-wasi-sdk-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/c/json_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/c/json_calculator/ pojntfx/wasi-sdk sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && rm -rf _deps && mkdir -p _deps && git clone https://github.com/zhicheng/base64.git _deps/base64 && git clone https://github.com/akheron/jansson.git _deps/jansson && rm -rf build && mkdir -p build && cd build && cmake .. && make && cp calculator.wasm $$OUTDIR/main.wasm'

build-sparkexamples-cpp-simple_calculator: build-wasi-sdk-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/cpp/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/cpp/simple_calculator/ pojntfx/wasi-sdk sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR rm -rf build && mkdir -p build && cd build && cmake .. && make && cp calculator.wasm $$OUTDIR/main.wasm'

build-sparkexamples-java-simple_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/java/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/java/simple_calculator/ gradle sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && ./gradlew build && cp build/distributions/* $$OUTDIR && echo "export default wasmImports;" >> $$OUTDIR/$$(ls $$OUTDIR | grep .wasm.js)'

# Runners
run-ion: build-ion
	@./nebulark-ion-server