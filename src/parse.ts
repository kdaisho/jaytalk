import { isOpeningParenthesis, isClosingParenthesis } from './identify'
import { NAME, NUMBER, STRING } from './tokenize'
import { CallExpression, Node, StandardLibrary, Token } from './types'
import { peek, pop } from './utils'

export const NUMERIC_LITERAL = 'NumericLiteral'
export const STRING_LITERAL = 'StringLiteral'
export const IDENTIFIER = 'Identifier'
export const CALL_EXPRESSION = 'CallExpression'
export const VARIABLE_DECLARATION = 'VariableDeclaration'

const parenthesize = (tokens: Token[]): unknown => {
    const token = pop(tokens)

    if (token && isOpeningParenthesis(token.value)) {
        const expression = []

        while (!isClosingParenthesis(peek(tokens).value)) {
            expression.push(parenthesize(tokens))
        }
        pop(tokens)

        return expression
    }

    return token
}

const parse = (tokenOrTokens: unknown): Node | CallExpression => {
    if (Array.isArray(tokenOrTokens) && tokenOrTokens.length) {
        const [first, ...rest] = tokenOrTokens

        return {
            type: CALL_EXPRESSION,
            name: first.value,
            arguments: rest.map(parse),
        }
    }

    const token = tokenOrTokens as Token

    if (token.type === NUMBER) {
        return {
            type: NUMERIC_LITERAL,
            value: token.value,
        }
    }

    if (token.type === STRING) {
        return {
            type: STRING_LITERAL,
            value: token.value,
        }
    }

    if (token.type === NAME) {
        return {
            type: IDENTIFIER,
            name: token.value as StandardLibrary,
        }
    }

    throw new Error(`${token} is not defined 🔥`)
}

export default function (tokens: Token[]) {
    return parse(parenthesize(tokens))
}
