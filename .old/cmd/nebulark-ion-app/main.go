package main

import (
	"github.com/maxence-charriere/go-app/v7/pkg/app"
	"github.com/pojntfx/nebulark/pkg/components"
	"github.com/pojntfx/nebulark/pkg/virtualmachines"
)

func main() {
	app.Route("/", &components.AppComponent{
		SimpleExamples: []components.CalculatorExample{
			{
				Title:          "C Calculator Simple Example",
				VirtualMachine: virtualmachines.NewWASMVirtualMachineBuilder().SetBinary("/web/examples/c/simple_calculator/main.wasm").EnableWASIRuntime().Build(),
			},
			{
				Title:          "C++ Calculator Simple Example",
				VirtualMachine: virtualmachines.NewWASMVirtualMachineBuilder().SetBinary("/web/examples/cpp/simple_calculator/main.wasm").EnableWASIRuntime().Build(),
			},
			{
				Title:          "AssemblyScript Calculator Simple Example",
				VirtualMachine: virtualmachines.NewWASMVirtualMachineBuilder().SetBinary("/web/examples/assemblyscript/simple_calculator/main.wasm").EnableWASIRuntime().Build(),
			},
			{
				Title:          "Zig Calculator Simple Example",
				VirtualMachine: virtualmachines.NewWASMVirtualMachineBuilder().SetBinary("/web/examples/zig/simple_calculator/main.wasm").EnableWASIRuntime().Build(),
			},
			{
				Title:          "TinyGo Calculator Simple Example",
				VirtualMachine: virtualmachines.NewWASMVirtualMachineBuilder().SetBinary("/web/examples/tinygo/simple_calculator/main.wasm").EnableTinyGoRuntime("/web/glue/tinygo/wasm_exec.js").Build(),
			},
			{
				Title:          "TeaVM Calculator Simple Example",
				VirtualMachine: virtualmachines.NewWASMVirtualMachineBuilder().SetBinary("/web/examples/teavm/simple_calculator/main.wasm").EnableTeaVMRuntime("/web/glue/teavm/wasm-runtime.js").Build(),
			},
		},

		JSONExamples: []components.CalculatorExample{
			{
				Title:          "C Calculator JSON Example",
				VirtualMachine: virtualmachines.NewWASMVirtualMachineBuilder().SetBinary("/web/examples/c/json_calculator/main.wasm").EnableWASIRuntime().Build(),
			},
			{
				Title:			"C++ Calculator JSON Example",
				VirtualMachine: virtualmachines.NewWASMVirtualMachineBuilder().SetBinary("/web/examples/cpp/json_calculator/main.wasm").EnableWASIRuntime().Build(),
			},
			{
				Title:          "AssemblyScript Calculator JSON Example",
				VirtualMachine: virtualmachines.NewWASMVirtualMachineBuilder().SetBinary("/web/examples/assemblyscript/json_calculator/main.wasm").EnableWASIRuntime().Build(),
			},
			{
				Title:          "Zig Calculator JSON Example",
				VirtualMachine: virtualmachines.NewWASMVirtualMachineBuilder().SetBinary("/web/examples/zig/json_calculator/main.wasm").EnableWASIRuntime().Build(),
			},
			{
				Title:          "TinyGo Calculator JSON Example",
				VirtualMachine: virtualmachines.NewWASMVirtualMachineBuilder().SetBinary("/web/examples/tinygo/json_calculator/main.wasm").EnableTinyGoRuntime("/web/glue/tinygo/wasm_exec.js").Build(),
			},
			{
				Title:          "TeaVM Calculator JSON Example",
				VirtualMachine: virtualmachines.NewWASMVirtualMachineBuilder().SetBinary("/web/examples/teavm/json_calculator/main.wasm").EnableTeaVMRuntime("/web/glue/teavm/wasm-runtime.js").Build(),
			},
		},
	})

	app.Run()
}
