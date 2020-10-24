#include "_deps/base64/base64.h"
#include <iostream>

#define JSON_TRY_USER if (true)
#define JSON_CATCH_USER(exception) if (false)
#define JSON_THROW_USER(exception)                                             \
  {                                                                            \
    std::clog << "Error in " << __FILE__ << ":" << __LINE__ << " (function "   \
              << __FUNCTION__ << ") - " << (exception).what() << std::endl;    \
    std::abort();                                                              \
  }

#include "build/_deps/json-src/include/nlohmann/json.hpp"
#include <vector>

using namespace std;
using json = nlohmann::json;

int status = 0;

vector<char> inputEncoded;
vector<char> outputEncoded;

int firstAddend;
int secondAddend;
int result;

__attribute__((export_name("nebulark_ion_spark_construct"))) int
nebularkIonSparkConstruct() {
  return 0;
}

__attribute__((export_name("nebulark_ion_spark_input_set_length"))) int
nebularkIonSparkInputSetLength(int length) {
  return 0;
}

__attribute__((export_name("nebulark_ion_spark_input_set"))) int
nebularkIonSparkInputSet(int index, char input) {
  inputEncoded.push_back(input);
  return 0;
}

__attribute__((export_name("nebulark_ion_spark_open"))) int
nebularkIonSparkOpen() {

  string inputEncodedString = "";

  for (int i = 0; i < inputEncoded.size(); i++) {
    inputEncodedString += string(1, inputEncoded[i]);
  }

  string inputDecodedString;

  bool decoder = Base64::Decode(inputEncodedString, &inputDecodedString);

  json j = json::parse(inputDecodedString);
  firstAddend = j.at("firstAddend");
  secondAddend = j.at("secondAddend");
  return 0;
}

__attribute__((export_name("nebulark_ion_spark_ignite"))) int
nebularkIonSparkIgnite() {
  result = firstAddend + secondAddend;
  return 0;
}

__attribute__((export_name("nebulark_ion_spark_close"))) int
nebularkIonSparkClose() {
  string outputDecodedString =
      string("{\"sum\":") + std::to_string(result) + string("}");

  string outputEncodedString;
  bool encoder = Base64::Encode(outputDecodedString, &outputEncodedString);

  for (int k = 0; k < outputEncodedString.length(); k++) {
    char currentChar2 = outputEncodedString.at(k);
    outputEncoded.push_back(currentChar2);
  }

  return 0;
}

__attribute__((export_name("nebulark_ion_spark_output_get_length"))) int
nebularkIonSparkOutputGetLength() {
  return outputEncoded.size();
}

__attribute__((export_name("nebulark_ion_spark_output_get"))) int
nebularkIonSparkOutputGet(int index) {
  return outputEncoded[index];
}

__attribute__((export_name("nebulark_ion_spark_deconstruct"))) int
nebularkIonSparkDeconstruct() {
  return 0;
}

int main() { cout << "" << endl; }
