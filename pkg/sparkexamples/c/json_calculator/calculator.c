#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "_deps/base64/base64.h"
// #include "build/jansson-prefix/include/jansson.h"
#include "calculator.h"
#include "jansson.h"
#include "nebulark_ion_spark.h"

// base64 utils
static unsigned char *calculator_base64_decode(char *decode,
                                               unsigned int decodelen) {
  unsigned char *decode_out;
  unsigned int encodelen;

  decode_out = malloc(BASE64_DECODE_OUT_SIZE(decodelen));

  encodelen = base64_decode(decode, decodelen, decode_out);

  return decode_out;
}

static char *calculator_base64_encode(unsigned char *encode,
                                      unsigned int encodelen) {
  char *encode_out;
  unsigned char *decode_out;

  encode_out = malloc(BASE64_ENCODE_OUT_SIZE(encodelen));

  base64_encode(encode, encodelen, encode_out);

  return encode_out;
}

// IO utils
static int calculator_input_unmarshal(calculator_input_t *calculator_input,
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

static int calculator_output_marshal(calculator_output_t calculator_output,
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
static int nebulark_ion_spark_construct() { return 0; }

static int nebulark_ion_spark_input_set_length(int length) {
  calculator_input_encoded = malloc(length * sizeof(char));

  return 0;
}

static int nebulark_ion_spark_input_set(int index, char input) {
  calculator_input_encoded[index] = input;

  return 0;
}

static int nebulark_ion_spark_open() { return 0; }

static int nebulark_ion_spark_ignite() {
  // Decode spark input
  char *calculator_input_decoded = (char *)calculator_base64_decode(
      calculator_input_encoded, strlen(calculator_input_encoded));

  printf("decoded spark input: %s\n", calculator_input_decoded);

  // Unmarshal spark input
  calculator_input_t calculator_input = {1, 1};

  int err =
      calculator_input_unmarshal(&calculator_input, calculator_input_decoded);
  if (err != 0) {
    printf("could not unmarshal spark input\n");

    return 1;
  }

  // Process spark input
  int sum = calculator_input.first_addend + calculator_input.second_addend;

  printf("sum: %d\n", sum);

  // Marshal spark output
  calculator_output_t calculator_output = {sum};

  char *calculator_output_decoded = "";
  err =
      calculator_output_marshal(calculator_output, &calculator_output_decoded);
  if (err != 0) {
    printf("could not marshal spark output\n");

    return 1;
  }

  printf("decoded spark output: %s\n", calculator_output_decoded);

  // Encode spark output
  calculator_output_encoded = calculator_base64_encode(
      (void *)calculator_output_decoded, strlen(calculator_output_decoded));

  printf("encoded spark output in memory: %s\n", calculator_output_encoded);

  return 0;
}

static int nebulark_ion_spark_close() { return 0; }

static int nebulark_ion_spark_output_get_length() {
  return strlen(calculator_output_encoded);
};

static char nebulark_ion_spark_output_get(int index) {
  return calculator_output_encoded[index];
}

static int nebulark_ion_spark_deconstruct() { return 0; }

// Testing
int main(void) {
  // Raw spark input
  char *raw_calculator_input = "{\"firstAddend\": 5, \"secondAddend\": 2}";

  printf("raw spark input: %s\n", raw_calculator_input);

  // Encode spark input
  char *calculator_input_encoded_internal = calculator_base64_encode(
      (void *)raw_calculator_input, strlen(raw_calculator_input));

  printf("encoded spark input: %s\n", calculator_input_encoded_internal);

  // Write encoded spark input into memory
  nebulark_ion_spark_input_set_length(
      strlen(calculator_input_encoded_internal));
  for (int i = 0; i < strlen(calculator_input_encoded_internal); i++) {
    nebulark_ion_spark_input_set(i, calculator_input_encoded_internal[i]);
  }

  // Ignite
  int err = nebulark_ion_spark_ignite();
  if (err != 0) {
    printf("spark ignition returned error code: %d\n", err);
  }

  // Read encoded spark input from memory
  int calculator_output_length = nebulark_ion_spark_output_get_length();
  char *name = NULL;
  char *calculator_output_encoded_internal =
      calloc(calculator_output_length, sizeof(name));
  for (int i = 0; i < calculator_output_length; i++) {
    calculator_output_encoded_internal[i] = nebulark_ion_spark_output_get(i);
  }

  printf("encoded spark output: %s\n", calculator_output_encoded_internal);

  return 0;
}
