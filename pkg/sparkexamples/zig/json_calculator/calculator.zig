const std = @import("std");

var input_encoded = std.ArrayList(u8).init(std.heap.page_allocator);

export fn nebulark_ion_spark_construct() i32 {
    return 0;
}

export fn nebulark_ion_spark_input_set_length(length: i32) i32 {
    input_encoded = std.ArrayList(u8).init(std.heap.page_allocator);

    input_encoded.appendNTimes(0, @intCast(usize, length)) catch |err| {
        return 1;
    };

    return 0;
}

export fn nebulark_ion_spark_input_set(index: i32 , input: u8 ) i32 {
    input_encoded.items[@intCast(usize, index)] = input;

    return 0;
}

export fn nebulark_ion_spark_open() i32 {
    return 0;
}

export fn nebulark_ion_spark_ignite() i32 {
    return 0;
}

export fn nebulark_ion_spark_close() i32 {
    return 0;
}

export fn nebulark_ion_spark_output_get_length() i32 {
    return 0;
}

export fn nebulark_ion_spark_output_get(index: i32) u8 {
    return 0;
}

export fn nebulark_ion_spark_deconstruct() i32 {
    return 0;
}