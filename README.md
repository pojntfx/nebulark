# Nebulark

Distribute your workload to the edge.

![make CI](https://github.com/pojntfx/nebulark/workflows/make%20CI/badge.svg)
![Mirror](https://github.com/pojntfx/nebulark/workflows/Mirror/badge.svg)

## Overview

Nebulark is a distributed computing system build on WebAssembly, WebRTC and IPFS which runs in the browser.

### Components

The system is made up of the following components:

- **Nebulark**: The distributed computing system as a whole
- **Ion**: A compute, network and storage node of the network, running in the browser
- **Nebula**: A cluster of ions
- **Spark**: An app running on Nebulark
- **Mission Control**: A cluster and spark scheduling management interface

### Current Status

While all WebAssembly binaries are supported in theory, we support the following languages and toolchains using a Tier system:

| Tier Name | Exports Support | WASI           | Mainstream Adoption |
| --------- | --------------- | -------------- | ------------------- |
| 1A        | Yes             | Yes (Vanilla)  | Yes                 |
| 1B        | Yes             | Yes (Vanilla)  | No                  |
| 2A        | Yes             | Yes (Extended) | No                  |
| 2B        | Yes             | No (Custom)    | No                  |

The current implementation status:

| Tier | Language       | Toolchain | Simple Calculator Spark | JSON Calculator Spark |
| ---- | -------------- | --------- | ----------------------- | --------------------- |
| 1A   | C              | clang     | x                       | x                     |
| 1A   | C++            | clang     | x                       | x                     |
| 1A   | Rust           | rustup    | x                       | x                     |
| 1B   | AssemblyScript | asc       | x                       | x                     |
| 1B   | Zig            | Zig       | x                       | x                     |
| 2A   | Go             | TinyGo    | x                       | x                     |
| 2B   | Java           | TeaVM     | x                       | x                     |

See the [examples](./examples) for more concrete implementations.

## Installation

Just visit [nebulark.space](https://nebulark.space/); all modern browsers (Chrome, Firefox, Safari) are supported. Currently, there are just some examples, but as we continue development you'll be able to create and join a nebula, upload your sparks etc.

## License

Nebulark (c) 2020 Felicitas Pojtinger

SPDX-License-Identifier: AGPL-3.0
