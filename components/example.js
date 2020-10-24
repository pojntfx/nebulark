import React from "react";

function Example({
  title,
  calculate,
  output,
  firstAddend,
  setFirstAddend,
  secondAddend,
  setSecondAddend,
  ...otherProps
}) {
  return (
    <div {...otherProps}>
      <div>{title}</div>

      <input
        type="number"
        value={firstAddend}
        onChange={(v) => setFirstAddend(v.target.value)}
        placeholder="First Addend"
      />

      <input
        type="number"
        value={secondAddend}
        onChange={(v) => setSecondAddend(v.target.value)}
        placeholder="Second Addend"
      />

      <button onClick={() => calculate(firstAddend, secondAddend)}>Run</button>

      <div>Output: {output}</div>
    </div>
  );
}

export default Example;
