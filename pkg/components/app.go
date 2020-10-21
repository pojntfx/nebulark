package components

import (
	"log"
	"strconv"

	"github.com/maxence-charriere/go-app/v7/pkg/app"
	"github.com/pojntfx/nebulark/pkg/runtimes"
)

type CalculatorExample struct {
	Title string

	WASIRuntime   *runtimes.WASIRuntime
	TeaVMRuntime  *runtimes.TeaVMRuntime
	TinyGoRuntime *runtimes.TinyGoRuntime

	firstAddend  int
	secondAddend int
	sum          int
}

type AppComponent struct {
	app.Compo

	SimpleExamples []CalculatorExample
	JSONExamples   []CalculatorExample
}

func (c *AppComponent) Render() app.UI {
	return app.Div().Class("pf-c-content").Body(
		app.H1().Class("pf-u-p-lg").Text("nebulark Ion Spark Examples"),
		app.H2().Class("pf-u-p-lg").Text("Calculators (Simple)"),
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
				app.Range(c.SimpleExamples).Slice(func(i int) app.UI {
					return app.Tr().Body(
						app.Td().DataSet("label", "Name").Text(c.SimpleExamples[i].Title),
						app.Td().DataSet("label", "Input").Body(app.Div().Body(
							app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
								firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
								if err != nil {
									log.Printf("could parse first addend: %v\n", err)

									return
								}

								c.SimpleExamples[i].firstAddend = firstAddend
							}),
							app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
								secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
								if err != nil {
									log.Printf("could parse second addend: %v\n", err)

									return
								}

								c.SimpleExamples[i].secondAddend = secondAddend
							}),
						)),
						app.Td().DataSet("label", "Actions").Body(app.Button().
							Class("pf-c-button pf-m-control").
							Text("Add").
							OnClick(func(ctx app.Context, e app.Event) {
								log.Printf("running %v\n", c.SimpleExamples[i].Title)

								if c.SimpleExamples[i].WASIRuntime != nil {
									if err := c.SimpleExamples[i].WASIRuntime.LoadExports(); err != nil {
										log.Printf("could not load spark exports: %v\n", err)
									}

									c.SimpleExamples[i].sum = c.SimpleExamples[i].WASIRuntime.Call("add", c.SimpleExamples[i].firstAddend, c.SimpleExamples[i].secondAddend).Int()
								} else if c.SimpleExamples[i].TinyGoRuntime != nil {
									if err := c.SimpleExamples[i].TinyGoRuntime.LoadExports(); err != nil {
										log.Printf("could not load spark exports: %v\n", err)
									}

									c.SimpleExamples[i].sum = c.SimpleExamples[i].TinyGoRuntime.WASIRuntime.Call("add", c.SimpleExamples[i].firstAddend, c.SimpleExamples[i].secondAddend).Int()
								} else if c.SimpleExamples[i].TeaVMRuntime != nil {
									if err := c.SimpleExamples[i].TeaVMRuntime.LoadExports(); err != nil {
										log.Printf("could not load spark exports: %v\n", err)
									}

									c.SimpleExamples[i].sum = c.SimpleExamples[i].TeaVMRuntime.WASIRuntime.Call("add", c.SimpleExamples[i].firstAddend, c.SimpleExamples[i].secondAddend).Int()
								}

								c.Update()
							})),
						app.Td().DataSet("label", "Output").Body(app.Div().Text(
							c.SimpleExamples[i].sum,
						)),
					)
				}),
			),
		),
		app.H2().Class("pf-u-p-lg").Text("Calculators (JSON)"),
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
				app.Range(c.JSONExamples).Slice(func(i int) app.UI {
					return app.Tr().Body(
						app.Td().DataSet("label", "Name").Text(c.JSONExamples[i].Title),
						app.Td().DataSet("label", "Input").Body(app.Div().Body(
							app.Input().Class("pf-c-form-control pf-u-mb-sm").Type("number").Pattern(`\d`).Placeholder("First Addend").OnInput(func(ctx app.Context, e app.Event) {
								firstAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
								if err != nil {
									log.Printf("could parse first addend: %v\n", err)

									return
								}

								c.JSONExamples[i].firstAddend = firstAddend
							}),
							app.Input().Class("pf-c-form-control").Type("number").Pattern(`\d`).Placeholder("Second Addend").OnInput(func(ctx app.Context, e app.Event) {
								secondAddend, err := strconv.Atoi(e.Get("target").Get("value").String())
								if err != nil {
									log.Printf("could parse second addend: %v\n", err)

									return
								}

								c.JSONExamples[i].secondAddend = secondAddend
							}),
						)),
						app.Td().DataSet("label", "Actions").Body(app.Button().
							Class("pf-c-button pf-m-control").
							Text("Add").
							OnClick(func(ctx app.Context, e app.Event) {
								log.Printf("running %v\n", c.JSONExamples[i].Title)

								input := &struct {
									FirstAddend  int `json:"firstAddend"`
									SecondAddend int `json:"secondAddend"`
								}{
									FirstAddend:  c.JSONExamples[i].firstAddend,
									SecondAddend: c.JSONExamples[i].secondAddend,
								}

								output := &struct {
									Sum int `json:"sum"`
								}{}

								if c.JSONExamples[i].WASIRuntime != nil {
									if err := c.JSONExamples[i].WASIRuntime.Run(input, output); err != nil {
										log.Printf("could not run spark: %v\n", err)
									}
								} else if c.JSONExamples[i].TinyGoRuntime != nil {
									if err := c.JSONExamples[i].TinyGoRuntime.Run(input, output); err != nil {
										log.Printf("could not run spark: %v\n", err)
									}
								} else if c.JSONExamples[i].TeaVMRuntime != nil {
									if err := c.JSONExamples[i].TeaVMRuntime.Run(input, output); err != nil {
										log.Printf("could not run spark: %v\n", err)
									}
								}

								c.JSONExamples[i].sum = output.Sum

								c.Update()
							})),
						app.Td().DataSet("label", "Output").Body(app.Div().Text(
							c.JSONExamples[i].sum,
						)),
					)
				}),
			),
		),
	)
}
