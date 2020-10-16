all: build-ion build-sparkexamples-go-calculator

build-ion:
	@GOARCH=wasm GOOS=js go build -o web/app.wasm cmd/nebulark-ion-app/main.go
	@go build -o nebulark-ion-server cmd/nebulark-ion-server/main.go

run-ion: build-ion
	@./nebulark-ion-server

build-sparkexamples-go-calculator:
	docker run --rm -v ${PWD}:/root/go/src/github.com/pojntfx/nebulark -it tinygo/tinygo tinygo build -o /root/go/src/github.com/pojntfx/nebulark/web/sparkexamples_go_calculator.wasm -target=wasm github.com/pojntfx/nebulark/pkg/sparkexamples/go/calculator