use std::convert::TryInto;

fn main() {}

static mut INPUT_ENCODED: Vec<u8> = vec![];

#[no_mangle]
pub extern "C" fn nebulark_ion_spark_construct() -> i32 {
    return 0;
}

#[no_mangle]
pub unsafe extern "C" fn nebulark_ion_spark_input_set_length(length: i32) -> i32 {
    INPUT_ENCODED = vec![0; length.try_into().unwrap()];

    return 0;
}

#[no_mangle]
pub unsafe extern "C" fn nebulark_ion_spark_input_set(index: i32, input: u8) -> i32 {
    INPUT_ENCODED[index as usize] = input;

    return 0;
}

#[no_mangle]
pub extern "C" fn nebulark_ion_spark_open() -> i32 {
    return 0;
}

#[no_mangle]
pub extern "C" fn nebulark_ion_spark_ignite() -> i32 {
    return 0;
}

#[no_mangle]
pub extern "C" fn nebulark_ion_spark_close() -> i32 {
    return 0;
}

#[no_mangle]
pub extern "C" fn nebulark_ion_spark_output_get_length() -> i32 {
    return 0;
}

#[no_mangle]
pub extern "C" fn nebulark_ion_spark_output_get(index: i32) -> u8 {
    return 0;
}

#[no_mangle]
pub extern "C" fn nebulark_ion_spark_deconstruct() -> i32 {
    return 0;
}
