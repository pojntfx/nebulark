# Aliases
all: build

build: build-ion build-sparkexamples-tinygo-simple_calculator build-sparkexamples-tinygo-json_calculator build-sparkexamples-go-simple_calculator build-sparkexamples-go-json_calculator build-sparkexamples-c-simple_calculator build-sparkexamples-cpp-simple_calculator build-sparkexamples-java-simple_calculator

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

build-clang-wasm32-wasi-container:
	@docker build -t pojntfx/clang-wasm32-wasi pkg/sparkexamples/c/simple_calculator

build-sparkexamples-c-simple_calculator: build-clang-wasm32-wasi-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/c/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/c/simple_calculator/ pojntfx/clang-wasm32-wasi sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && clang --sysroot=/wasi/wasi-sysroot --target=wasm32-wasi -Wl,--no-entry -o $$OUTDIR/main.wasm main.c'

build-sparkexamples-cpp-simple_calculator: build-clang-wasm32-wasi-container
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/cpp/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/cpp/simple_calculator/ pojntfx/clang-wasm32-wasi sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && clang --sysroot=/wasi/wasi-sysroot --target=wasm32-wasi -Wl,--no-entry -fno-exceptions -o $$OUTDIR/main.wasm main.cc'

build-sparkexamples-java-simple_calculator:
	@docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark -e WORKDIR=/root/go/src/github.com/pojntfx/nebulark/pkg/sparkexamples/java/simple_calculator/ -e OUTDIR=/root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/java/simple_calculator/ gradle sh -c 'mkdir -p $$OUTDIR && cd $$WORKDIR && ./gradlew build && cp build/distributions/* $$OUTDIR'

# Runners
run-ion: build-ion
	@./nebulark-ion-server