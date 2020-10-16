package main

import (
	"encoding/base64"
	"fmt"
	"syscall/js"
)

func main() {
	keepAlive := make(chan struct{})

	<-keepAlive
}

var (
	encodedInput  []uint8
	encodedOutput []uint8
)

//export ignite
func Ignite() int {
	decodedInput, err := base64.RawStdEncoding.DecodeString(string(encodedInput))
	if err != nil {
		fmt.Printf("could not decode input: %v\n", decodedInput)
	}

	sparkInput := js.Global().Get("JSON").Call("parse", string(decodedInput))

	decodedOutput := fmt.Sprintf(`{"sum": %v}`, sparkInput.Get("firstAddend").Int()+sparkInput.Get("secondAddend").Int())

	for _, character := range []byte(base64.RawStdEncoding.EncodeToString([]byte(decodedOutput))) {
		encodedOutput = append(encodedOutput, character)
	}

	return len(encodedOutput)
}

//export append_to_encoded_input
func AppendToEncodedInput(character uint8) {
	encodedInput = append(encodedInput, character)
}

//export get_from_encoded_input
func GetFromEncodedInput(index int) uint8 {
	return encodedOutput[index]
}
