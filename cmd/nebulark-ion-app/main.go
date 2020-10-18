package main

import (
	"github.com/maxence-charriere/go-app/v7/pkg/app"
	"github.com/pojntfx/nebulark/pkg/components"
)

func main() {
	app.Route("/", &components.AppComponent{
		JSONTinyGoCalculatorTinyGoWasmExecInput: `{"firstAddend": 1, "secondAddend": 2}`,
		JSONGoCalculatorGoWasmExecInput:         `{"firstAddend": 1, "secondAddend": 2}`,
		JSONCCalculatorWASIInput:                `{"firstAddend": 1, "secondAddend": 2}`,
	})

	app.Run()
}
