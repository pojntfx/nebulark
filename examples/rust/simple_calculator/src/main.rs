fn main() {}

#[no_mangle]
pub extern "C" fn add(first_addend: i32, second_addend: i32) -> i32 {
    return first_addend + second_addend;
}
