# Nebulark

Distribute your workload to the edge.

![make CI](https://github.com/pojntfx/nebulark/workflows/make%20CI/badge.svg)
![Mirror](https://github.com/pojntfx/nebulark/workflows/Mirror/badge.svg)

## Overview

Nebulark is a distributed computing system for the browser built on WebAssembly for compute, WebRTC for networking and IPFS for storage.

### Components

The system is made up of the following components:

- **Nebulark**: The distributed computing system as a whole
- **Ion**: A compute, network and storage node of the network, running in the browser
- **Nebula**: A cluster of ions
- **Spark**: An app running on Nebulark
- **Mission Control**: A cluster and spark scheduling management interface

### Current Status

#### Compute

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

See the [examples](./examples) for more concrete implementations or visit [nebulark.space/examples/compute](https://nebulark.space/examples/compute) to try them out in your browser.

#### Networking

Basic full-duplex peer-to-peer networking support without the need for a signaling server already works, however the latter will be added in the future to ease the initial connection process. Take a look at the [example code](./pages/examples/networking.js) or visit [nebulark.space/examples/networking](https://nebulark.space/examples/networking) to try it out in your browser.

#### Discovery

Nebulark includes a discovery mechanism for nodes in order to simplify the SDP exchange for the networking stack. The implementation is heavily based on [IPFS PubSub](https://blog.ipfs.io/25-pubsub/) and the underlying [libp2p](https://libp2p.io/) stack and can already automatically connect peers in a room and broadcast messages, which can be used to distributed SDP information in the future. Take a look at the [example code](./pages/examples/discovery.js) or visit [nebulark.space/examples/discovery](https://nebulark.space/examples/discovery) to try it out in your browser.

The default [WebRTC star](https://github.com/libp2p/js-libp2p-webrtc-star/) in use by default (`/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star`) is a public testing server, which might be under heavy load and thus take 30+ seconds to broadcast new node information. For much better performance, please consider self-hosting and replacing the multiaddr with `/ip4/127.0.0.1/tcp/13579/wss/p2p-webrtc-star`, where `127.0.0.1` is the host and `13579` is the port of the self-hosted instance.

#### Storage

[IPFS Mutable Filesystem](https://docs.ipfs.io/concepts/file-systems/#mutable-file-system-mfs) is planned to be used in the future, but this is still in the concept phase.

## Installation

Just visit [nebulark.space](https://nebulark.space/); all modern browsers (Chrome, Firefox, Safari) are supported. Currently, there are just some examples, but as we continue development you'll be able to create and join a nebula, upload your sparks etc.

## License

Nebulark (c) 2020 Felicitas Pojtinger

SPDX-License-Identifier: AGPL-3.0
