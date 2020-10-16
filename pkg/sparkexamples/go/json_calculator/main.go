package main

import (
	"encoding/base64"
	"encoding/json"
	"log"
	"syscall/js"
)

func main() {
	keepAlive := make(chan struct{})

	//export ignite
	js.Global().Set("ignite", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return Ignite(args[0].String())
	}))

	<-keepAlive
}

type SparkInput struct {
	FirstAddend  int `json:"firstAddend"`
	SecondAddend int `json:"secondAddend"`
}

type SparkOutput struct {
	Sum int `json:"sum"`
}

func Ignite(encodedInput string) string {
	decodedInput, err := base64.RawStdEncoding.DecodeString(encodedInput)
	if err != nil {
		log.Fatal("could not decode spark input", err)
	}

	sparkInput := &SparkInput{}
	if err := json.Unmarshal(decodedInput, sparkInput); err != nil {
		log.Fatal("could not unmarshal spark input", err)
	}

	sparkOutput := &SparkOutput{
		Sum: sparkInput.FirstAddend + sparkInput.SecondAddend,
	}

	decodedOutput, err := json.Marshal(sparkOutput)
	if err != nil {
		log.Fatal("could not unmarshal spark output", err)
	}

	return base64.RawStdEncoding.EncodeToString(decodedOutput)
}
