cmake_minimum_required(VERSION 3.13.4)

# Toolchain
set(WASI_SDK_PREFIX "/opt/wasi-sdk-11.0")
set(CMAKE_TOOLCHAIN_FILE "wasi-sdk.cmake")

# Project

project(calculator)

add_library(base64 STATIC
    deps/base64/base64.c
)

target_include_directories(base64 
    PUBLIC
        deps/base64
)

add_executable(calculator.wasm calculator.c)

target_link_libraries(calculator.wasm base64)
