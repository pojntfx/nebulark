#include "_deps/base64/base64.h"
#include "build/_deps/json-src/single_include/nlohmann/json.hpp"
#include <iostream>
#include <vector>

using namespace std;
using json = nlohmann::json;

int status = 0;

vector<uint8_t> inputEncoded;
vector<uint8_t> outputEncoded;

int firstAddend;
int secondAddend;
int result;

__attribute__((export_name("nebulark_ion_spark_construct"))) int
nebulark_ion_spark_construct() {
  return 0;
}

__attribute__((export_name("nebulark_ion_spark_input_set_length"))) int
nebulark_ion_spark_input_set_length(int length) {
  return 0;
}

__attribute__((export_name("nebulark_ion_spark_input_set"))) int
nebulark_ion_spark_input_set(int index, char input) {
  inputEncoded.push_back(input);
  return 0;
}

__attribute__((export_name("nebulark_ion_spark_open"))) int
nebulark_ion_spark_open() {
  // untoggle comment again
  // string inputEncodedString = "";
  // for (int i = 0; i < sizeof(inputEncoded)/sizeof(inputEncoded[0]); i++) {
  //     inputEncodedString += string(1, inputEncoded[i]);
  // }
  // REMOVE LATER
  string inputEncodedString =
      "eyJmaXJzdEFkZGVuZCI6IDMsICJzZWNvbmRBZGRlbmQiOiAyfQ==";
  string inputDecodedString;
  // std::vector<uint8_t> inputDecodedArray =
  // base64::decode(inputEncodedString);
  bool decoder = Base64::Decode(inputEncodedString, &inputDecodedString);

  // string inputDecodedString = "";
  // for (int h = 0; h < sizeof(inputDecodedArray)/sizeof(inputDecodedArray[0]);
  // h++) {
  //   inputDecodedString += string(1, inputDecodedArray[h]);
  // }

  json j = json::parse(inputDecodedString);
  firstAddend = j.at("firstAddend");
  secondAddend = j.at("secondAddend");
  return 0;
}

__attribute__((export_name("nebulark_ion_spark_ignite"))) int
nebulark_ion_spark_ignite() {
  result = firstAddend + secondAddend;
  cout << result << endl;
  // std::string s = j.dump();

  return 0;
}

__attribute__((export_name("nebulark_ion_spark_close"))) int
nebulark_ion_spark_close() {
  string outputDecodedString =
      string("{\"sum\": ") + std::to_string(result) + "}";

  // std::vector<uint8_t> outputDecodedArray;

  // for (int i = 0; i < outputDecodedString.length(); i++) {
  //     char currentChar = outputDecodedString.at(i);
  //     outputDecodedArray.push_back(currentChar);
  // }

  string outputEncodedString;
  bool encoder = Base64::Encode(outputDecodedString, &outputEncodedString);

  std::vector<uint8_t> outputEncoded;

  for (int k = 0; k < outputEncodedString.length(); k++) {
    char currentChar2 = outputEncodedString.at(k);
    outputEncoded.push_back(currentChar2);
  }
  return 0;
}

__attribute__((export_name("nebulark_ion_spark_output_get_length"))) int
nebulark_ion_spark_output_get_length() {
  return sizeof(outputEncoded) / sizeof(outputEncoded[0]);
};

__attribute__((export_name("nebulark_ion_spark_output_get"))) char
nebulark_ion_spark_output_get(int index) {
  return outputEncoded[index];
}

__attribute__((export_name("nebulark_ion_spark_deconstruct"))) int
nebulark_ion_spark_deconstruct() {
  return 0;
}

int main() {
  cout << "Hello World" << endl;
  nebulark_ion_spark_open();
  nebulark_ion_spark_ignite();
  nebulark_ion_spark_close();
}
