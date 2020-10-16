# Aliases
all: build

build: build-ion build-sparkexamples-tinygo-calculator

# Builders
build-ion:
	@GOARCH=wasm GOOS=js go build -o web/app.wasm cmd/nebulark-ion-app/main.go
	@go build -o nebulark-ion-server cmd/nebulark-ion-server/main.go

build-sparkexamples-tinygo-calculator:
	docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark -it tinygo/tinygo tinygo build -o /root/go/src/github.com/pojntfx/nebulark/web/sparkexamples/tinygo/calculator/main.wasm -target=wasm github.com/pojntfx/nebulark/pkg/sparkexamples/tinygo/calculator

# Runners
run-ion: build-ion
	@./nebulark-ion-server