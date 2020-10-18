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

func (s *WASISpark) Construct() error {
	if err := s.wasmExports.Call("nebulark_ion_spark_construct").Int(); err != 0 {
		return fmt.Errorf("could not construct spark: %v", err)
	}

	return nil
}
