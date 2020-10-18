#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "_deps/base64/base64.h"
#include "build/include/jansson.h"

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

int main(void) {
  printf("Decoded: %s\n", decode("Zm9vYmFy", 8));

  printf("Encoded: %s\n", encode((void *)"foobar", 6));

  return 0;
}
