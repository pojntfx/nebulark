# All
all: build

# Build
build: \
	build-container-zig \
	build-container-wasi-sdk \
	build-example-c-simple-calculator \
	build-example-c-json-calculator \
	build-example-zig-simple-calculator \
	build-example-zig-json-calculator \
	build-example-tinygo-simple-calculator \
	build-example-tinygo-json-calculator \
	build-example-teavm-simple-calculator \
	build-example-teavm-json-calculator \
	build-ion

build-container-wasi-sdk:
	@docker build -t pojntfx/wasi-sdk examples/c

build-container-zig:
	@docker build -t pojntfx/zig examples/zig

build-example-c-simple-calculator: build-container-wasi-sdk
	@docker run -v ${PWD}/examples/c/simple_calculator:/src:Z pojntfx/wasi-sdk sh -c 'cd /src && mkdir -p /src/build && cd /src/build && cmake .. && make'
	@cp examples/c/simple_calculator/build/calculator.wasm public/c-simple-calculator.wasm

build-example-c-json-calculator: build-container-wasi-sdk
	@docker run -v ${PWD}/examples/c/json_calculator:/src:Z pojntfx/wasi-sdk sh -c 'cd /src && mkdir -p _deps && if [ ! -d "_deps/base64" ]; then git clone https://github.com/zhicheng/base64.git _deps/base64; fi && mkdir -p /src/build && cd /src/build && cmake .. && make'
	@cp examples/c/json_calculator/build/calculator.wasm public/c-json-calculator.wasm

build-example-zig-simple-calculator: build-container-zig
	@docker run -v ${PWD}/examples/zig/simple_calculator:/src:Z pojntfx/zig sh -c 'cd /src && zig build-lib -target wasm32-wasi calculator.zig'
	@cp examples/zig/simple_calculator/calculator.wasm public/zig-simple-calculator.wasm

build-example-zig-json-calculator: build-container-zig
	@docker run -v ${PWD}/examples/zig/json_calculator:/src:Z pojntfx/zig sh -c 'cd /src && zig build-lib -target wasm32-wasi calculator.zig'
	@cp examples/zig/json_calculator/calculator.wasm public/zig-json-calculator.wasm

build-example-tinygo-simple-calculator:
	@docker run -v ${PWD}/examples/tinygo/simple_calculator:/src:Z -v ${PWD}/examples/tinygo/simple_calculator/go:/root/go:Z tinygo/tinygo sh -c 'cd /src && tinygo build -o /src/calculator.wasm -target=wasm calculator.go'
	@cp examples/tinygo/simple_calculator/calculator.wasm public/tinygo-simple-calculator.wasm

build-example-tinygo-json-calculator:
	@docker run -v ${PWD}/examples/tinygo/json_calculator:/src:Z -v ${PWD}/examples/tinygo/json_calculator/go:/root/go:Z tinygo/tinygo sh -c 'cd /src && tinygo build -o /src/calculator.wasm -target=wasm calculator.go'
	@cp examples/tinygo/json_calculator/calculator.wasm public/tinygo-json-calculator.wasm

build-example-teavm-simple-calculator:
	@docker run -v ${PWD}/examples/teavm/simple_calculator:/src:Z -v ${PWD}/examples/teavm/simple_calculator/.m2:/root/.m2:Z maven sh -c 'cd /src && mvn clean install'
	@cp examples/teavm/simple_calculator/target/javascript/classes.wasm public/teavm-simple-calculator.wasm

build-example-teavm-json-calculator:
	@docker run -v ${PWD}/examples/teavm/json_calculator:/src:Z -v ${PWD}/examples/teavm/json_calculator/.m2:/root/.m2:Z maven sh -c 'cd /src && mvn clean install'
	@cp examples/teavm/json_calculator/target/javascript/classes.wasm public/teavm-json-calculator.wasm

build-ion:
	@yarn
	@yarn build

# Clean
clean: \
	clean-example-c-simple-calculator \
	clean-example-c-json-calculator \
	clean-example-zig-simple-calculator \
	clean-example-zig-json-calculator \
	clean-example-tinygo-simple-calculator \
	clean-example-tinygo-json-calculator \
	clean-example-teavm-simple-calculator \
	clean-example-teavm-json-calculator \
	clean-public \
	clean-ion

clean-example-c-simple-calculator:
	@rm -rf examples/c/simple_calculator/build

clean-example-c-json-calculator:
	@rm -rf examples/c/json_calculator/{build,_deps}

clean-example-zig-simple-calculator:
	@rm -f examples/zig/simple_calculator/{*.o,*.wasm}

clean-example-zig-json-calculator:
	@rm -f examples/zig/json_calculator/{*.o,*.wasm}

clean-example-tinygo-simple-calculator:
	@rm -f examples/tinygo/simple_calculator/{*.o,*.wasm,go}

clean-example-tinygo-json-calculator:
	@rm -f examples/tinygo/json_calculator/{*.o,*.wasm,go}

clean-example-teavm-simple-calculator:
	@rm -rf examples/teavm/simple_calculator/{target,.m2}}

clean-example-teavm-json-calculator:
	@rm -rf examples/teavm/json_calculator/{target,.m2}

clean-public:
	@rm public/*.wasm

clean-ion:
	@rm -rf .next node_modules

# Run
run: \
	run-examples \
	run-ion

run-examples: \
	run-example-c-simple-calculator \
	run-example-zig-simple-calculator

run-example-c-simple-calculator:
	@wasmtime run --invoke add public/c-simple-calculator.wasm 1 2

run-example-zig-simple-calculator:
	@wasmtime run --invoke add public/zig-simple-calculator.wasm 1 2

run-ion:
	@yarn start

# Dev
dev: \
	dev-ion

dev-ion:
	@yarn dev