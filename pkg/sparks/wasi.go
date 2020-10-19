package sparks

import (
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

// TODO: Add abstract struct pointer version
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

// TODO: Add abstract struct pointer version
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
