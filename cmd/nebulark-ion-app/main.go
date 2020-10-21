package main

import (
	"github.com/maxence-charriere/go-app/v7/pkg/app"
	"github.com/pojntfx/nebulark/pkg/components"
	"github.com/pojntfx/nebulark/pkg/runtimes"
)

func main() {
	app.Route("/", &components.AppComponent{
		SimpleExamples: []components.CalculatorExample{
			{
				Title:       "C Calculator Simple Example",
				WASIRuntime: runtimes.NewWASIRuntime("/web/examples/c/simple_calculator/main.wasm"),
			},
			{
				Title:       "C++ Calculator Simple Example",
				WASIRuntime: runtimes.NewWASIRuntime("/web/examples/cpp/simple_calculator/main.wasm"),
			},
			{
				Title:       "AssemblyScript Calculator Simple Example",
				WASIRuntime: runtimes.NewWASIRuntime("/web/examples/assemblyscript/simple_calculator/main.wasm"),
			},
			{
				Title:       "Zig Calculator Simple Example",
				WASIRuntime: runtimes.NewWASIRuntime("/web/examples/zig/simple_calculator/main.wasm"),
			},
			{
				Title:         "TinyGo Calculator Simple Example",
				TinyGoRuntime: runtimes.NewTinyGoRuntime("/web/examples/tinygo/simple_calculator/main.wasm", "/web/glue/tinygo/wasm_exec.js"),
			},
			{
				Title:        "TeaVM Calculator Simple Example",
				TeaVMRuntime: runtimes.NewTeaVMRuntime("/web/examples/teavm/simple_calculator/main.wasm", "/web/glue/teavm/wasm-runtime.js"),
			},
		},

		JSONExamples: []components.CalculatorExample{
			{
				Title:       "C Calculator JSON Example",
				WASIRuntime: runtimes.NewWASIRuntime("/web/examples/c/json_calculator/main.wasm"),
			},
			{
				Title:       "AssemblyScript Calculator JSON Example",
				WASIRuntime: runtimes.NewWASIRuntime("/web/examples/assemblyscript/json_calculator/main.wasm"),
			},
			{
				Title:       "Zig Calculator JSON Example",
				WASIRuntime: runtimes.NewWASIRuntime("/web/examples/zig/json_calculator/main.wasm"),
			},
			{
				Title:         "TinyGo Calculator JSON Example",
				TinyGoRuntime: runtimes.NewTinyGoRuntime("/web/examples/tinygo/json_calculator/main.wasm", "/web/glue/tinygo/wasm_exec.js"),
			},
			{
				Title:        "TeaVM Calculator JSON Example",
				TeaVMRuntime: runtimes.NewTeaVMRuntime("/web/examples/teavm/json_calculator/main.wasm", "/web/glue/teavm/wasm-runtime.js"),
			},
		},
	})

	app.Run()
}
