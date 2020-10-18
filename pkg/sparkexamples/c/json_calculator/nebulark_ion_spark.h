#ifndef NEBULARK_ION_SPARK_H
#define NEBULARK_ION_SPARK_H

// Construct the spark
int nebulark_ion_spark_construct();

// Set the length of the spark's input
int nebulark_ion_spark_input_set_length(int length);

// Set the spark's output at the index
int nebulark_ion_spark_input_set(int index, char input);

// Open the spark
int nebulark_ion_spark_open();

// Ignite the spark
int nebulark_ion_spark_ignite();

// Close the spark
int nebulark_ion_spark_close();

// Get the length of the spark's output
int nebulark_ion_spark_output_get_length();

// Get the spark's output at the index
char nebulark_ion_spark_output_get(int index);

// Deconstruct the spark
int nebulark_ion_spark_deconstruct();

#endif