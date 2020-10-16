# Aliases
all: build

build: build-ion build-sparkexamples-tinygo-simple_calculator build-sparkexamples-tinygo-json_calculator build-sparkexamples-go-simple_calculator build-sparkexamples-go-json_calculator

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

# Runners
run-ion: build-ion
	@./nebulark-ion-server