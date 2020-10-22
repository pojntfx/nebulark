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

  string inputEncodedString = "";

  for (int i = 0; i < inputEncoded.size(); i++) {
      inputEncodedString += string(1, inputEncoded[i]);
  }

  string inputDecodedString;

  cout << inputEncodedString << endl;
  
  bool decoder = Base64::Decode(inputEncodedString, &inputDecodedString);

  cout << inputDecodedString << endl;

  json j = json::parse(inputDecodedString);
  firstAddend = j.at("firstAddend");
  secondAddend = j.at("secondAddend");
  return 0;
}

__attribute__((export_name("nebulark_ion_spark_ignite"))) int
nebulark_ion_spark_ignite() {
  result = firstAddend + secondAddend;
  cout << result << endl;
  
  return 0;
}

__attribute__((export_name("nebulark_ion_spark_close"))) int
nebulark_ion_spark_close() {
  string outputDecodedString =
      string("{\"sum\":") + std::to_string(result) + string("}");

  cout << outputDecodedString << endl;

  string outputEncodedString;
  bool encoder = Base64::Encode(outputDecodedString, &outputEncodedString);

  cout << outputEncodedString << endl;
  
  cout << outputEncodedString.length() << endl;
  
  for (int k = 0; k < outputEncodedString.length(); k++) {
    // all above here is correct
    char currentChar2 = outputEncodedString.at(k);
    outputEncoded.push_back(currentChar2);
  }

  for (int a = 0; a < outputEncoded.size(); a++) {
    cout << outputEncoded[a] << endl;
  }

  // bis hier sollte alles richtig sein

  return 0;
}

__attribute__((export_name("nebulark_ion_spark_output_get_length"))) int
nebulark_ion_spark_output_get_length() {
  return outputEncoded.size();
}

__attribute__((export_name("nebulark_ion_spark_output_get"))) int
nebulark_ion_spark_output_get(int index) {
  cout << "SUCCESS" << endl;
  return outputEncoded[index];
  
}

__attribute__((export_name("nebulark_ion_spark_deconstruct"))) int
nebulark_ion_spark_deconstruct() {
  return 0;
}

int main() {
  cout << "Hello World" << endl;
  //nebulark_ion_spark_open();
  //nebulark_ion_spark_ignite();
  //nebulark_ion_spark_close();
}
