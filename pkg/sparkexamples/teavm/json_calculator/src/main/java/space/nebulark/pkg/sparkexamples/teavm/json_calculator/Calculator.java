package space.nebulark.pkg.sparkexamples.teavm.json_calculator;

import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.teavm.interop.Export;

public class Calculator {
    private static byte[] inputEncoded;
    private static byte[] outputEncoded;

    public static void main(String[] args) {
        System.out.println("");

        return;
    }

    @Export(name = "nebulark_ion_spark_construct")
    static int construct() {
        return 0;
    }

    @Export(name = "nebulark_ion_spark_input_set_length")
    static int inputSetLength(int length) {
        inputEncoded = new byte[length];

        return 0;
    }

    @Export(name = "nebulark_ion_spark_input_set")
    static int inputSet(int index, char input) {
        inputEncoded[index] = (byte) input;

        return 0;
    }

    @Export(name = "nebulark_ion_spark_open")
    static int open() {
        return 0;
    };

    @Export(name = "nebulark_ion_spark_ignite")
    static int ignite() {
        byte[] bytesDecoded = Base64.decodeBase64(inputEncoded);
        String inputDecoded = new String(bytesDecoded);

        JSONParser jsonParser = new JSONParser();

        String outputDecoded = "";

        try {
            JSONObject jsonObject = (JSONObject) jsonParser.parse(inputDecoded);
            outputDecoded = String.format("{\"sum\": %d}",
                    (Long) jsonObject.get("firstAddend") + (Long) jsonObject.get("secondAddend"));
        } catch (org.json.simple.parser.ParseException e) {
            return 1;
        }

        outputEncoded = Base64.encodeBase64(outputDecoded.getBytes());

        return 0;
    }

    @Export(name = "nebulark_ion_spark_close")
    static int close() {
        return 0;
    }

    @Export(name = "nebulark_ion_spark_output_get_length")
    static int outputGetLength() {
        return outputEncoded.length;
    }

    @Export(name = "nebulark_ion_spark_output_get")
    static int outputGet(int index) {
        return (char) outputEncoded[index];
    }

    @Export(name = "nebulark_ion_spark_deconstruct")
    static int deconstruct() {
        return 0;
    }
}