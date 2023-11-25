import { IDENTIFIER, NUMERIC_LITERAL, STRING_LITERAL } from './parse'
import { NUMBER, PARENTHESIS, STRING, NAME, HEADING, HTML } from './tokenize'

export type NumericToken = { type: typeof NUMBER; value: number }

export type StringToken = {
    type: typeof PARENTHESIS | typeof STRING | typeof NAME | typeof HEADING
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
    | 'define'

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
            node: CallExpression & { callee: Identifier }
        }) => void
    }
    VariableDeclaration?: {
        enter: ({ node }: { node: BabelNode }) => void
    }
}

export type Visitor = CallExpressionVisitor | NodeVisitor | BabelVisitor

export type BabelNode = {
    kind: string
    identifier: Identifier
    assignment: NumericLiteral | StringLiteral
    declarations: {
        type: string
        id: Identifier
        init: NumericLiteral | StringLiteral
    }[]
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
    name: string
}

export type HTML = {
    type: typeof HTML
    value: string
}

export type HTMLNode = {
    type: typeof HTML
    value: string
    assignment: {
        type: 'String'
        value: string
    }
}

export type Node = NumericLiteral | StringLiteral | Identifier | HTML

export type CallExpression = {
    type: 'CallExpression'
    name: StandardLibrary
    arguments: (Node | CallExpression)[]
}

export type VariableDeclaration = {
    type: 'VariableDeclaration'
    identifier: Identifier
    assignment: NumericLiteral | StringLiteral
}

export type AST = Node | Node[] | CallExpression
