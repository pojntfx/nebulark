# Aliases
all: build

build: build-ion build-sparkexamples-tinygo-simple_calculator

# Builders
build-ion:
	@GOARCH=wasm GOOS=js go build -o web/app.wasm cmd/nebulark-ion-app/main.go
	@go build -o nebulark-ion-server cmd/nebulark-ion-server/main.go

build-sparkexamples-tinygo-simple_calculator:
	docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark -it tinygo/tinygo sh -c "mkdir -p /root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/tinygo/simple_calculator/ && tinygo build -o /root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/tinygo/simple_calculator/main.wasm -target=wasm github.com/pojntfx/nebulark/pkg/sparkexamples/tinygo/simple_calculator"

# Runners
run-ion: build-ion
	@./nebulark-ion-server