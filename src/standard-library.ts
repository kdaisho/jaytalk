type Calculator = (a: number, b: number) => number

const all = (fn: Calculator) => {
    return (...list: number[]) => {
        return list.reduce(fn)
    }
}

const add = all((a: number, b: number) => a + b)
const subtract = all((a: number, b: number) => a - b)
const multiply = all((a: number, b: number) => a * b)
const divide = all((a: number, b: number) => a / b)
const modulo = all((a: number, b: number) => a % b)
const max = all((a: number, b: number) => Math.max(...[a, b]))
const min = all((a: number, b: number) => Math.min(...[a, b]))
const log = console.log

export default {
    add,
    subtract,
    multiply,
    divide,
    modulo,
    max,
    min,
    log,
    pi: Math.PI,
}
