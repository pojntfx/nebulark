#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "_deps/base64/base64.h"
#include "jansson.h"

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
} addends_t;

static int unmarshal_addends(addends_t *addends, char *data) {
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

  addends->first_addend = first_addend;
  addends->second_addend = second_addend;

  return 0;
}

int main(void) {
  printf("Decoded: %s\n", decode("Zm9vYmFy", 8));

  printf("Encoded: %s\n", encode((void *)"foobar", 6));

  addends_t addends = {1, 1};

  int err =
      unmarshal_addends(&addends, "{\"firstAddend\": 5, \"secondAddend\": 2}");
  if (err != 0) {
    return 1;
  }

  printf("firstAddend: %d, secondAddend: %d\n", addends.first_addend,
         addends.second_addend);

  return 0;
}
