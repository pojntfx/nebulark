# All
all: build

# Build
build: \
	build-zig-container \
	build-example-zig-simple-calculator \
	build-example-zig-json-calculator \
	build-ion

build-zig-container:
	@docker build -t pojntfx/zig examples/zig

build-example-zig-simple-calculator: build-zig-container
	@docker run -v ${PWD}/examples/zig/simple_calculator:/opt:Z pojntfx/zig zig build-lib -target wasm32-wasi calculator.zig
	@cp examples/zig/simple_calculator/calculator.wasm public/zig-simple-calculator.wasm

build-example-zig-json-calculator: build-zig-container
	@docker run -v ${PWD}/examples/zig/json_calculator:/opt:Z pojntfx/zig zig build-lib -target wasm32-wasi calculator.zig
	@cp examples/zig/json_calculator/calculator.wasm public/zig-json-calculator.wasm

build-ion:
	@yarn
	@yarn build

# Clean
clean: \
	clean-example-zig-simple-calculator \
	clean-example-zig-json-calculator \
	clean-public \
	clean-ion

clean-example-zig-simple-calculator:
	@rm -f examples/zig/simple_calculator/{*.o,*.wasm}

clean-example-zig-json-calculator:
	@rm -f examples/zig/json_calculator/{*.o,*.wasm}

clean-public:
	@rm public/*.wasm

clean-ion:
	@rm -rf .next node_modules

# Run
run: \
	run-example-zig-simple-calculator \
	run-ion

run-example-zig-simple-calculator:
	@wasmtime run --invoke add public/zig-simple-calculator.wasm 1 2

run-ion:
	@yarn start

# Dev
dev: \
	dev-ion

dev-ion:
	@yarn dev