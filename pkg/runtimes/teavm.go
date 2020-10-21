package runtimes

import "syscall/js"

type TeaVMRuntime struct {
	Runtime
	*WASIRuntime

	wasmRuntimeURL string
}

func NewTeaVMRuntime(wasmBinaryURL string, wasmRuntimeURL string) *TeaVMRuntime {
	return &TeaVMRuntime{
		wasmRuntimeURL: wasmRuntimeURL,

		WASIRuntime: NewWASIRuntime(wasmBinaryURL),
	}
}

func (s *TeaVMRuntime) LoadExports() error {
	done := make(chan bool)

	js.Global().Call("openTeaVMWASMModule", s.wasmBinaryURL, s.wasmRuntimeURL, js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
		s.wasmExports = module[0].Get("exports")

		done <- true

		return nil
	}))

	<-done

	return nil
}

func (s *TeaVMRuntime) Run(input interface{}, output interface{}) error {
	return s.WASIRuntime.Run(input, output, s.LoadExports)
}
