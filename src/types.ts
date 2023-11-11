import { CALL_EXPRESSION, NUMERIC_LITERAL, STRING_LITERAL } from './parse'
import { NUMBER, PARENTHESIS, STRING, NAME } from './tokenize'

export type NumericToken = { type: typeof NUMBER; value: number }
export type StringToken = {
    type: typeof PARENTHESIS | typeof STRING | typeof NAME
    value: string
}

export type Token = NumericToken | StringToken

export type StandardLibrary =
    | 'add'
    | 'subtract'
    | 'multiply'
    | 'divide'
    | 'modulo'
    | 'log'
    | 'pi'

export type CallExpression = {
    type: typeof CALL_EXPRESSION
    name: string
    arguments: NumericLiteral[]
}

export type NumericLiteral = {
    type: typeof NUMERIC_LITERAL
    value: number
}

export type StringLiteral = {
    type: typeof STRING_LITERAL
    value: string
}

export type Visitor = {
    [key: string]: {
        enter?: ({
            node,
            parent,
        }: {
            node: Record<string, unknown>
            parent?: Record<string, unknown>
        }) => void
        exit?: ({
            node,
            parent,
        }: {
            node: Record<string, unknown>
            parent?: Record<string, unknown>
        }) => void
    }
}

export type CallExpressionVisitor = {
    CallExpression: {
        enter: ({
            node,
            parent,
        }: {
            node: CallExpression
            parent?: Record<string, unknown>
        }) => void
    }
}

export type NumericLiteralVisitor = {
    NumericLiteral: {
        exit: ({
            node,
            parent,
        }: {
            node: CallExpression
            parent?: Record<string, unknown>
        }) => void
    }
}
