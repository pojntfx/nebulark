package components

import (
	"encoding/base64"
	"log"
	"strconv"
	"syscall/js"

	"github.com/maxence-charriere/go-app/v7/pkg/app"
)

type AppComponent struct {
	app.Compo

	simpleTinyGoCalculatorInputFirstAddend  int
	simplyTinyGoCalculatorInputSecondAddend int
	simpleTinyGoCalculatorOutputSum         int

	JSONTinyGoCalculatorInput  string
	jsonTinyGoCalculatorOutput string

	simpleGoCalculatorInputFirstAddend  int
	simplyGoCalculatorInputSecondAddend int
	simpleGoCalculatorOutputSum         int

	JSONGoCalculatorInput  string
	jsonGoCalculatorOutput string
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
					"Simple TinyGo Calculator",
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
							firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse first addend: %v\n", err)

								return
							}

							c.simpleTinyGoCalculatorInputFirstAddend = firstAddend
						}),
						app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
							secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse second addend: %v\n", err)

								return
							}

							c.simplyTinyGoCalculatorInputSecondAddend = secondAddend
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runSimpleTinyGoCalculator()
						}),
					app.Div().Text(
						c.simpleTinyGoCalculatorOutputSum,
					),
				),
				c.getExample(
					"JSON TinyGo Calculator",
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("text").Placeholder("JSON Input").Value(c.JSONTinyGoCalculatorInput).OnInput(func(ctx app.Context, e app.Event) {
							c.JSONTinyGoCalculatorInput = e.Get("target").Get("value").String()
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runJSONTinyGoCalculator()
						}),
					app.Div().Text(
						c.jsonTinyGoCalculatorOutput,
					),
				),
				c.getExample(
					"Simple Go Calculator",
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
							firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse first addend: %v\n", err)

								return
							}

							c.simpleGoCalculatorInputFirstAddend = firstAddend
						}),
						app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
							secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse second addend: %v\n", err)

								return
							}

							c.simplyGoCalculatorInputSecondAddend = secondAddend
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runSimpleGoCalculator()
						}),
					app.Div().Text(
						c.simpleGoCalculatorOutputSum,
					),
				),
				c.getExample(
					"JSON Go Calculator",
					app.Div().Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("text").Placeholder("JSON Input").Value(c.JSONGoCalculatorInput).OnInput(func(ctx app.Context, e app.Event) {
							c.JSONGoCalculatorInput = e.Get("target").Get("value").String()
						}),
					),
					app.Button().
						Class("pf-c-button pf-m-control").
						Text("Add").
						OnClick(func(ctx app.Context, e app.Event) {
							c.runJSONGoCalculator()
						}),
					app.Div().Text(
						c.jsonGoCalculatorOutput,
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

func (c *AppComponent) runSimpleTinyGoCalculator() {
	js.Global().Call("import", "/web/glue/tinygo/wasm_exec.js").Call("then", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		js.Global().Call("openTinyGoWASMModule", "/web/sparkexamples/tinygo/simple_calculator/main.wasm", js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
			log.Println("running Simple TinyGo Calculator")

			c.simpleTinyGoCalculatorOutputSum = module[0].Get("exports").Call("ignite", c.simpleTinyGoCalculatorInputFirstAddend, c.simplyTinyGoCalculatorInputSecondAddend).Int()

			c.Update()

			return nil
		}))

		return nil
	}))
}

func (c *AppComponent) runJSONTinyGoCalculator() {
	js.Global().Call("import", "/web/glue/tinygo/wasm_exec.js").Call("then", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		js.Global().Call("openTinyGoWASMModule", "/web/sparkexamples/tinygo/json_calculator/main.wasm", js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
			log.Println("running JSON TinyGo Calculator")

			encodedInput := base64.RawStdEncoding.EncodeToString([]byte(c.JSONTinyGoCalculatorInput))

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

			c.jsonTinyGoCalculatorOutput = string(decodedInput)

			c.Update()

			return nil
		}))

		return nil
	}))
}

func (c *AppComponent) runSimpleGoCalculator() {
	js.Global().Call("import", "/web/glue/go/wasm_exec.js").Call("then", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		js.Global().Call("openGoWASMModule", "/web/sparkexamples/go/simple_calculator/main.wasm", js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
			log.Println("running Simple Go Calculator")

			c.simpleGoCalculatorOutputSum = js.Global().Call("ignite", c.simpleGoCalculatorInputFirstAddend, c.simplyGoCalculatorInputSecondAddend).Int()

			c.Update()

			return nil
		}))

		return nil
	}))
}

func (c *AppComponent) runJSONGoCalculator() {
	js.Global().Call("import", "/web/glue/go/wasm_exec.js").Call("then", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		js.Global().Call("openGoWASMModule", "/web/sparkexamples/go/json_calculator/main.wasm", js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
			log.Println("running JSON Go Calculator")

			encodedOutput := js.Global().Call("ignite", base64.RawStdEncoding.EncodeToString([]byte(c.JSONGoCalculatorInput))).String()

			decodedOutput, err := base64.RawStdEncoding.DecodeString(encodedOutput)
			if err != nil {
				log.Printf("could not decode spark output: %v\n", err)

				return nil
			}

			c.jsonGoCalculatorOutput = string(decodedOutput)

			c.Update()

			return nil
		}))

		return nil
	}))
}
