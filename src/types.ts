import { NUMBER, PARENTHESIS, STRING, NAME } from './tokenize'

/* Token types */
export type NumericToken = { type: typeof NUMBER; value: number }
export type StringToken = {
    type: typeof PARENTHESIS | typeof STRING | typeof NAME
    value: string
}

export type Token = NumericToken | StringToken

/* AST node types */
export enum ASTNodeType {
    NumericLiteral = 'NumericLiteral',
    StringLiteral = 'StringLiteral',
    Identifier = 'Identifier',
}
