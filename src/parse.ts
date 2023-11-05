import { isOpeningParenthesis, isClosingParenthesis } from './identify'
import { NAME, NUMBER, STRING } from './tokenize'
import { Token, ASTNodeType } from './types'
import { peek, pop } from './utils'

const parenthesize = (tokens: Token[]): unknown => {
    const token = pop(tokens)

    if (token && !Array.isArray(token) && isOpeningParenthesis(token.value)) {
        const expression = []

        while (!isClosingParenthesis(peek(tokens as Token[]).value)) {
            expression.push(parenthesize(tokens))
        }
        pop(tokens)

        return expression
    }

    return token
}

const parse = (tokens: unknown): Record<string, unknown> => {
    if (Array.isArray(tokens) && tokens.length) {
        const [first, ...rest] = tokens

        return {
            type: 'CallExpression',
            name: first.value,
            arguments: rest.map(parse),
        }
    }

    const token = tokens as Token

    if (Array.isArray(token)) return token[0]

    if (token.type === NUMBER) {
        return {
            type: ASTNodeType.NumericLiteral,
            value: token.value,
        }
    }

    if (token.type === STRING) {
        return {
            type: ASTNodeType.StringLiteral,
            value: token.value,
        }
    }

    if (token.type === NAME) {
        return {
            type: ASTNodeType.Identifier,
            name: token.value,
        }
    }

    return token
}

export default function (tokens: Token[]) {
    return parse(parenthesize(tokens))
}
