import { isOpeningParenthesis, isClosingParenthesis } from './identify'
import { HEADING, NAME, NUMBER, STRING, HTML } from './tokenize'
import { CallExpression, Node, StandardLibrary, Token } from './types'
import { peek, pop } from './utils'

export const NUMERIC_LITERAL = 'NumericLiteral'
export const STRING_LITERAL = 'StringLiteral'
export const IDENTIFIER = 'Identifier'
export const CALL_EXPRESSION = 'CallExpression'
export const VARIABLE_DECLARATION = 'VariableDeclaration'

const parenthesize = (tokens: Token[]): unknown => {
    console.log('==>', tokens)
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
    console.log('==> P', tokenOrTokens)
    if (Array.isArray(tokenOrTokens) && tokenOrTokens.length) {
        const [first, ...rest] = tokenOrTokens

        if (first.type === HEADING) {
            console.log('==> PP 1', first, rest)
            console.log('==> PP 2', rest)
            const yo = {
                type: HTML,
                value: first.value,
                assignment: rest[0],
            }
            console.log('==> PPP', yo)
            return yo
        }

        let yo = {
            type: CALL_EXPRESSION,
            name: first.value,
            arguments: rest.map(parse),
        }

        console.log('==> CE', yo)

        return yo
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

    if (token.type === HEADING) {
        return {
            type: HTML,
            value: token.value,
        }
    }

    throw new Error(`parser: ${token} is not defined 🔥`)
}

export default function (tokens: Token[]) {
    return parse(parenthesize(tokens))
}
