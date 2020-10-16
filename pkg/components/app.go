package components

import (
	"log"
	"strconv"
	"syscall/js"

	"github.com/maxence-charriere/go-app/v7/pkg/app"
)

type AppComponent struct {
	app.Compo

	tinyGoCalculatorInputFirstAddend  int
	tinyGoCalculatorInputSecondAddend int
	tinyGoCalculatorOutputValue       int
}

func (c *AppComponent) Render() app.UI {
	return app.Div().Class("pf-c-content").Body(
		app.H1().Class("pf-u-p-lg").Text("nebulark Ion Spark Runner Examples"),
		app.Table().Class("pf-c-table pf-m-grid-md").Body(
			app.THead().Body(
				app.Tr().Body(
					app.Th().Text("Name"),
					app.Th().Text("Input"),
					app.Th().Text("Actions"),
					app.Th().Text("Output"),
				),
			),
			app.TBody().Body(
				app.Tr().Body(
					app.Td().DataSet("label", "Name").Text("TinyGo Calculator"),
					app.Td().DataSet("label", "Input").Body(
						app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
							firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse first addend: %v\n", err)

								return
							}

							c.tinyGoCalculatorInputFirstAddend = firstAddend
						}),
						app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
							secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
							if err != nil {
								log.Printf("could parse second addend: %v\n", err)

								return
							}

							c.tinyGoCalculatorInputSecondAddend = secondAddend
						}),
					),
					app.Td().DataSet("label", "Actions").Body(
						app.Button().
							Class("pf-c-button pf-m-control").
							Text("Add").
							OnClick(func(ctx app.Context, e app.Event) {
								c.runTinyGoCalculator()
							}),
					),
					app.Td().DataSet("label", "Output").Text(c.tinyGoCalculatorOutputValue),
				),
			),
		),
	)
}

func (c *AppComponent) runTinyGoCalculator() {
	js.Global().Call("import", "/web/glue/tinygo/wasm_exec.js").Call("then", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		js.Global().Call("openTinyGoWASMModule", "/web/sparkexamples/tinygo/calculator/main.wasm", js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
			log.Println("running TinyGo Calculator")

			c.tinyGoCalculatorOutputValue = module[0].Get("exports").Call("add", c.tinyGoCalculatorInputFirstAddend, c.tinyGoCalculatorInputSecondAddend).Int()

			c.Update()

			return nil
		}))

		return nil
	}))
}
