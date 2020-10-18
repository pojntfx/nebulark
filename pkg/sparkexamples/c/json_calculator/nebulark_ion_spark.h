#ifndef NEBULARK_ION_SPARK_H
#define NEBULARK_ION_SPARK_H

// Construct the spark
static int nebulark_ion_spark_construct();

// Set the length of the spark's input
static int nebulark_ion_spark_input_set_length(int length);

// Set the spark's output at the index
static int nebulark_ion_spark_input_set(int index, char input);

// Open the spark
static int nebulark_ion_spark_open();

// Ignite the spark
static int nebulark_ion_spark_ignite();

// Close the spark
static int nebulark_ion_spark_close();

// Get the length of the spark's output
static int nebulark_ion_spark_output_get_length();

// Get the spark's output at the index
static char nebulark_ion_spark_output_get(int index);

// Deconstruct the spark
static int nebulark_ion_spark_deconstruct();

#endif