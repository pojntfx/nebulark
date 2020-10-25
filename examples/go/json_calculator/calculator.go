package main

import (
	"encoding/base64"

	"github.com/valyala/fastjson"
)

func main() {}

var (
	InputEncoded  []uint8
	OutputEncoded []uint8

	JSONParser fastjson.Parser
	JSONArena  fastjson.Arena

	FirstAddend  int
	SecondAddend int

	Sum int
)

//export nebulark_ion_spark_construct
func Construct() int {
	return 0
}

//export nebulark_ion_spark_input_set_length
func InputSetLength(length int) int {
	InputEncoded = make([]uint8, length)

	return 0
}

//export nebulark_ion_spark_input_set
func InputSet(index int, input uint8) int {
	InputEncoded[index] = input

	return 0
}

//export nebulark_ion_spark_open
func Open() int {
	inputDecoded, err := base64.StdEncoding.DecodeString(string(InputEncoded))
	if err != nil {
		return 1
	}

	input, err := JSONParser.Parse(string(inputDecoded))
	if err != nil {
		return 1
	}

	FirstAddend = input.GetInt("firstAddend")
	SecondAddend = input.GetInt("secondAddend")

	return 0
}

//export nebulark_ion_spark_ignite
func Ignite() int {
	Sum = FirstAddend + SecondAddend

	return 0
}

//export nebulark_ion_spark_close
func Close() int {
	output := JSONArena.NewObject()

	sum := JSONArena.NewNumberInt(Sum)

	output.Set("sum", sum)

	outputDecoded := output.MarshalTo([]byte{})

	OutputEncoded = []uint8(base64.StdEncoding.EncodeToString(outputDecoded))

	return 0
}

//export nebulark_ion_spark_output_get_length
func OutputGetLength() int {
	return len(OutputEncoded)
}

//export nebulark_ion_spark_output_get
func OutputGet(index int) uint8 {
	return OutputEncoded[index]
}

//export nebulark_ion_spark_deconstruct
func Deconstruct() int {
	return 0
}
