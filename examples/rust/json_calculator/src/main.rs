use base64;
use serde;
use serde_json;

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

static mut INPUT_ENCODED: Vec<u8> = vec![];
static mut OUTPUT_ENCODED: Vec<u8> = vec![];

static mut FIRST_ADDEND: i32 = 0;
static mut SECOND_ADDEND: i32 = 0;

static mut SUM: i32 = 0;

#[export_name = "nebulark_ion_spark_construct"]
pub extern "C" fn construct() -> i32 {
    return 0;
}

#[export_name = "nebulark_ion_spark_input_set_length"]
pub extern "C" fn input_set_length(length: i32) -> i32 {
    unsafe {
        INPUT_ENCODED = vec![0; length as usize];
    }

    return 0;
}

#[export_name = "nebulark_ion_spark_input_set"]
pub extern "C" fn input_set(index: i32, input: u8) -> i32 {
    unsafe {
        INPUT_ENCODED[index as usize] = input;
    }

    return 0;
}

#[export_name = "nebulark_ion_spark_open"]
pub extern "C" fn open() -> i32 {
    let input_encoded;
    unsafe {
        input_encoded = &INPUT_ENCODED;
    }

    let input_decoded = match base64::decode(input_encoded) {
        Ok(i) => i,
        Err(_) => return 1,
    };

    let input = match serde_json::from_slice::<Input>(&input_decoded) {
        Ok(i) => i,
        Err(_) => return 1,
    };

    unsafe {
        FIRST_ADDEND = input.first_addend;
        SECOND_ADDEND = input.second_addend;
    }

    return 0;
}

#[export_name = "nebulark_ion_spark_ignite"]
pub extern "C" fn ignite() -> i32 {
    unsafe {
        SUM = FIRST_ADDEND + SECOND_ADDEND;
    }

    return 0;
}

#[export_name = "nebulark_ion_spark_close"]
pub extern "C" fn close() -> i32 {
    let output;
    unsafe {
        output = Output { sum: SUM };
    }

    let output_decoded = match serde_json::to_vec::<Output>(&output) {
        Ok(o) => o,
        Err(_) => return 1,
    };

    let output_encoded = base64::encode(output_decoded).into_bytes();

    unsafe {
        OUTPUT_ENCODED = output_encoded;
    }

    return 0;
}

#[export_name = "nebulark_ion_spark_output_get_length"]
pub extern "C" fn output_get_length() -> i32 {
    let output_encoded;
    unsafe { output_encoded = &OUTPUT_ENCODED }

    return output_encoded.len() as i32;
}

#[export_name = "nebulark_ion_spark_output_get"]
pub extern "C" fn output_get(index: i32) -> u8 {
    let output_encoded;
    unsafe {
        output_encoded = &OUTPUT_ENCODED;
    }

    return output_encoded[index as usize];
}

#[export_name = "nebulark_ion_spark_deconstruct"]
pub extern "C" fn deconstruct() -> i32 {
    return 0;
}
