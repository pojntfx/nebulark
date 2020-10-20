// The entry file of your WebAssembly module.

import "wasi";
import { decode, encode } from "as-base64";
import { JSON } from "assemblyscript-json";

let sparkInputEncoded: Uint8Array;
let sparkOutputEncoded: Uint8Array;

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
  sparkInputEncoded = new Uint8Array(sparkInputArrayLength);
  return 0;
}

export function nebulark_ion_spark_input_set(index: i32, input: i32): i32 {
  sparkInputEncoded[index] = input;
  return 0;
}

export function nebulark_ion_spark_open(): i32 {

  let sparkInputEncodedString = "";
  for (let j = 0; j < sparkInputEncoded.length; j++) {
    sparkInputEncodedString += String.fromCharCode(sparkInputEncoded[j]);
  }

  let sparkInputDecodedArray = decode(sparkInputEncodedString)

  let sparkInputDecodedString = "";
  for (let j = 0; j < sparkInputDecodedArray.length; j++) {
    sparkInputDecodedString += String.fromCharCode(sparkInputDecodedArray[j]);
  }
  
  let jsonObj = JSON.parse(sparkInputDecodedString) as JSON.Obj;
  firstAddend = jsonObj.get("firstAddend") as JSON.Num;
  secondAddend = jsonObj.get("secondAddend") as JSON.Num;

  return 0;
}

export function nebulark_ion_spark_close(): i32 {

  let sparkOutputDecodedString = "{\"sum\": " + result.toString() + "}";
  
  var bytes = [];

  for(var i = 0; i < sparkOutputDecodedString.length; i++) {
    var char = sparkOutputDecodedString.charCodeAt(i);
    bytes.push(char & 0xFF);
  }

  let sparkOutputDecodedArray = new Uint8Array(bytes.length);

  for(let i = 0; i < bytes.length; i++) {
    sparkOutputDecodedArray[i] = bytes[i] as u32
  }
  
  let sparkOutputEncodedString = encode(sparkOutputDecodedArray);

  var bytes1 = [];

  for(var j = 0; j < sparkOutputEncodedString.length; j++) {
    var char2 = sparkOutputEncodedString.charCodeAt(j);
    bytes1.push(char2 & 0xFF);
  }
  
  sparkOutputEncoded = new Uint8Array(bytes1.length)
  
  for(let k = 0; k < bytes1.length; k++) {
    sparkOutputEncoded[k] = bytes1[k] as u32
  }
  
  return 0;
}

export function nebulark_ion_spark_output_get_length(): i32 {
  return sparkOutputEncoded.length;
}

export function nebulark_ion_spark_output_get(index: i32): i32 {
  return sparkOutputEncoded[index];
}

export function nebulark_ion_spark_deconstruct(): i32 {
  return 0;
}
