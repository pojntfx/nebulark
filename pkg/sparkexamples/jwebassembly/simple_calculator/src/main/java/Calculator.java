import de.inetsoftware.jwebassembly.api.annotation.Export;

public class Calculator {
    @Export
    public static int ignite(int firstAddend, int secondAddend) {
        return firstAddend + secondAddend;
    }
}
