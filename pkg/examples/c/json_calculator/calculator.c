#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "_deps/base64/base64.h"
// #include "build/jansson-prefix/include/jansson.h"
#include "calculator.h"
#include "jansson.h"
#include "nebulark_ion_spark.h"

// base64 utils
unsigned char *calculator_base64_decode(char *decode, unsigned int decodelen) {
  unsigned char *decode_out;
  unsigned int encodelen;

  decode_out = calloc(1, BASE64_DECODE_OUT_SIZE(decodelen));

  encodelen = base64_decode(decode, decodelen, decode_out);

  return decode_out;
}

char *calculator_base64_encode(unsigned char *encode, unsigned int encodelen) {
  char *encode_out;
  unsigned char *decode_out;

  encode_out = calloc(1, BASE64_ENCODE_OUT_SIZE(encodelen));

  base64_encode(encode, encodelen, encode_out);

  return encode_out;
}

// IO utils
int calculator_input_unmarshal(calculator_input_t *calculator_input,
                               char *data) {
  json_t *root;
  json_error_t json_error;

  root = json_loads(data, 0, &json_error);

  int first_addend;
  int second_addend;

  json_unpack(root, "{s:i, s:i}", "firstAddend", &first_addend, "secondAddend",
              &second_addend);
  if (!root) {
    return 1;
  }

  calculator_input->first_addend = first_addend;
  calculator_input->second_addend = second_addend;

  return 0;
}

int calculator_output_marshal(calculator_output_t calculator_output,
                              char **data) {
  json_t *root = json_pack("{s:i}", "sum", calculator_output.sum);

  *data = json_dumps(root, 0);
  if (!data) {
    return 1;
  }

  return 0;
}

// Nebulark Ion Spark Implementation

// Memory
char *calculator_input_encoded;
char *calculator_output_encoded;

// Functions
__attribute__((export_name("nebulark_ion_spark_construct"))) int
nebulark_ion_spark_construct() {
  return 0;
}

__attribute__((export_name("nebulark_ion_spark_input_set_length"))) int
nebulark_ion_spark_input_set_length(int length) {
  calculator_input_encoded = calloc(length, sizeof(char));

  return 0;
}

__attribute__((export_name("nebulark_ion_spark_input_set"))) int
nebulark_ion_spark_input_set(int index, char input) {
  calculator_input_encoded[index] = input;

  return 0;
}

__attribute__((export_name("nebulark_ion_spark_open"))) int
nebulark_ion_spark_open() {
  return 0;
}

__attribute__((export_name("nebulark_ion_spark_ignite"))) int
nebulark_ion_spark_ignite() {
  // Decode spark input
  char *calculator_input_decoded = (char *)calculator_base64_decode(
      calculator_input_encoded, strlen(calculator_input_encoded));

  // Unmarshal spark input
  calculator_input_t calculator_input = {1, 1};

  int err =
      calculator_input_unmarshal(&calculator_input, calculator_input_decoded);
  if (err != 0) {
    return 1;
  }

  // Process spark input
  int sum = calculator_input.first_addend + calculator_input.second_addend;

  // Marshal spark output
  calculator_output_t calculator_output = {sum};

  char *calculator_output_decoded = "";
  err =
      calculator_output_marshal(calculator_output, &calculator_output_decoded);
  if (err != 0) {
    return 1;
  }

  calculator_output_encoded = calculator_base64_encode(
      (void *)calculator_output_decoded, strlen(calculator_output_decoded));

  return 0;
}

__attribute__((export_name("nebulark_ion_spark_close"))) int
nebulark_ion_spark_close() {
  return 0;
}

__attribute__((export_name("nebulark_ion_spark_output_get_length"))) int
nebulark_ion_spark_output_get_length() {
  return strlen(calculator_output_encoded);
};

__attribute__((export_name("nebulark_ion_spark_output_get"))) char
nebulark_ion_spark_output_get(int index) {
  return calculator_output_encoded[index];
}

__attribute__((export_name("nebulark_ion_spark_deconstruct"))) int
nebulark_ion_spark_deconstruct() {
  return 0;
}

// Testing
int main(void) {
  //   if (nebulark_ion_spark_construct() != 0) {
  //     return 1;
  //   }

  //   // Raw spark input
  //   char *raw_calculator_input = "{\"firstAddend\": 5, \"secondAddend\": 2}";
  //   printf("raw spark input: %s\n", raw_calculator_input);

  //   // Encode spark input
  //   char *calculator_input_encoded_internal = calculator_base64_encode(
  //       (void *)raw_calculator_input, strlen(raw_calculator_input));

  //   printf("encoded spark input: %s\n", calculator_input_encoded_internal);

  //   // Write encoded spark input into memory
  //   if (nebulark_ion_spark_input_set_length(
  //           strlen(calculator_input_encoded_internal)) != 0) {
  //     return 1;
  //   }
  //   for (int i = 0; i < strlen(calculator_input_encoded_internal); i++) {
  //     if (nebulark_ion_spark_input_set(i,
  //     calculator_input_encoded_internal[i]) !=
  //         0) {
  //       return 1;
  //     };
  //   }

  //   if (nebulark_ion_spark_open() != 0) {
  //     return 1;
  //   };

  //   // Ignite
  //   if (nebulark_ion_spark_ignite() != 0) {
  //     return 1;
  //   }

  //   if (nebulark_ion_spark_close() != 0) {
  //     return 1;
  //   };

  //   // Read encoded spark input from memory
  //   int calculator_output_length = nebulark_ion_spark_output_get_length();
  //   char *name = NULL;
  //   char *calculator_output_encoded_internal =
  //       calloc(calculator_output_length, sizeof(name));
  //   for (int i = 0; i < calculator_output_length; i++) {
  //     calculator_output_encoded_internal[i] =
  //     nebulark_ion_spark_output_get(i);
  //   }

  //   printf("encoded spark output: %s\n", calculator_output_encoded_internal);

  //   if (nebulark_ion_spark_deconstruct() != 0) {
  //     return 1;
  //   };

  return 0;
}
