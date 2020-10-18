#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "_deps/base64/base64.h"
#include "build/jansson-prefix/include/jansson.h"
// #include "jansson.h"

static unsigned char *decode(char *decode, unsigned int decodelen) {
  unsigned char *decode_out;
  unsigned int encodelen;

  decode_out = malloc(BASE64_DECODE_OUT_SIZE(decodelen));

  encodelen = base64_decode(decode, decodelen, decode_out);

  free(decode_out);

  return decode_out;
}

static char *encode(unsigned char *encode, unsigned int encodelen) {
  char *encode_out;
  unsigned char *decode_out;

  encode_out = malloc(BASE64_ENCODE_OUT_SIZE(encodelen));

  base64_encode(encode, encodelen, encode_out);

  free(encode_out);

  return encode_out;
}

typedef struct {
  int first_addend;
  int second_addend;
} spark_input_t;

static int spark_input_umarshal(spark_input_t *spark_input, char *data) {
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

  spark_input->first_addend = first_addend;
  spark_input->second_addend = second_addend;

  return 0;
}

typedef struct {
  int sum;
} spark_output_t;

static int spark_output_marshal(spark_output_t spark_output, char **data) {
  json_t *root = json_pack("{s:i}", "sum", spark_output.sum);

  *data = json_dumps(root, 0);
  if (!data) {
    return 1;
  }

  return 0;
}

int main(void) {
  printf("Decoded: %s\n", decode("Zm9vYmFy", 8));

  // Unmarshal spark input
  char *spark_input_decoded = "{\"firstAddend\": 5, \"secondAddend\": 2}";

  printf("decoded spark input: %s\n", spark_input_decoded);

  spark_input_t spark_input = {1, 1};

  int err = spark_input_umarshal(&spark_input, spark_input_decoded);
  if (err != 0) {
    printf("could not unmarshal spark input\n");

    return 1;
  }

  printf("firstAddend: %d, secondAddend: %d\n", spark_input.first_addend,
         spark_input.second_addend);

  // Marshal spark output
  spark_output_t spark_output = {spark_input.first_addend +
                                 spark_input.second_addend};

  char *spark_output_decoded = "";
  err = spark_output_marshal(spark_output, &spark_output_decoded);
  if (err != 0) {
    printf("could not marshal spark output\n");

    return 1;
  }

  printf("decoded spark output: %s\n", spark_output_decoded);

  // Encode spark output
  char *spark_output_encoded =
      encode((void *)spark_output_decoded, strlen(spark_output_decoded));

  printf("encoded spark output: %s\n", spark_output_encoded);

  return 0;
}
