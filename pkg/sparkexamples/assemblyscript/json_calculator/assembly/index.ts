// The entry file of your WebAssembly module.

import "wasi";
import { decode, encode } from "as-base64";
import { JSON } from "assemblyscript-json";

let spark_input_encoded: Uint8Array;
let spark_output_encoded: Uint8Array;

let firstAddend: JSON.Num;
let secondAddend: JSON.Num;
let result: i64;

export function nebulark_ion_spark_ignite(): i32 {
  
  result = firstAddend._num + secondAddend._num

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

  let decoded_array = decode(spark_decoded_input)

  let decoded_string = "";
  for (let j = 0; j < decoded_array.length; j++) {
    decoded_string += String.fromCharCode(decoded_array[j]);
  }
  
  let jsonObj = JSON.parse(decoded_string) as JSON.Obj;
  firstAddend = jsonObj.get("firstAddend") as JSON.Num;
  secondAddend = jsonObj.get("secondAddend") as JSON.Num;

  return 0;
}

export function nebulark_ion_spark_close(): i32 {

  let decodedOutput = "{\"sum\": " + result.toString() + "}";
  
  var bytes = [];

  for(var i = 0; i < decodedOutput.length; i++) {
    var char = decodedOutput.charCodeAt(i);
    bytes.push(char & 0xFF);
  }

  let decoded_array = new Uint8Array(bytes.length);

  for(let i = 0; i < bytes.length; i++) {
    decoded_array[i] = bytes[i] as u32
  }
  
  let encoded_string = encode(decoded_array);

  var bytes1 = [];

  for(var j = 0; j < encoded_string.length; j++) {
    var char2 = encoded_string.charCodeAt(j);
    bytes1.push(char2 & 0xFF);
  }
  
  spark_output_encoded = new Uint8Array(bytes1.length)
  
  for(let k = 0; k < bytes1.length; k++) {
    spark_output_encoded[k] = bytes1[k] as u32
  }
  
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
