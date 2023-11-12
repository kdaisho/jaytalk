import { IDENTIFIER, NUMERIC_LITERAL, STRING_LITERAL } from './parse'
import { NUMBER, PARENTHESIS, STRING, NAME } from './tokenize'

export type NumericToken = { type: typeof NUMBER; value: number }

export type StringToken = {
    type: typeof PARENTHESIS | typeof STRING | typeof NAME
    value: string | StandardLibrary
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
    | '+'

export type VisitorMethod = ({
    node,
    parent,
}: {
    node: {
        type: string
        arguments?: (Node | CallExpression)[]
    }
    parent?: AST
}) => void

export type CallExpressionVisitor = {
    CallExpression: {
        enter: ({
            node,
            parent,
        }: {
            node: CallExpression
            parent?: AST
        }) => void
    }
}

export type NodeVisitor = {
    NumericLiteral: {
        exit: ({ node }: { node: NumericLiteral }) => void
    }
}

export type BabelVisitor = {
    CallExpression: {
        enter: ({
            node,
        }: {
            node: { name: StandardLibrary; callee: Identifier }
        }) => void
    }
}

export type Visitor = CallExpressionVisitor | NodeVisitor | BabelVisitor

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

export type Node = NumericLiteral | StringLiteral | Identifier

export type CallExpression = {
    type: 'CallExpression'
    name: StandardLibrary
    arguments: (Node | CallExpression)[]
}

export type AST = Node | Node[] | CallExpression
