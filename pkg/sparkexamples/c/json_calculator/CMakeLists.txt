cmake_minimum_required(VERSION 3.13.4)

# Toolchain
set(WASI_SDK_PREFIX "/opt/wasi-sdk-11.0")
set(CMAKE_TOOLCHAIN_FILE "wasi-sdk.cmake")

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
  UPDATE_COMMAND touch <SOURCE_DIR>/config.h COMMAND mkdir -p <SOURCE_DIR>/include <SOURCE_DIR>/lib
  CONFIGURE_COMMAND touch <SOURCE_DIR>/ChangeLog COMMAND autoreconf -i <SOURCE_DIR> COMMAND <SOURCE_DIR>/configure --prefix=<INSTALL_DIR>
  BUILD_IN_SOURCE 1
  INSTALL_DIR "${CMAKE_CURRENT_BINARY_DIR}"
  BUILD_COMMAND cd <SOURCE_DIR> COMMAND make
)

ExternalProject_Get_Property(jansson install_dir)
include_directories(${install_dir}/include)

ExternalProject_Get_Property(jansson install_dir)
add_library(jansson_pkg UNKNOWN IMPORTED)
set_target_properties(jansson_pkg PROPERTIES
    IMPORTED_LOCATION ${install_dir}/lib/libjansson.a
)

add_dependencies(jansson_pkg jansson)

# Linking and building
add_executable(calculator.wasm calculator.c)

target_link_libraries(calculator.wasm
    base64
)
target_link_libraries(calculator.wasm jansson_pkg)