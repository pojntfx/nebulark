package sparks

import (
	"syscall/js"
)

type TinyGoSpark struct {
	wasmRuntimeURL string

	*WASISpark
}

func NewTinyGoSpark(wasmBinaryURL string, wasmRuntimeURL string) *TinyGoSpark {
	return &TinyGoSpark{
		wasmRuntimeURL: wasmRuntimeURL,

		WASISpark: NewWASISpark(wasmBinaryURL),
	}
}

func (s *TinyGoSpark) LoadExports() error {
	done := make(chan bool)

	js.Global().Call("openTinyGoWASMModule", s.wasmBinaryURL, s.wasmRuntimeURL, js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
		s.wasmExports = module[0].Get("exports")

		done <- true

		return nil
	}))

	<-done

	return nil
}

func (s *TinyGoSpark) Run(input interface{}, output interface{}) error {
	return s.WASISpark.Run(input, output, s.LoadExports)
}
