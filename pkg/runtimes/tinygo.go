package runtimes

import (
	"syscall/js"
)

type TinyGoRuntime struct {
	Runtime
	*WASIRuntime

	wasmRuntimeURL string
}

func NewTinyGoRuntime(wasmBinaryURL string, wasmRuntimeURL string) *TinyGoRuntime {
	return &TinyGoRuntime{
		wasmRuntimeURL: wasmRuntimeURL,

		WASIRuntime: NewWASIRuntime(wasmBinaryURL),
	}
}

func (s *TinyGoRuntime) LoadExports() error {
	done := make(chan bool)

	js.Global().Call("openTinyGoWASMModule", s.wasmBinaryURL, s.wasmRuntimeURL, js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
		s.wasmExports = module[0].Get("exports")

		done <- true

		return nil
	}))

	<-done

	return nil
}

func (s *TinyGoRuntime) Run(input interface{}, output interface{}) error {
	return s.WASIRuntime.Run(input, output, s.LoadExports)
}
