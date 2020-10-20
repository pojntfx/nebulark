package main

import (
	"github.com/maxence-charriere/go-app/v7/pkg/app"
	"github.com/pojntfx/nebulark/pkg/components"
	"github.com/pojntfx/nebulark/pkg/sparks"
)

func main() {
	app.Route("/", &components.AppComponent{
		JSONGoCalculatorGoWasmExecInput:           `{"firstAddend": 1, "secondAddend": 2}`,
		SimpleTinyGoCalculatorWASISpark:           sparks.NewWASISpark("/web/sparkexamples/tinygo/simple_calculator/main.wasm"),
		SimpleTinyGoCalculatorTinyGoWasmExecSpark: sparks.NewTinyGoSpark("/web/sparkexamples/tinygo/simple_calculator/main.wasm", "/web/glue/tinygo/wasm_exec.js"),
		JSONTinyGoCalculatorTinyGoWasmExecSpark:   sparks.NewTinyGoSpark("/web/sparkexamples/tinygo/json_calculator/main.wasm", "/web/glue/tinygo/wasm_exec.js"),
		SimpleCCalculatorWASISpark:                sparks.NewWASISpark("/web/sparkexamples/c/simple_calculator/main.wasm"),
		JSONCCalculatorWASISpark:                  sparks.NewWASISpark("/web/sparkexamples/c/json_calculator/main.wasm"),
		SimpleTeaVMCalculatorTeaVMWASMSpark:       sparks.NewTeaVMSpark("/web/sparkexamples/teavm/simple_calculator/main.wasm", "/web/glue/teavm/wasm-runtime.js"),
		SimpleAssemblyScriptCalculatorWASISpark:   sparks.NewWASISpark("/web/sparkexamples/assemblyscript/simple_calculator/main.wasm"),
		JSONAssemblyScriptCalculatorWASISpark:     sparks.NewWASISpark("/web/sparkexamples/assemblyscript/json_calculator/main.wasm"),
		SimpleZigCalculatorWASISpark:              sparks.NewWASISpark("/web/sparkexamples/zig/simple_calculator/main.wasm"),
	})

	app.Run()
}
