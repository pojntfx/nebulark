package components

import (
	"log"
	"strconv"

	"github.com/maxence-charriere/go-app/v7/pkg/app"
	"github.com/pojntfx/nebulark/pkg/virtualmachines"
)

type CalculatorExample struct {
	Title          string
	VirtualMachine *virtualmachines.WASMVirtualMachine

	firstAddend  int
	secondAddend int
	sum          int
}

type AppComponent struct {
	app.Compo

	examplesRunning bool

	SimpleExamples []CalculatorExample
	JSONExamples   []CalculatorExample
}

func (c *AppComponent) Render() app.UI {
	return app.Div().Class("pf-c-content").Body(
		app.H1().Class("pf-u-p-lg").Text("nebulark Ion Spark Examples"),
		app.Button().Class("pf-c-button pf-m-primary pf-u-mx-lg").Disabled(c.examplesRunning).Text(func() string {
			if c.examplesRunning {
				return "Running examples ..."
			}

			return "Run All Examples"
		}()).OnClick(func(ctx app.Context, e app.Event) {
			c.examplesRunning = true
			c.Update()

			go func() {
				log.Println("running simple examples")
				for _, example := range c.SimpleExamples {
					c.RunSimpleExample(&example)

					c.Update()
				}

				log.Println("running JSON examples")
				for _, example := range c.JSONExamples {
					c.RunJSONExample(&example)

					c.Update()
				}

				c.examplesRunning = false
				c.Update()
			}()
		}),
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
								c.RunSimpleExample(&c.SimpleExamples[i])

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
								c.RunJSONExample(&c.JSONExamples[i])

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

func (c *AppComponent) RunSimpleExample(example *CalculatorExample) {
	log.Printf("running %v\n", example.Title)

	if err := example.VirtualMachine.LoadExports(); err != nil {
		log.Printf("could not load spark exports: %v\n", err)
	}

	example.sum = example.VirtualMachine.Call("add", example.firstAddend, example.secondAddend).Int()
}

func (c *AppComponent) RunJSONExample(example *CalculatorExample) {
	log.Printf("running %v\n", example.Title)

	input := &struct {
		FirstAddend  int `json:"firstAddend"`
		SecondAddend int `json:"secondAddend"`
	}{
		FirstAddend:  example.firstAddend,
		SecondAddend: example.secondAddend,
	}

	output := &struct {
		Sum int `json:"sum"`
	}{}

	if err := example.VirtualMachine.Run(input, output); err != nil {
		log.Printf("could not run spark: %v\n", err)
	}

	example.sum = output.Sum
}
