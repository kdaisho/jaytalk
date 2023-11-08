import { CALL_EXPRESSION } from './parse'
import { NUMBER, PARENTHESIS, STRING, NAME } from './tokenize'

export type NumericToken = { type: typeof NUMBER; value: number }
export type StringToken = {
    type: typeof PARENTHESIS | typeof STRING | typeof NAME
    value: string
}

export type Token = NumericToken | StringToken

export type CallExpression = {
    type: typeof CALL_EXPRESSION
    name: 'add' | 'subtract' | 'multiply' | 'divide' | 'modulo'
    arguments: Token[]
}
