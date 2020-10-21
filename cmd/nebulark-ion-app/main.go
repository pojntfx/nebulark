package main

import (
	"github.com/maxence-charriere/go-app/v7/pkg/app"
	"github.com/pojntfx/nebulark/pkg/components"
	"github.com/pojntfx/nebulark/pkg/runtimes"
)

func main() {
	app.Route("/", &components.AppComponent{
		SimpleTinyGoCalculatorTinyGoWasmExecSpark: runtimes.NewTinyGoRuntime("/web/examples/tinygo/simple_calculator/main.wasm", "/web/glue/tinygo/wasm_exec.js"),
		JSONTinyGoCalculatorTinyGoWasmExecSpark:   runtimes.NewTinyGoRuntime("/web/examples/tinygo/json_calculator/main.wasm", "/web/glue/tinygo/wasm_exec.js"),
		SimpleCCalculatorWASISpark:                runtimes.NewWASIRuntime("/web/examples/c/simple_calculator/main.wasm"),
		JSONCCalculatorWASISpark:                  runtimes.NewWASIRuntime("/web/examples/c/json_calculator/main.wasm"),
		SimpleTeaVMCalculatorTeaVMWASMSpark:       runtimes.NewTeaVMRuntime("/web/examples/teavm/simple_calculator/main.wasm", "/web/glue/teavm/wasm-runtime.js"),
		JSONTeaVMCalculatorTeaVMWASMSpark:         runtimes.NewTeaVMRuntime("/web/examples/teavm/json_calculator/main.wasm", "/web/glue/teavm/wasm-runtime.js"),
		SimpleAssemblyScriptCalculatorWASISpark:   runtimes.NewWASIRuntime("/web/examples/assemblyscript/simple_calculator/main.wasm"),
		JSONAssemblyScriptCalculatorWASISpark:     runtimes.NewWASIRuntime("/web/examples/assemblyscript/json_calculator/main.wasm"),
		SimpleZigCalculatorWASISpark:              runtimes.NewWASIRuntime("/web/examples/zig/simple_calculator/main.wasm"),
		JSONZigCalculatorWASISpark:                runtimes.NewWASIRuntime("/web/examples/zig/json_calculator/main.wasm"),
	})

	app.Run()
}
