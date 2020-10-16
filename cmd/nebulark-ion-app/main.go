package main

import (
	"github.com/maxence-charriere/go-app/v7/pkg/app"
)

func main() {
	app.Route("/",
		app.Div().Body(
			app.H1().Text("nebulark"),
		),
	)

	app.Run()
}
