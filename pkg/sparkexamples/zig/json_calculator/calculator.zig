const std = @import("std");

const Input = struct {
    firstAddend: i64,
    secondAddend: i64
};

const Output = struct {
    sum: i64
};

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
    const right_bound = std.base64.standard_decoder.calcSize(input_encoded.items) catch |err| {
        return 1;
    };
    var inputBuffer: [0x100]u8 = undefined;
    var decoded_input = inputBuffer[0..right_bound];

    std.base64.standard_decoder.decode(decoded_input, input_encoded.items) catch |err| {
        return 1;
    };

    const input = std.json.parse(
        Input, 
        &std.json.TokenStream.init(decoded_input),
        std.json.ParseOptions{
            .allocator = std.heap.page_allocator
        }
    ) catch |err| {
        return 1;
    };

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