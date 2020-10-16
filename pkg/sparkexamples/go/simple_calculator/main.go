package main

import "syscall/js"

func main() {
	keepAlive := make(chan struct{})

	//export ignite
	js.Global().Set("ignite", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return Ignite(args[0].Int(), args[1].Int())
	}))

	<-keepAlive
}

func Ignite(firstAddend, secondAddend int) int {
	return firstAddend + secondAddend
}
