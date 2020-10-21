package components

import (
	"log"
	"strconv"
	"syscall/js"

	"github.com/maxence-charriere/go-app/v7/pkg/app"
	"github.com/pojntfx/nebulark/pkg/runtimes"
)

type AppComponent struct {
	app.Compo

	SimpleTinyGoCalculatorTinyGoWasmExecSpark             *runtimes.TinyGoRuntime
	simpleTinyGoCalculatorTinyGoWasmExecInputFirstAddend  int
	simpleTinyGoCalculatorTinyGoWasmExecInputSecondAddend int
	simpleTinyGoCalculatorTinyGoWasmExecOutputSum         int

	JSONTinyGoCalculatorTinyGoWasmExecSpark             *runtimes.TinyGoRuntime
	jsonTinyGoCalculatorTinyGoWasmExecInputFirstAddend  int
	jsonTinyGoCalculatorTinyGoWasmExecInputSecondAddend int
	jsonTinyGoCalculatorTinyGoWasmExecOutputSum         int

	SimpleCCalculatorWASISpark             *runtimes.WASIRuntime
	simpleCCalculatorWASIInputFirstAddend  int
	simpleCCalculatorWASIInputSecondAddend int
	simpleCCalculatorWASIOutputSum         int

	JSONCCalculatorWASISpark             *runtimes.WASIRuntime
	jsonCCalculatorWASIInputFirstAddend  int
	jsonCCalculatorWASIInputSecondAddend int
	jsonCCalculatorWASIOutputSum         int

	simpleCppCalculatorWASIInputFirstAddend  int
	simpleCppCalculatorWASIInputSecondAddend int
	simpleCppCalculatorWASIOutputSum         int

	SimpleTeaVMCalculatorTeaVMWASMSpark             *runtimes.TeaVMRuntime
	simpleTeaVMCalculatorTeaVMWASMInputFirstAddend  int
	simpleTeaVMCalculatorTeaVMWASMInputSecondAddend int
	simpleTeaVMCalculatorTeaVMWASMOutputSum         int

	JSONTeaVMCalculatorTeaVMWASMSpark             *runtimes.TeaVMRuntime
	jsonTeaVMCalculatorTeaVMWASMInputFirstAddend  int
	jsonTeaVMCalculatorTeaVMWASMInputSecondAddend int
	jsonTeaVMCalculatorTeaVMWASMOutputSum         int

	SimpleAssemblyScriptCalculatorWASISpark             *runtimes.WASIRuntime
	simpleAssemblyScriptCalculatorWASIInputFirstAddend  int
	simpleAssemblyScriptCalculatorWASIInputSecondAddend int
	simpleAssemblyScriptCalculatorWASIOutputSum         int

	JSONAssemblyScriptCalculatorWASISpark             *runtimes.WASIRuntime
	jsonAssemblyScriptCalculatorWASIInputFirstAddend  int
	jsonAssemblyScriptCalculatorWASIInputSecondAddend int
	jsonAssemblyScriptCalculatorWASIOutputSum         int

	SimpleZigCalculatorWASISpark             *runtimes.WASIRuntime
	simpleZigCalculatorWASIInputFirstAddend  int
	simpleZigCalculatorWASIInputSecondAddend int
	simpleZigCalculatorWASIOutputSum         int

	JSONZigCalculatorWASISpark             *runtimes.WASIRuntime
	jsonZigCalculatorWASIInputFirstAddend  int
	jsonZigCalculatorWASIInputSecondAddend int
	jsonZigCalculatorWASIOutputSum         int
}

func (c *AppComponent) Render() app.UI {
	return app.Div().Class("pf-c-content").Body(
		app.H1().Class("pf-u-p-lg").Text("nebulark Ion Spark Examples"),
		app.Table().Class("pf-c-table pf-m-grid-md").Body(
			app.THead().Body(
				app.Tr().Body(
					app.Th().Text("Name"),
					app.Th().Text("Input"),
					app.Th().Text("Igniters"),
					app.Th().Text("Output"),
				),
			),
			app.TBody().Body(
				c.getExample(
					"Simple TinyGo Calculator (TinyGo WASM Runtime)",
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
							firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse first addend: %v\n", err)

								return
							}

							c.simpleTinyGoCalculatorTinyGoWasmExecInputFirstAddend = firstAddend
						}),
						app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
							secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse second addend: %v\n", err)

								return
							}

							c.simpleTinyGoCalculatorTinyGoWasmExecInputSecondAddend = secondAddend
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runSimpleTinyGoCalculatorTinyGoWasmExec()
						}),
					app.Div().Text(
						c.simpleTinyGoCalculatorTinyGoWasmExecOutputSum,
					),
				),
				c.getExample(
					"JSON TinyGo Calculator (TinyGo WASM Runtime)",
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
							firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse first addend: %v\n", err)

								return
							}

							c.jsonTinyGoCalculatorTinyGoWasmExecInputFirstAddend = firstAddend
						}),
						app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
							secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse second addend: %v\n", err)

								return
							}

							c.jsonTinyGoCalculatorTinyGoWasmExecInputSecondAddend = secondAddend
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runJSONTinyGoCalculatorTinyGoWasmExec()
						}),
					app.Div().Text(
						c.jsonTinyGoCalculatorTinyGoWasmExecOutputSum,
					),
				),
				c.getExample(
					"Simple C Calculator (WASI Runtime)",
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
							firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse first addend: %v\n", err)

								return
							}

							c.simpleCCalculatorWASIInputFirstAddend = firstAddend
						}),
						app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
							secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse second addend: %v\n", err)

								return
							}

							c.simpleCCalculatorWASIInputSecondAddend = secondAddend
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runSimpleCCalculatorWASI()
						}),
					app.Div().Text(
						c.simpleCCalculatorWASIOutputSum,
					),
				),
				c.getExample(
					"JSON C Calculator (WASI Runtime)",
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
							firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse first addend: %v\n", err)

								return
							}

							c.jsonCCalculatorWASIInputFirstAddend = firstAddend
						}),
						app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
							secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse second addend: %v\n", err)

								return
							}

							c.jsonCCalculatorWASIInputSecondAddend = secondAddend
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runJSONCCalculatorWASI()
						}),
					app.Div().Text(
						c.jsonCCalculatorWASIOutputSum,
					),
				),
				c.getExample(
					"Simple C++ Calculator (WASI Runtime)",
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
							firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse first addend: %v\n", err)

								return
							}

							c.simpleCppCalculatorWASIInputFirstAddend = firstAddend
						}),
						app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
							secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse second addend: %v\n", err)

								return
							}

							c.simpleCppCalculatorWASIInputSecondAddend = secondAddend
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runSimpleCppCalculatorWASI()
						}),
					app.Div().Text(
						c.simpleCppCalculatorWASIOutputSum,
					),
				),
				c.getExample(
					`Simple TeaVM Calculator (TeaVM WASM Runtime)`,
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
							firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse first addend: %v\n", err)

								return
							}

							c.simpleTeaVMCalculatorTeaVMWASMInputFirstAddend = firstAddend
						}),
						app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
							secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse second addend: %v\n", err)

								return
							}

							c.simpleTeaVMCalculatorTeaVMWASMInputSecondAddend = secondAddend
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runSimpleTeaVMCalculatorTeaVMWASM()
						}),
					app.Div().Text(
						c.simpleTeaVMCalculatorTeaVMWASMOutputSum,
					),
				),
				c.getExample(
					`JSON TeaVM Calculator (TeaVM WASM Runtime)`,
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
							firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse first addend: %v\n", err)

								return
							}

							c.jsonTeaVMCalculatorTeaVMWASMInputFirstAddend = firstAddend
						}),
						app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
							secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse second addend: %v\n", err)

								return
							}

							c.jsonTeaVMCalculatorTeaVMWASMInputSecondAddend = secondAddend
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runJSONTeaVMCalculatorTeaVMWASM()
						}),
					app.Div().Text(
						c.jsonTeaVMCalculatorTeaVMWASMOutputSum,
					),
				),
				c.getExample(
					"Simple AssemblyScript Calculator (WASI Runtime)",
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
							firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse first addend: %v\n", err)

								return
							}

							c.simpleAssemblyScriptCalculatorWASIInputFirstAddend = firstAddend
						}),
						app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
							secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse second addend: %v\n", err)

								return
							}

							c.simpleAssemblyScriptCalculatorWASIInputSecondAddend = secondAddend
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runSimpleAssemblyScriptCalculatorWASI()
						}),
					app.Div().Text(
						c.simpleAssemblyScriptCalculatorWASIOutputSum,
					),
				),
				c.getExample(
					"JSON AssemblyScript Calculator (WASI Runtime)",
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
							firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse first addend: %v\n", err)

								return
							}

							c.jsonAssemblyScriptCalculatorWASIInputFirstAddend = firstAddend
						}),
						app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
							secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse second addend: %v\n", err)

								return
							}

							c.jsonAssemblyScriptCalculatorWASIInputSecondAddend = secondAddend
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runJSONAssemblyScriptCalculatorWASI()
						}),
					app.Div().Text(
						c.jsonAssemblyScriptCalculatorWASIOutputSum,
					),
				),
				c.getExample(
					"Simple Zig Calculator (WASI Runtime)",
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
							firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse first addend: %v\n", err)

								return
							}

							c.simpleZigCalculatorWASIInputFirstAddend = firstAddend
						}),
						app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
							secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse second addend: %v\n", err)

								return
							}

							c.simpleZigCalculatorWASIInputSecondAddend = secondAddend
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runSimpleZigCalculatorWASI()
						}),
					app.Div().Text(
						c.simpleZigCalculatorWASIOutputSum,
					),
				),
				c.getExample(
					"JSON Zig Calculator (WASI Runtime)",
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
							firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse first addend: %v\n", err)

								return
							}

							c.jsonZigCalculatorWASIInputFirstAddend = firstAddend
						}),
						app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
							secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse second addend: %v\n", err)

								return
							}

							c.jsonZigCalculatorWASIInputSecondAddend = secondAddend
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runJSONZigCalculatorWASI()
						}),
					app.Div().Text(
						c.jsonZigCalculatorWASIOutputSum,
					),
				),
			),
		),
	)
}

func (c *AppComponent) getExample(
	title string,
	input app.UI,
	action app.UI,
	output app.UI,
) app.UI {
	return app.Tr().Body(
		app.Td().DataSet("label", "Name").Text(title),
		app.Td().DataSet("label", "Input").Body(input),
		app.Td().DataSet("label", "Igniters").Body(action),
		app.Td().DataSet("label", "Output").Body(output),
	)
}

func (c *AppComponent) runSimpleTinyGoCalculatorTinyGoWasmExec() {
	log.Println("running Simple TinyGo Calculator (TinyGo WASM Runtime)")

	if err := c.SimpleTinyGoCalculatorTinyGoWasmExecSpark.LoadExports(); err != nil {
		log.Printf("could not load spark exports: %v\n", err)
	}

	c.simpleTinyGoCalculatorTinyGoWasmExecOutputSum = c.SimpleTinyGoCalculatorTinyGoWasmExecSpark.Call("add", c.simpleTinyGoCalculatorTinyGoWasmExecInputFirstAddend, c.simpleTinyGoCalculatorTinyGoWasmExecInputSecondAddend).Int()

	c.Update()
}

func (c *AppComponent) runJSONTinyGoCalculatorTinyGoWasmExec() {
	log.Println("running JSON TinyGo Calculator (WASM Runtime)")

	input := &struct {
		FirstAddend  int `json:"firstAddend"`
		SecondAddend int `json:"secondAddend"`
	}{
		FirstAddend:  c.jsonTinyGoCalculatorTinyGoWasmExecInputFirstAddend,
		SecondAddend: c.jsonTinyGoCalculatorTinyGoWasmExecInputSecondAddend,
	}

	output := &struct {
		Sum int `json:"sum"`
	}{}

	if err := c.JSONTinyGoCalculatorTinyGoWasmExecSpark.Run(input, output); err != nil {
		log.Printf("could not run spark: %v\n", err)
	}

	c.jsonTinyGoCalculatorTinyGoWasmExecOutputSum = output.Sum

	c.Update()
}

func (c *AppComponent) runSimpleCCalculatorWASI() {
	log.Println("running Simple C Calculator (WASI Runtime)")

	if err := c.SimpleCCalculatorWASISpark.LoadExports(); err != nil {
		log.Printf("could not load spark exports: %v\n", err)
	}

	c.simpleCCalculatorWASIOutputSum = c.SimpleCCalculatorWASISpark.Call("add", c.simpleCCalculatorWASIInputFirstAddend, c.simpleCCalculatorWASIInputSecondAddend).Int()

	c.Update()
}

func (c *AppComponent) runJSONCCalculatorWASI() {
	log.Println("running JSON C Calculator (WASI Runtime)")

	input := &struct {
		FirstAddend  int `json:"firstAddend"`
		SecondAddend int `json:"secondAddend"`
	}{
		FirstAddend:  c.jsonCCalculatorWASIInputFirstAddend,
		SecondAddend: c.jsonCCalculatorWASIInputSecondAddend,
	}

	output := &struct {
		Sum int `json:"sum"`
	}{}

	if err := c.JSONCCalculatorWASISpark.Run(input, output); err != nil {
		log.Printf("could not run spark: %v\n", err)
	}

	c.jsonCCalculatorWASIOutputSum = output.Sum

	c.Update()
}

func (c *AppComponent) runSimpleCppCalculatorWASI() {
	js.Global().Call("openWASIWASMModule", "/web/examples/cpp/simple_calculator/main.wasm", js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
		log.Println("running Simple C++ Calculator (WASI Runtime)")

		c.simpleCppCalculatorWASIOutputSum = module[0].Get("exports").Call("ignite", c.simpleCppCalculatorWASIInputFirstAddend, c.simpleCppCalculatorWASIInputSecondAddend).Int()

		c.Update()

		return nil
	}))
}

func (c *AppComponent) runSimpleTeaVMCalculatorTeaVMWASM() {
	log.Println("running Simple TeaVM Calculator (TeaVM WASM Runtime)")

	if err := c.SimpleTeaVMCalculatorTeaVMWASMSpark.LoadExports(); err != nil {
		log.Printf("could not load spark exports: %v\n", err)

		return
	}

	res := c.SimpleTeaVMCalculatorTeaVMWASMSpark.Call("add", c.simpleTeaVMCalculatorTeaVMWASMInputFirstAddend, c.simpleTeaVMCalculatorTeaVMWASMInputSecondAddend)

	c.simpleTeaVMCalculatorTeaVMWASMOutputSum = res.Int()

	c.Update()
}

func (c *AppComponent) runJSONTeaVMCalculatorTeaVMWASM() {
	log.Println("running JSON TeaVM Calculator (TeaVM WASM Runtime)")

	input := &struct {
		FirstAddend  int `json:"firstAddend"`
		SecondAddend int `json:"secondAddend"`
	}{
		FirstAddend:  c.jsonTeaVMCalculatorTeaVMWASMInputFirstAddend,
		SecondAddend: c.jsonTeaVMCalculatorTeaVMWASMInputSecondAddend,
	}

	output := &struct {
		Sum int `json:"sum"`
	}{}

	if err := c.JSONTeaVMCalculatorTeaVMWASMSpark.Run(input, output); err != nil {
		log.Printf("could not run spark: %v\n", err)
	}

	c.jsonTeaVMCalculatorTeaVMWASMOutputSum = output.Sum

	c.Update()
}

func (c *AppComponent) runSimpleAssemblyScriptCalculatorWASI() {
	log.Println("running Simple AssemblyScript Calculator (WASI Runtime)")

	if err := c.SimpleAssemblyScriptCalculatorWASISpark.LoadExports(); err != nil {
		log.Printf("could not load spark exports: %v\n", err)

		return
	}

	res := c.SimpleAssemblyScriptCalculatorWASISpark.Call("add", c.simpleAssemblyScriptCalculatorWASIInputFirstAddend, c.simpleAssemblyScriptCalculatorWASIInputSecondAddend)

	c.simpleAssemblyScriptCalculatorWASIOutputSum = res.Int()

	c.Update()
}

func (c *AppComponent) runJSONAssemblyScriptCalculatorWASI() {
	log.Println("running JSON AssemblyScript Calculator (WASI Runtime)")

	input := &struct {
		FirstAddend  int `json:"firstAddend"`
		SecondAddend int `json:"secondAddend"`
	}{
		FirstAddend:  c.jsonAssemblyScriptCalculatorWASIInputFirstAddend,
		SecondAddend: c.jsonAssemblyScriptCalculatorWASIInputSecondAddend,
	}

	output := &struct {
		Sum int `json:"sum"`
	}{}

	if err := c.JSONAssemblyScriptCalculatorWASISpark.Run(input, output); err != nil {
		log.Printf("could not run spark: %v\n", err)
	}

	c.jsonAssemblyScriptCalculatorWASIOutputSum = output.Sum

	c.Update()
}

func (c *AppComponent) runSimpleZigCalculatorWASI() {
	log.Println("running Simple Zig Calculator (WASI Runtime)")

	if err := c.SimpleZigCalculatorWASISpark.LoadExports(); err != nil {
		log.Printf("could not load spark exports: %v\n", err)

		return
	}

	res := c.SimpleZigCalculatorWASISpark.Call("add", c.simpleZigCalculatorWASIInputFirstAddend, c.simpleZigCalculatorWASIInputSecondAddend)

	c.simpleZigCalculatorWASIOutputSum = res.Int()

	c.Update()
}

func (c *AppComponent) runJSONZigCalculatorWASI() {
	log.Println("running JSON Zig Calculator (WASI Runtime)")

	input := &struct {
		FirstAddend  int `json:"firstAddend"`
		SecondAddend int `json:"secondAddend"`
	}{
		FirstAddend:  c.jsonZigCalculatorWASIInputFirstAddend,
		SecondAddend: c.jsonZigCalculatorWASIInputSecondAddend,
	}

	output := &struct {
		Sum int `json:"sum"`
	}{}

	if err := c.JSONZigCalculatorWASISpark.Run(input, output); err != nil {
		log.Printf("could not run spark: %v\n", err)
	}

	c.jsonZigCalculatorWASIOutputSum = output.Sum

	c.Update()
}
