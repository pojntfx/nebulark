package components

import (
	"encoding/base64"
	"log"
	"strconv"
	"syscall/js"

	"github.com/maxence-charriere/go-app/v7/pkg/app"
	"github.com/pojntfx/nebulark/pkg/sparks"
)

type AppComponent struct {
	app.Compo

	simpleTinyGoCalculatorTinyGoWasmExecInputFirstAddend  int
	simpleTinyGoCalculatorTinyGoWasmExecInputSecondAddend int
	simpleTinyGoCalculatorTinyGoWasmExecOutputSum         int

	simpleTinyGoCalculatorWASIInputFirstAddend  int
	simpleTinyGoCalculatorWASIInputSecondAddend int
	simpleTinyGoCalculatorWASIOutputSum         int

	JSONTinyGoCalculatorTinyGoWasmExecInput  string
	jsonTinyGoCalculatorTinyGoWasmExecOutput string

	simpleGoCalculatorGoWasmExecInputFirstAddend  int
	simpleGoCalculatorGoWasmExecInputSecondAddend int
	simpleGoCalculatorGoWasmExecOutputSum         int

	JSONGoCalculatorGoWasmExecInput  string
	jsonGoCalculatorGoWasmExecOutput string

	simpleCCalculatorWASIInputFirstAddend  int
	simpleCCalculatorWASIInputSecondAddend int
	simpleCCalculatorWASIOutputSum         int

	JSONCCalculatorWASISpark  *sparks.WASISpark
	JSONCCalculatorWASIInput  string
	jsonCCalculatorWASIOutput string

	simpleCppCalculatorWASIInputFirstAddend  int
	simpleCppCalculatorWASIInputSecondAddend int
	simpleCppCalculatorWASIOutputSum         int

	simpleJavaCalculatorJWebAssemblyWASMInputFirstAddend  int
	simpleJavaCalculatorJWebAssemblyWASMInputSecondAddend int
	simpleJavaCalculatorJWebAssemblyWASMOutputSum         int
}

func (c *AppComponent) Render() app.UI {
	return app.Div().Class("pf-c-content").Body(
		app.H1().Class("pf-u-p-lg").Text("nebulark Ion Spark Runner Examples"),
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
					"Simple TinyGo Calculator (TinyGo wasm_exec)",
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
					"Simple TinyGo Calculator (WASI)",
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
							firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse first addend: %v\n", err)

								return
							}

							c.simpleTinyGoCalculatorWASIInputFirstAddend = firstAddend
						}),
						app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
							secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse second addend: %v\n", err)

								return
							}

							c.simpleTinyGoCalculatorWASIInputSecondAddend = secondAddend
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runSimpleTinyGoCalculatorWASI()
						}),
					app.Div().Text(
						c.simpleTinyGoCalculatorWASIOutputSum,
					),
				),
				c.getExample(
					"JSON TinyGo Calculator (TinyGo wasm_exec)",
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("text").Placeholder("JSON Input").Value(c.JSONTinyGoCalculatorTinyGoWasmExecInput).OnInput(func(ctx app.Context, e app.Event) {
							c.JSONTinyGoCalculatorTinyGoWasmExecInput = e.Get("target").Get("value").String()
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runJSONTinyGoCalculatorTinyGoWasmExec()
						}),
					app.Div().Text(
						c.jsonTinyGoCalculatorTinyGoWasmExecOutput,
					),
				),
				c.getExample(
					"Simple Go Calculator (Go wasm_exec)",
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
							firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse first addend: %v\n", err)

								return
							}

							c.simpleGoCalculatorGoWasmExecInputFirstAddend = firstAddend
						}),
						app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
							secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse second addend: %v\n", err)

								return
							}

							c.simpleGoCalculatorGoWasmExecInputSecondAddend = secondAddend
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runSimpleGoCalculatorGoWasmExec()
						}),
					app.Div().Text(
						c.simpleGoCalculatorGoWasmExecOutputSum,
					),
				),
				c.getExample(
					"JSON Go Calculator (Go wasm_exec)",
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("text").Placeholder("JSON Input").Value(c.JSONGoCalculatorGoWasmExecInput).OnInput(func(ctx app.Context, e app.Event) {
							c.JSONGoCalculatorGoWasmExecInput = e.Get("target").Get("value").String()
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runJSONGoCalculatorGoWasmExec()
						}),
					app.Div().Text(
						c.jsonGoCalculatorGoWasmExecOutput,
					),
				),
				c.getExample(
					"Simple C Calculator (WASI)",
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
					"JSON C Calculator (WASI)",
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("text").Placeholder("JSON Input").Value(c.JSONCCalculatorWASIInput).OnInput(func(ctx app.Context, e app.Event) {
							c.JSONCCalculatorWASIInput = e.Get("target").Get("value").String()
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runJSONCCalculatorWASI()
						}),
					app.Div().Text(
						c.jsonCCalculatorWASIOutput,
					),
				),
				c.getExample(
					"Simple C++ Calculator (WASI)",
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
					`Simple Java Calculator (JWebAssembly wasm)`,
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
							firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse first addend: %v\n", err)

								return
							}

							c.simpleJavaCalculatorJWebAssemblyWASMInputFirstAddend = firstAddend
						}),
						app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
							secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse second addend: %v\n", err)

								return
							}

							c.simpleJavaCalculatorJWebAssemblyWASMInputSecondAddend = secondAddend
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runSimpleJavaCalculatorJWebAssemblyWASM()
						}),
					app.Div().Text(
						c.simpleJavaCalculatorJWebAssemblyWASMOutputSum,
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
	js.Global().Call("import", "/web/glue/tinygo/wasm_exec.js").Call("then", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		js.Global().Call("openTinyGoWASMModule", "/web/sparkexamples/tinygo/simple_calculator/main.wasm", js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
			log.Println("running Simple TinyGo Calculator (TinyGo wasm_exec)")

			c.simpleTinyGoCalculatorTinyGoWasmExecOutputSum = module[0].Get("exports").Call("ignite", c.simpleTinyGoCalculatorTinyGoWasmExecInputFirstAddend, c.simpleTinyGoCalculatorTinyGoWasmExecInputSecondAddend).Int()

			c.Update()

			return nil
		}))

		return nil
	}))
}

func (c *AppComponent) runSimpleTinyGoCalculatorWASI() {
	js.Global().Call("openWASIWASMModule", "/web/sparkexamples/tinygo/simple_calculator/main.wasm", js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
		log.Println("running Simple TinyGo Calculator (WASI)")

		c.simpleTinyGoCalculatorWASIOutputSum = module[0].Get("exports").Call("ignite", c.simpleTinyGoCalculatorWASIInputFirstAddend, c.simpleTinyGoCalculatorWASIInputSecondAddend).Int()

		c.Update()

		return nil
	}))
}

func (c *AppComponent) runJSONTinyGoCalculatorTinyGoWasmExec() {
	js.Global().Call("import", "/web/glue/tinygo/wasm_exec.js").Call("then", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		js.Global().Call("openTinyGoWASMModule", "/web/sparkexamples/tinygo/json_calculator/main.wasm", js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
			log.Println("running JSON TinyGo Calculator (TinyGo wasm_exec)")

			encodedInput := base64.RawStdEncoding.EncodeToString([]byte(c.JSONTinyGoCalculatorTinyGoWasmExecInput))

			for _, character := range []byte(encodedInput) {
				module[0].Get("exports").Call("append_to_encoded_input", character)
			}

			outputLength := module[0].Get("exports").Call("ignite").Int()

			encodedOutput := []uint8{}
			for i := 0; i < outputLength; i++ {
				encodedOutput = append(encodedOutput, uint8(module[0].Get("exports").Call("get_from_encoded_input", i).Int()))
			}

			decodedInput, err := base64.RawStdEncoding.DecodeString(string(encodedOutput))
			if err != nil {
				log.Fatal("could not decode spark output", err)

				return nil
			}

			c.jsonTinyGoCalculatorTinyGoWasmExecOutput = string(decodedInput)

			c.Update()

			return nil
		}))

		return nil
	}))
}

func (c *AppComponent) runSimpleGoCalculatorGoWasmExec() {
	js.Global().Call("import", "/web/glue/go/wasm_exec.js").Call("then", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		js.Global().Call("openGoWASMModule", "/web/sparkexamples/go/simple_calculator/main.wasm", js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
			log.Println("running Simple Go Calculator (Go wasm_exec)")

			c.simpleGoCalculatorGoWasmExecOutputSum = js.Global().Call("ignite", c.simpleGoCalculatorGoWasmExecInputFirstAddend, c.simpleGoCalculatorGoWasmExecInputSecondAddend).Int()

			c.Update()

			return nil
		}))

		return nil
	}))
}

func (c *AppComponent) runJSONGoCalculatorGoWasmExec() {
	js.Global().Call("import", "/web/glue/go/wasm_exec.js").Call("then", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		js.Global().Call("openGoWASMModule", "/web/sparkexamples/go/json_calculator/main.wasm", js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
			log.Println("running JSON Go Calculator (Go wasm_exec)")

			encodedOutput := js.Global().Call("ignite", base64.RawStdEncoding.EncodeToString([]byte(c.JSONGoCalculatorGoWasmExecInput))).String()

			decodedOutput, err := base64.RawStdEncoding.DecodeString(encodedOutput)
			if err != nil {
				log.Printf("could not decode spark output: %v\n", err)

				return nil
			}

			c.jsonGoCalculatorGoWasmExecOutput = string(decodedOutput)

			c.Update()

			return nil
		}))

		return nil
	}))
}

func (c *AppComponent) runSimpleCCalculatorWASI() {
	js.Global().Call("openWASIWASMModule", "/web/sparkexamples/c/simple_calculator/main.wasm", js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
		log.Println("running Simple C Calculator (WASI)")

		c.simpleCCalculatorWASIOutputSum = module[0].Get("exports").Call("ignite", c.simpleCCalculatorWASIInputFirstAddend, c.simpleCCalculatorWASIInputSecondAddend).Int()

		c.Update()

		return nil
	}))
}

func (c *AppComponent) runJSONCCalculatorWASI() {
	if err := c.JSONCCalculatorWASISpark.LoadExports(); err != nil {
		log.Printf("could not load spark exports: %v\n", err)

		return
	}

	if err := c.JSONCCalculatorWASISpark.Construct(); err != nil {
		log.Printf("could not construct spark: %v\n", err)

		return
	}

	// js.Global().Call("openWASIWASMModule", "/web/sparkexamples/c/json_calculator/main.wasm", js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
	// 	log.Println("running JSON C Calculator (WASI)")

	// 	encodedInput := base64.RawStdEncoding.EncodeToString([]byte(c.JSONCCalculatorWASIInput))

	// 	module[0].Get("exports").Call("spark_init", len(encodedInput))

	// 	for i, character := range []byte(encodedInput) {
	// 		module[0].Get("exports").Call("spark_append_to_encoded_input", character, i)
	// 	}

	// 	outputLength := module[0].Get("exports").Call("spark_ignite").Int()

	// 	encodedOutput := []uint8{}
	// 	for i := 0; i < outputLength; i++ {
	// 		encodedOutput = append(encodedOutput, uint8(module[0].Get("exports").Call("spark_get_from_encoded_input", i).Int()))
	// 	}

	// 	fmt.Println(outputLength, encodedInput)

	// 	decodedInput, err := base64.RawStdEncoding.DecodeString(string(encodedOutput))
	// 	if err != nil {
	// 		log.Fatal("could not decode spark output", err)

	// 		return nil
	// 	}

	// 	c.jsonCCalculatorWASIOutput = string(decodedInput)

	// 	c.Update()

	// 	return nil
	// }))
}

func (c *AppComponent) runSimpleCppCalculatorWASI() {
	js.Global().Call("openWASIWASMModule", "/web/sparkexamples/cpp/simple_calculator/main.wasm", js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
		log.Println("running Simple C++ Calculator (WASI)")

		c.simpleCppCalculatorWASIOutputSum = module[0].Get("exports").Call("ignite", c.simpleCppCalculatorWASIInputFirstAddend, c.simpleCppCalculatorWASIInputSecondAddend).Int()

		c.Update()

		return nil
	}))
}

func (c *AppComponent) runSimpleJavaCalculatorJWebAssemblyWASM() {
	js.Global().Call(
		"openJavaWASMModule",
		"/web/sparkexamples/java/simple_calculator/simple_calculator.wasm",
		"/web/sparkexamples/java/simple_calculator/simple_calculator.wasm.js",
		js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
			log.Println("running Simple Java Calculator (JWebAssembly wasm)")

			c.simpleJavaCalculatorJWebAssemblyWASMOutputSum = module[0].Get("exports").Call("ignite", c.simpleJavaCalculatorJWebAssemblyWASMInputFirstAddend, c.simpleJavaCalculatorJWebAssemblyWASMInputSecondAddend).Int()

			c.Update()

			return nil
		}))
}
