use base64;
use once_cell::sync::Lazy;
use serde;
use serde_json;
use std::sync::Mutex;

fn main() {}

#[derive(serde::Deserialize)]
#[serde(rename_all = "camelCase")]
struct Input {
    first_addend: i32,
    second_addend: i32,
}

#[derive(serde::Serialize)]
struct Output {
    sum: i32,
}

struct GlobalState {
    input_encoded: Vec<u8>,
    output_encoded: Vec<u8>,

    first_addend: i32,
    second_addend: i32,

    sum: i32,
}

static GLOBAL_STATE: Lazy<Mutex<GlobalState>> = Lazy::new(|| {
    Mutex::new(GlobalState {
        input_encoded: vec![],
        output_encoded: vec![],

        first_addend: 0,
        second_addend: 0,

        sum: 0,
    })
});

#[export_name = "nebulark_ion_spark_construct"]
pub extern "C" fn construct() -> i32 {
    return 0;
}

#[export_name = "nebulark_ion_spark_input_set_length"]
pub extern "C" fn input_set_length(length: i32) -> i32 {
    let mut global_state = match GLOBAL_STATE.lock() {
        Ok(s) => s,
        Err(_) => return 1,
    };

    global_state.input_encoded = vec![0; length as usize];

    return 0;
}

#[export_name = "nebulark_ion_spark_input_set"]
pub extern "C" fn input_set(index: i32, input: u8) -> i32 {
    let mut global_state = match GLOBAL_STATE.lock() {
        Ok(s) => s,
        Err(_) => return 1,
    };

    global_state.input_encoded[index as usize] = input;

    return 0;
}

#[export_name = "nebulark_ion_spark_open"]
pub extern "C" fn open() -> i32 {
    let mut global_state = match GLOBAL_STATE.lock() {
        Ok(s) => s,
        Err(_) => return 1,
    };

    let input_decoded = match base64::decode(&global_state.input_encoded) {
        Ok(i) => i,
        Err(_) => return 1,
    };

    let input = match serde_json::from_slice::<Input>(&input_decoded) {
        Ok(i) => i,
        Err(_) => return 1,
    };

    global_state.first_addend = input.first_addend;
    global_state.second_addend = input.second_addend;

    return 0;
}

#[export_name = "nebulark_ion_spark_ignite"]
pub extern "C" fn ignite() -> i32 {
    let mut global_state = match GLOBAL_STATE.lock() {
        Ok(s) => s,
        Err(_) => return 1,
    };

    global_state.sum = global_state.first_addend + global_state.second_addend;

    return 0;
}

#[export_name = "nebulark_ion_spark_close"]
pub extern "C" fn close() -> i32 {
    let mut global_state = match GLOBAL_STATE.lock() {
        Ok(s) => s,
        Err(_) => return 1,
    };

    let output = Output {
        sum: global_state.sum,
    };

    let output_decoded = match serde_json::to_vec::<Output>(&output) {
        Ok(o) => o,
        Err(_) => return 1,
    };

    let output_encoded = base64::encode(output_decoded).into_bytes();

    global_state.output_encoded = output_encoded;

    return 0;
}

#[export_name = "nebulark_ion_spark_output_get_length"]
pub extern "C" fn output_get_length() -> i32 {
    let global_state = match GLOBAL_STATE.lock() {
        Ok(s) => s,
        Err(_) => return 1,
    };

    return global_state.output_encoded.len() as i32;
}

#[export_name = "nebulark_ion_spark_output_get"]
pub extern "C" fn output_get(index: i32) -> u8 {
    let global_state = match GLOBAL_STATE.lock() {
        Ok(s) => s,
        Err(_) => return 1,
    };

    return global_state.output_encoded[index as usize];
}

#[export_name = "nebulark_ion_spark_deconstruct"]
pub extern "C" fn deconstruct() -> i32 {
    return 0;
}
