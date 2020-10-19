package main

import (
	"github.com/maxence-charriere/go-app/v7/pkg/app"
	"github.com/pojntfx/nebulark/pkg/components"
	"github.com/pojntfx/nebulark/pkg/sparks"
)

func main() {
	app.Route("/", &components.AppComponent{
		JSONTinyGoCalculatorTinyGoWasmExecInput: `{"firstAddend": 1, "secondAddend": 2}`,
		JSONGoCalculatorGoWasmExecInput:         `{"firstAddend": 1, "secondAddend": 2}`,
		JSONCCalculatorWASISpark:                sparks.NewWASISpark("/web/sparkexamples/c/json_calculator/main.wasm"),
		JSONCCalculatorWASIInput:                `{"firstAddend": 1, "secondAddend": 2}`,
		SimpleAssemblyScriptCalculatorWASISpark: sparks.NewWASISpark("/web/sparkexamples/assemblyscript/simple_calculator/main.wasm"),
	})

	app.Run()
}
