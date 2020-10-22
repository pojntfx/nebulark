cmake_minimum_required(VERSION 3.13.4)

# Toolchain
set(WASI_SDK_PREFIX "/opt/wasi-sdk-11.0")
if (NOT DEFINED CMAKE_TOOLCHAIN_FILE)
    set(CMAKE_TOOLCHAIN_FILE "wasi-sdk.cmake")
endif()

# Project
project(calculator)

add_executable(calculator.wasm calculator.cc)
