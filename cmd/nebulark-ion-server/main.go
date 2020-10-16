package main

import (
	"flag"
	"log"
	"net/http"

	"github.com/maxence-charriere/go-app/v7/pkg/app"
)

func main() {
	listenAddress := flag.String("listenAddress", "0.0.0.0:15175", "Listen address")

	flag.Parse()

	h := app.Handler{
		Author:          "Felicitas Pojtinger",
		BackgroundColor: "#151515",
		Description:     "Distribute your workload to the edge.",
		Icon: app.Icon{
			Default: "/web/icon.png",
		},
		Keywords: []string{
			"network",
			"network-scanner",
			"port-scanner",
			"ip-scanner",
			"arp-scanner",
			"arp",
			"iana",
			"ports2packets",
			"nebulark",
			"vendor2mac",
			"wake-on-lan",
			"wol",
			"service-name",
		},
		LoadingLabel: "Distribute your workload to the edge.",
		Name:         "nebulark",
		RawHeaders: []string{
			`<meta property="og:url" content="https://nebulark.space">`,
			`<meta property="og:title" content="nebulark">`,
			`<meta property="og:description" content="Distribute your workload to the edge.">`,
			`<meta property="og:image" content="https://nebulark.space/web/icon.png">`,
		},
		Styles: []string{
			"https://unpkg.com/@patternfly/patternfly@4.42.2/patternfly.css",
			"https://unpkg.com/@patternfly/patternfly@4.42.2/patternfly-addons.css",
			"/web/index.css",
		},
		ThemeColor: "#151515",
		Title:      "nebulark",
	}

	log.Println("Listening on", *listenAddress)

	if err := http.ListenAndServe(*listenAddress, &h); err != nil {
		log.Fatal("could not start server", err)
	}
}
