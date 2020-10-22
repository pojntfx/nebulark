cmake_minimum_required(VERSION 3.13.4)

# Toolchain
set(WASI_SDK_PREFIX "/opt/wasi-sdk-11.0")
if (NOT DEFINED CMAKE_TOOLCHAIN_FILE)
    set(CMAKE_TOOLCHAIN_FILE "wasi-sdk.cmake")
endif()

# Project
project("calculator")

# Libraries
include_directories(base64)

include(FetchContent)

FetchContent_Declare(json
  GIT_REPOSITORY https://github.com/ArthurSonzogni/nlohmann_json_cmake_fetchcontent
  GIT_TAG v3.7.3)

FetchContent_GetProperties(json)
if(NOT json_POPULATED)
  FetchContent_Populate(json)
  add_subdirectory(${json_SOURCE_DIR} ${json_BINARY_DIR} EXCLUDE_FROM_ALL)
endif()

set(JSON_BuildTests OFF CACHE INTERNAL "")

add_executable(calculator.wasm calculator.cc)

target_link_libraries(calculator.wasm PRIVATE nlohmann_json::nlohmann_json)
target_compile_definitions(calculator.wasm PRIVATE JSON_NOEXCEPTION)
target_compile_options(calculator.wasm PRIVATE -fno-exceptions)
