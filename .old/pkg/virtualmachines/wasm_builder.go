package virtualmachines

type WASMRVirtualMachineBuilder struct {
	wasmRuntime *WASMVirtualMachine
}

func NewWASMVirtualMachineBuilder() *WASMRVirtualMachineBuilder {
	return &WASMRVirtualMachineBuilder{
		wasmRuntime: &WASMVirtualMachine{},
	}
}

func (b *WASMRVirtualMachineBuilder) SetBinary(binaryURL string) *WASMRVirtualMachineBuilder {
	b.wasmRuntime.wasmBinaryURL = binaryURL

	return b
}

func (b *WASMRVirtualMachineBuilder) EnableWASIRuntime() *WASMRVirtualMachineBuilder {
	b.wasmRuntime.wasi = true

	return b
}

func (b *WASMRVirtualMachineBuilder) EnableTinyGoRuntime(runtimeURL string) *WASMRVirtualMachineBuilder {
	b.wasmRuntime.tinygo = true
	b.wasmRuntime.tinygoRuntimeURL = runtimeURL

	return b
}

func (b *WASMRVirtualMachineBuilder) EnableTeaVMRuntime(runtimeURL string) *WASMRVirtualMachineBuilder {
	b.wasmRuntime.teavm = true
	b.wasmRuntime.teavmRuntimeURL = runtimeURL

	return b
}

func (b *WASMRVirtualMachineBuilder) Build() *WASMVirtualMachine {
	return b.wasmRuntime
}
