const all =
    (fn: (a: number, b: number) => number) =>
    (...list: number[]) =>
        list.reduce(fn)

const add = all((a: number, b: number) => a + b)
const subtract = all((a: number, b: number) => a - b)
const multiply = all((a: number, b: number) => a * b)
const divide = all((a: number, b: number) => a / b)
const modulo = all((a: number, b: number) => a % b)
const log = console.log

export default {
    add,
    subtract,
    multiply,
    divide,
    modulo,
    log,
    pi: Math.PI,
}
