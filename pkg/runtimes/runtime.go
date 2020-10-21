package runtimes

import "syscall/js"

type Runtime interface {
	LoadExports() error
	Call(funcName string, args ...interface{}) js.Value
	Construct() error
	InputSetLength(length int) error
	InputSet(index int, input uint8) error
	Open() error
	Ignite() error
	Close() error
	OutputGetLength() int
	OutputGet(index int) uint8
	Deconstruct() error
	Run(input interface{}, output interface{}, exportsLoader ...func() error) error
}
