package sparks

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"syscall/js"
)

type WASISpark struct {
	wasmBinaryURL string
	wasmExports   js.Value
}

func NewWASISpark(wasmBinaryURL string) *WASISpark {
	return &WASISpark{
		wasmBinaryURL: wasmBinaryURL,
	}
}

func (s *WASISpark) LoadExports() error {
	done := make(chan bool)

	js.Global().Call("openWASIWASMModule", s.wasmBinaryURL, js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
		s.wasmExports = module[0].Get("exports")

		done <- true

		return nil
	}))

	<-done

	return nil
}

func (s *WASISpark) Call(funcName string, args ...interface{}) js.Value {
	return s.wasmExports.Call(funcName, args...)
}

func (s *WASISpark) Construct() error {
	if err := s.wasmExports.Call("nebulark_ion_spark_construct").Int(); err != 0 {
		return fmt.Errorf("could not construct spark: %v", err)
	}

	return nil
}

func (s *WASISpark) InputSetLength(length int) error {
	if err := s.wasmExports.Call("nebulark_ion_spark_input_set_length", length).Int(); err != 0 {
		return fmt.Errorf("could not set spark input length: %v", err)
	}

	return nil
}

func (s *WASISpark) InputSet(index int, input uint8) error {
	if err := s.wasmExports.Call("nebulark_ion_spark_input_set", index, input).Int(); err != 0 {
		return fmt.Errorf("could not set spark input: %v", err)
	}

	return nil
}

func (s *WASISpark) Open() error {
	if err := s.wasmExports.Call("nebulark_ion_spark_open").Int(); err != 0 {
		return fmt.Errorf("could not open spark: %v", err)
	}

	return nil
}

func (s *WASISpark) Ignite() error {
	if err := s.wasmExports.Call("nebulark_ion_spark_ignite").Int(); err != 0 {
		return fmt.Errorf("could not ignite spark: %v", err)
	}

	return nil
}

func (s *WASISpark) Close() error {
	if err := s.wasmExports.Call("nebulark_ion_spark_close").Int(); err != 0 {
		return fmt.Errorf("could not close spark: %v", err)
	}

	return nil
}

func (s *WASISpark) OutputGetLength() int {
	return s.wasmExports.Call("nebulark_ion_spark_output_get_length").Int()
}

func (s *WASISpark) OutputGet(index int) uint8 {
	return uint8(s.wasmExports.Call("nebulark_ion_spark_output_get", index).Int())
}

func (s *WASISpark) Deconstruct() error {
	if err := s.wasmExports.Call("nebulark_ion_spark_deconstruct").Int(); err != 0 {
		return fmt.Errorf("could not deconstruct spark: %v", err)
	}

	return nil
}

func (s *WASISpark) Run(input interface{}, output interface{}) error {
	if err := s.LoadExports(); err != nil {
		return fmt.Errorf("could not load spark exports: %v", err)
	}

	if err := s.Construct(); err != nil {
		return fmt.Errorf("could not construct spark: %v", err)
	}

	marshalledInput, err := json.Marshal(input)
	if err != nil {
		return fmt.Errorf("could not marshal spark input: %v", err)
	}

	encodedInput := base64.StdEncoding.EncodeToString(marshalledInput)
	if err := s.InputSetLength(len(encodedInput)); err != nil {
		return fmt.Errorf("could not set spark input length: %v", err)
	}
	for i, character := range []uint8(encodedInput) {
		if err := s.InputSet(i, uint8(character)); err != nil {
			return fmt.Errorf("could not set spark input: %v", err)
		}
	}

	if err := s.Open(); err != nil {
		return fmt.Errorf("could not open spark: %v", err)
	}

	if err := s.Ignite(); err != nil {
		return fmt.Errorf("could not ignite spark: %v", err)
	}

	if err := s.Close(); err != nil {
		return fmt.Errorf("could not close spark: %v", err)
	}

	encodedOutputLength := s.OutputGetLength()
	encodedOutput := []uint8{}
	for i := 0; i < encodedOutputLength; i++ {
		encodedOutput = append(encodedOutput, s.OutputGet(i))
	}

	decodedOutput, err := base64.StdEncoding.DecodeString(string(encodedOutput))
	if err != nil {
		return fmt.Errorf("could not decode spark output: %v", err)
	}

	if err := json.Unmarshal(decodedOutput, output); err != nil {
		return fmt.Errorf("could not unmarshal spark output: %v", err)
	}

	return nil
}
