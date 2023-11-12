import {
    CALL_EXPRESSION,
    IDENTIFIER,
    NUMERIC_LITERAL,
    STRING_LITERAL,
} from './parse'
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
    | 'max'
    | 'min'

// export interface CallExpression<
//     T extends CallExpression | NumericLiteral | StringLiteral = NumericLiteral
// > {
//     type: typeof CALL_EXPRESSION
//     name: StandardLibrary
//     arguments: T[]
// }

export interface CallExpression {
    type: typeof CALL_EXPRESSION
    name: StandardLibrary
    arguments: CallExpression
}

export type NumericLiteral = {
    type: typeof NUMERIC_LITERAL
    value: number
}

export type StringLiteral = {
    type: typeof STRING_LITERAL
    value: string
}

export type Identifier = {
    type: typeof IDENTIFIER
    name: StandardLibrary
}

export type VisitorMethod = ({
    node,
    parent,
}: {
    node: {
        type: string
        arguments?: NumericLiteral[]
    }
    parent?: {
        type: string
        arguments?: NumericLiteral[]
    }
}) => void

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
            node: NumericLiteral
            parent?: Record<string, unknown>
        }) => void
    }
}

export type Visitor = CallExpressionVisitor | NumericLiteralVisitor

export type AST = {
    type: typeof CALL_EXPRESSION
    name: StandardLibrary
    arguments: NumericLiteral[]
}
