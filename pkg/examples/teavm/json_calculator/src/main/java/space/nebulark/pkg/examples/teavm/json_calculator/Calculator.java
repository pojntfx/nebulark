package space.nebulark.pkg.examples.teavm.json_calculator;

import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.teavm.interop.Export;

public class Calculator {
    private static byte[] inputEncoded;
    private static byte[] outputEncoded;

    private static long firstAddend;
    private static long secondAddend;
    private static long result;

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

        byte[] bytesDecoded = Base64.decodeBase64(inputEncoded);
        String inputDecoded = new String(bytesDecoded);

        JSONParser jsonParser = new JSONParser();

        

        try {
            JSONObject jsonObject = (JSONObject) jsonParser.parse(inputDecoded);
            firstAddend = (Long) jsonObject.get("firstAddend");
            secondAddend = (Long) jsonObject.get("secondAddend");
        } catch (org.json.simple.parser.ParseException e) {
            return 1;
        }

        return 0;
    };

    @Export(name = "nebulark_ion_spark_ignite")
    static int ignite() {
        
        result = firstAddend + secondAddend;

        return 0;
    }

    @Export(name = "nebulark_ion_spark_close")
    static int close() {

        String outputDecoded = "{\"sum\":" + result + "}";
        outputEncoded = Base64.encodeBase64(outputDecoded.getBytes());

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