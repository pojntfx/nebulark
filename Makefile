# All
all: build

# Build
build: \
	build-container-zig \
	build-example-zig-simple-calculator \
	build-example-zig-json-calculator \
	build-example-tinygo-simple-calculator \
	build-example-tinygo-json-calculator \
	build-example-teavm-simple-calculator \
	build-example-teavm-json-calculator \
	build-ion

build-container-zig:
	@docker build -t pojntfx/zig examples/zig

build-example-zig-simple-calculator: build-container-zig
	@docker run -v ${PWD}/examples/zig/simple_calculator:/opt:Z pojntfx/zig zig build-lib -target wasm32-wasi calculator.zig
	@cp examples/zig/simple_calculator/calculator.wasm public/zig-simple-calculator.wasm

build-example-zig-json-calculator: build-container-zig
	@docker run -v ${PWD}/examples/zig/json_calculator:/opt:Z pojntfx/zig zig build-lib -target wasm32-wasi calculator.zig
	@cp examples/zig/json_calculator/calculator.wasm public/zig-json-calculator.wasm

build-example-tinygo-simple-calculator:
	@docker run -v ${PWD}/examples/tinygo/simple_calculator:/opt:Z tinygo/tinygo sh -c 'cd /opt && tinygo build -o /opt/calculator.wasm -target=wasm calculator.go'
	@cp examples/tinygo/simple_calculator/calculator.wasm public/tinygo-simple-calculator.wasm

build-example-tinygo-json-calculator:
	@docker run -v ${PWD}/examples/tinygo/json_calculator:/opt:Z tinygo/tinygo sh -c 'cd /opt && tinygo build -o /opt/calculator.wasm -target=wasm calculator.go'
	@cp examples/tinygo/json_calculator/calculator.wasm public/tinygo-json-calculator.wasm

build-example-teavm-simple-calculator:
	@docker run -v ${PWD}/examples/teavm/simple_calculator:/opt:Z maven sh -c 'cd /opt && mvn clean install'
	@cp examples/teavm/simple_calculator/target/javascript/classes.wasm public/teavm-simple-calculator.wasm

build-example-teavm-json-calculator:
	@docker run -v ${PWD}/examples/teavm/json_calculator:/opt:Z maven sh -c 'cd /opt && mvn clean install'
	@cp examples/teavm/json_calculator/target/javascript/classes.wasm public/teavm-json-calculator.wasm

build-ion:
	@yarn
	@yarn build

# Clean
clean: \
	clean-example-zig-simple-calculator \
	clean-example-zig-json-calculator \
	clean-example-tinygo-simple-calculator \
	clean-example-tinygo-json-calculator \
	clean-example-teavm-simple-calculator \
	clean-example-teavm-json-calculator \
	clean-public \
	clean-ion

clean-example-zig-simple-calculator:
	@rm -f examples/zig/simple_calculator/{*.o,*.wasm}

clean-example-zig-json-calculator:
	@rm -f examples/zig/json_calculator/{*.o,*.wasm}

clean-example-tinygo-simple-calculator:
	@rm -f examples/tinygo/simple_calculator/{*.o,*.wasm}

clean-example-tinygo-json-calculator:
	@rm -f examples/tinygo/json_calculator/{*.o,*.wasm}

clean-example-teavm-simple-calculator:
	@rm -rf examples/teavm/simple_calculator/target

clean-example-teavm-json-calculator:
	@rm -rf examples/teavm/json_calculator/target

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