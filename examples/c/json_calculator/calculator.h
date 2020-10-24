#ifndef CALCULATOR_H
#define CALCULATOR_H

// Structs
typedef struct {
  int first_addend;
  int second_addend;
} calculator_input_t;

typedef struct {
  int sum;
} calculator_output_t;

// Base64 utils
unsigned char *calculator_base64_decode(char *decode, unsigned int decodelen);

char *calculator_base64_encode(unsigned char *encode, unsigned int encodelen);

// IO utils
int calculator_input_unmarshal(calculator_input_t *calculator_input,
                               char *data);

int calculator_output_marshal(calculator_output_t calculator_output,
                              char **data);

#endif