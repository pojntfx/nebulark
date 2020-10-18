package com.pojtinger.felicitas;

import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.teavm.interop.Export;

public class Client {

    private static byte[] spark_input_encoded;
    private static byte[] spark_output_encoded;

    public static void main(String[] args) {
        
        // Raw spark input 
        String raw_calculator_input = "{\"firstAddend\": 5, \"secondAddend\": 2}";
        System.out.println(String.format("raw spark input: %s\n", raw_calculator_input));

        // Encode spark input
        byte[] calculator_input_encoded_internal = Base64.encodeBase64(raw_calculator_input.getBytes());
        System.out.println(String.format("enhanced spark input: %s\n", calculator_input_encoded_internal));

        spark_input_encoded = new byte[calculator_input_encoded_internal.length];
        // Write encoded spark input into memory
        if (nebularkIonSparkInputSetLength(calculator_input_encoded_internal.length) != 0) {
            System.out.println("ERROR");
        }

        for (int i = 0; i < calculator_input_encoded_internal.length; i++) {
            if(nebularkIonSparkInputSet(i, (char)calculator_input_encoded_internal[i]) != 0) {
                System.out.println("ERROR");
            }
        }

        if (nebularkIonSparkOpen() != 0) {
            System.out.println("ERROR");
        }

        // Ignite 
        if (nebularkIonSparkIgnite() != 0) {
            System.out.println("ERROR");
        }

        if (nebularkIonSparkClose() != 0) {
            System.out.println("ERROR");
        }

        int calculator_output_length = nebularkIonSparkOutputGetLength();
        
        char[] calculator_output_encoded_internal = new char[calculator_output_length];
        for (int i = 0; i < calculator_output_length; i++) {
            calculator_output_encoded_internal[i] = (char)nebularkIonSparkOutputGet(i);
        }
        System.out.println(String.format("encoded spark output: %s\n", calculator_output_encoded_internal));

        if (nebularkIonSparkDeconstruct() != 0) {
            System.out.println("ERROR");
        }

        System.out.println("OK");

    }

    @Export (name = "nebulark_ion_spark_ignite")
    public static int nebularkIonSparkIgnite() {

        byte[] spark_bytes_decoded = Base64.decodeBase64(spark_input_encoded);
        String spark_input_decoded = new String(spark_bytes_decoded);

        JSONParser jsonParser = new JSONParser();
        String spark_output_decoded;
        
        try {
            JSONObject jsonObject = (JSONObject) jsonParser.parse(spark_input_decoded);
            spark_output_decoded = String.format("{\"sum\": %d}", (Long) jsonObject.get("firstAddend") + (Long)jsonObject.get("secondAddend"));
        } catch (org.json.simple.parser.ParseException e) {
            return 1;
        }
    
        spark_output_encoded = Base64.encodeBase64(spark_output_decoded.getBytes());
        
        return 0;
    }

    @Export (name = "nebulark_ion_spark_construct")
    static int nebularkIonSparkConstruct() {
        return 0;
    }

    @Export (name = "nebulark_ion_spark_input_set_length")
    static int nebularkIonSparkInputSetLength(int length) {
        return 0;
    }

    @Export (name = "nebulark_ion_spark_input_set")
    static int nebularkIonSparkInputSet(int index, char input) {
        spark_input_encoded[index] = (byte)input;
        return 0;
    }

    @Export (name = "nebulark_ion_spark_open")
    static int nebularkIonSparkOpen() {
        return 0;
    };

    @Export (name = "nebulark_ion_spark_close")
    static int nebularkIonSparkClose() {
        return 0;
    }

    @Export (name = "nebulark_ion_spark_output_get_length")
    static int nebularkIonSparkOutputGetLength() {
        return spark_output_encoded.length;
    }

    @Export (name = "nebulark_ion_spark_output_get")
    static int nebularkIonSparkOutputGet(int index) {
        return (char)spark_output_encoded[index];
    }
    
    @Export (name = "nebulark_ion_spark_deconstruct")
    static int nebularkIonSparkDeconstruct() {
        return 0;
    }

}