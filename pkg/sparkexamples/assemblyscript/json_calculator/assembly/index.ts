// The entry file of your WebAssembly module.

import "wasi";
import { decode, encode } from "as-base64";
import { JSON } from "assemblyscript-json";

let inputEncoded: Uint8Array;
let outputEncoded: Uint8Array;

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
  inputEncoded = new Uint8Array(sparkInputArrayLength);
  return 0;
}

export function nebulark_ion_spark_input_set(index: i32, input: i32): i32 {
  inputEncoded[index] = input;
  return 0;
}

export function nebulark_ion_spark_open(): i32 {

  let inputEncodedString = "";
  for (let j = 0; j < inputEncoded.length; j++) {
    inputEncodedString += String.fromCharCode(inputEncoded[j]);
  }

  let inputDecodedArray = decode(inputEncodedString)

  let inputDecodedString = "";
  for (let j = 0; j < inputDecodedArray.length; j++) {
    inputDecodedString += String.fromCharCode(inputDecodedArray[j]);
  }
  
  let jsonObj = JSON.parse(inputDecodedString) as JSON.Obj;
  firstAddend = jsonObj.get("firstAddend") as JSON.Num;
  secondAddend = jsonObj.get("secondAddend") as JSON.Num;

  return 0;
}

export function nebulark_ion_spark_close(): i32 {

  let outputDecodedString = "{\"sum\": " + result.toString() + "}";
  
  var bytes = [];

  for(var i = 0; i < outputDecodedString.length; i++) {
    var char = outputDecodedString.charCodeAt(i);
    bytes.push(char & 0xFF);
  }

  let outputDecodedArray = new Uint8Array(bytes.length);

  for(let i = 0; i < bytes.length; i++) {
    outputDecodedArray[i] = bytes[i] as u32
  }
  
  let outputEncodedString = encode(outputDecodedArray);

  var bytes1 = [];

  for(var j = 0; j < outputEncodedString.length; j++) {
    var char2 = outputEncodedString.charCodeAt(j);
    bytes1.push(char2 & 0xFF);
  }
  
  outputEncoded = new Uint8Array(bytes1.length)
  
  for(let k = 0; k < bytes1.length; k++) {
    outputEncoded[k] = bytes1[k] as u32
  }
  
  return 0;
}

export function nebulark_ion_spark_output_get_length(): i32 {
  return outputEncoded.length;
}

export function nebulark_ion_spark_output_get(index: i32): i32 {
  return outputEncoded[index];
}

export function nebulark_ion_spark_deconstruct(): i32 {
  return 0;
}
