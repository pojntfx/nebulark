package space.nebulark.examples.teavm.simple_calculator;

import org.teavm.interop.Export;

public class Calculator {
    public static void main(String[] args) {
        System.out.println("");

        return;
    }

    @Export(name = "add")
    public static int add(int firstAddend, int secondAddend) {
        return firstAddend + secondAddend;
    }
}