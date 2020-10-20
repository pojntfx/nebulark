package space.nebulark.pkg.sparkexamples.teavm.json_calculator;

import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.teavm.interop.Export;

public class Calculator {
    private static byte[] spark_input_encoded;
    private static byte[] spark_output_encoded;

    public static void main(String[] args) {
        System.out.println("");
    
        return;
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