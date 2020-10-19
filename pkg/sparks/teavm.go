package sparks

import "syscall/js"

type TeaVMSpark struct {
	wasmRuntimeURL string

	*WASISpark
}

func NewTeaVMSpark(wasmBinaryURL string, wasmRuntimeURL string) *TeaVMSpark {
	return &TeaVMSpark{
		wasmRuntimeURL: wasmRuntimeURL,

		WASISpark: NewWASISpark(wasmBinaryURL),
	}
}

func (s *TeaVMSpark) LoadExports() error {
	done := make(chan bool)

	js.Global().Call("openTeaVMWASMModule", s.wasmBinaryURL, s.wasmRuntimeURL, js.FuncOf(func(_ js.Value, module []js.Value) interface{} {
		s.wasmExports = module[0].Get("exports")

		done <- true

		return nil
	}))

	<-done

	return nil
}

func (s *TeaVMSpark) Run(input interface{}, output interface{}) error {
	return s.WASISpark.Run(input, output, s.LoadExports)
}
