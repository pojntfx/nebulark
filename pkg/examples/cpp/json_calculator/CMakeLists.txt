cmake_minimum_required(VERSION 3.18)

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