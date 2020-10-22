cmake_minimum_required(VERSION 3.18)

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
  GIT_REPOSITORY https://github.com/nlohmann/json.git
  GIT_TAG v3.9.1)

FetchContent_GetProperties(json)
if(NOT json_POPULATED)
  FetchContent_Populate(json)
  add_subdirectory(${json_SOURCE_DIR} ${json_BINARY_DIR} EXCLUDE_FROM_ALL)
endif()

add_executable(calculator calculator.cc)

target_link_libraries(calculator PRIVATE nlohmann_json::nlohmann_json)