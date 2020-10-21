import "wasi";

export function add(firstAddend: i32, secondAddend: i32): i32 {
  return firstAddend + secondAddend;
}
