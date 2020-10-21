comptime {
    @export(construct, .{ .name = "nebulark_ion_spark_construct", .linkage = .Strong });
    @export(inputSetLength, .{ .name = "nebulark_ion_spark_input_set_length", .linkage = .Strong });
    @export(inputSet, .{ .name = "nebulark_ion_spark_input_set", .linkage = .Strong });
    @export(open, .{ .name = "nebulark_ion_spark_open", .linkage = .Strong });
    @export(ignite, .{ .name = "nebulark_ion_spark_ignite", .linkage = .Strong });
    @export(close, .{ .name = "nebulark_ion_spark_close", .linkage = .Strong });
    @export(outputGetLength, .{ .name = "nebulark_ion_spark_output_get_length", .linkage = .Strong });
    @export(outputGet, .{ .name = "nebulark_ion_spark_output_get", .linkage = .Strong });
    @export(deconstruct, .{ .name = "nebulark_ion_spark_deconstruct", .linkage = .Strong });
}

const std = @import("std");

const Input = struct {
    firstAddend: i64,
    secondAddend: i64
};

const Output = struct {
    sum: i64
};

var input_encoded = std.ArrayList(u8).init(std.heap.page_allocator);
var output_encoded = std.ArrayList(u8).init(std.heap.page_allocator);

var first_addend: i64 = 0;
var second_addend: i64 = 0;

var sum: i64 = 0;

export fn construct() i32 {
    return 0;
}

export fn inputSetLength(length: i32) i32 {
    input_encoded = std.ArrayList(u8).init(std.heap.page_allocator);

    input_encoded.appendNTimes(0, @intCast(usize, length)) catch |err| {
        return 1;
    };

    return 0;
}

export fn inputSet(index: i32 , input: u8 ) i32 {
    input_encoded.items[@intCast(usize, index)] = input;

    return 0;
}

export fn open() i32 {
    const right_bound = std.base64.standard_decoder.calcSize(input_encoded.items) catch |err| {
        return 1;
    };
    var buffer: [0x100]u8 = undefined;
    var decoded_input = buffer[0..right_bound];
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

    first_addend = input.firstAddend;
    second_addend = input.secondAddend;

    return 0;
}

export fn ignite() i32 {
    sum = first_addend + second_addend;

    return 0;
}

export fn close() i32 {
    const output = Output{
        .sum = sum
    };

    var jsonBuffer: [0x100]u8 = undefined;
    var decoded_output = std.io.fixedBufferStream(&jsonBuffer);
    std.json.stringify(output, std.json.StringifyOptions{}, decoded_output.outStream()) catch |err| {
        return 1;
    };

    var base64Buffer: [0x100]u8 = undefined;
    var output_encoded_internal = base64Buffer[0..std.base64.Base64Encoder.calcSize(decoded_output.getWritten().len)];
    std.base64.standard_encoder.encode(output_encoded_internal, decoded_output.getWritten());

    output_encoded = std.ArrayList(u8).init(std.heap.page_allocator);
    for (output_encoded_internal) |character| {
        output_encoded.append(character) catch |err| {
            return 1;
        };
    }
    
    return 0;
}

export fn outputGetLength() i32 {
    return @intCast(i32, output_encoded.items.len);
}

export fn outputGet(index: i32) u8 {
    return output_encoded.items[@intCast(usize, index)];
}

export fn deconstruct() i32 {
    return 0;
}