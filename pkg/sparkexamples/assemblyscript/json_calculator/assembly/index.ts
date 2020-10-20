// The entry file of your WebAssembly module.

import "wasi";
import { decode, encode } from "as-base64";
import { JSON } from "assemblyscript-json";
import { environ_get } from "wasi";
import { Console } from "as-wasi";

let spark_input_encoded: Uint8Array;
let spark_output_encoded: Uint8Array;

let num1: JSON.Num;
let num2: JSON.Num;
let result: i64;

export function nebulark_ion_spark_ignite(): i32 {
  
  result = num1._num + num2._num;

  return 0;
}

export function nebulark_ion_spark_construct(): i32 {
  return 0;
}

export function nebulark_ion_spark_input_set_length(sparkInputArrayLength: i32): i32 {
  spark_input_encoded = new Uint8Array(sparkInputArrayLength);
  return 0;
}

export function nebulark_ion_spark_input_set(index: i32, input: i32): i32 {
  spark_input_encoded[index] = input;
  return 0;
}

export function nebulark_ion_spark_open(): i32 {

  let spark_decoded_input = "";
  for (let j = 0; j < spark_input_encoded.length; j++) {
    spark_decoded_input += String.fromCharCode(spark_input_encoded[j]);
  }

  Console.log(spark_decoded_input)
  let jsonObj = JSON.parse(spark_decoded_input) as JSON.Obj;
  num1 = jsonObj.get("firstAddend") as JSON.Num;
  num2 = jsonObj.get("secondAddend") as JSON.Num;

  return 0;
}

export function nebulark_ion_spark_close(): i32 {

  let decodedOutput = "{\"sum\": " + result.toString() + "}";

  spark_output_encoded = decode(decodedOutput);

  return 0;
}

export function nebulark_ion_spark_output_get_length(): i32 {
  return spark_output_encoded.length;
}

export function nebulark_ion_spark_output_get(index: i32): i32 {
  return spark_output_encoded[index];
}

export function nebulark_ion_spark_deconstruct(): i32 {
  return 0;
}
