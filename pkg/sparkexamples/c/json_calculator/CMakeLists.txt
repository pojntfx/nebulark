cmake_minimum_required(VERSION 3.13.4)

# Toolchain
set(WASI_SDK_PREFIX "/opt/wasi-sdk-11.0")
if (NOT DEFINED CMAKE_TOOLCHAIN_FILE)
    set(CMAKE_TOOLCHAIN_FILE "wasi-sdk.cmake")
endif()

# Project
project(calculator)

# base64
add_library(base64 STATIC
    _deps/base64/base64.c
)
target_include_directories(base64 
    PUBLIC
        _deps/base64
)

# jansson
include(ExternalProject)
ExternalProject_Add(jansson
  GIT_REPOSITORY https://github.com/akheron/jansson.git
  CMAKE_ARGS
    "-DCMAKE_INSTALL_PREFIX:PATH=<INSTALL_DIR>"
    "-DCMAKE_TOOLCHAIN_FILE=${CMAKE_TOOLCHAIN_FILE}"
    "-DWASI_SDK_PREFIX=${WASI_SDK_PREFIX}"
    "-DJANSSON_WITHOUT_TESTS=ON"
)

ExternalProject_Get_Property(jansson install_dir)
include_directories(${install_dir}/include)

ExternalProject_Get_Property(jansson install_dir)
add_library(jansson_pkg UNKNOWN IMPORTED)
set_target_properties(jansson_pkg PROPERTIES
    IMPORTED_LOCATION "${install_dir}/src/jansson-build/lib/libjansson.a"
)

add_dependencies(jansson_pkg jansson)

# Linking and building
add_executable(calculator.wasm calculator.c)

target_link_libraries(calculator.wasm
    base64
)
target_link_libraries(calculator.wasm jansson_pkg)
