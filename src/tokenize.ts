import {
    isLetter,
    isWhitespace,
    isNumber,
    isParenthesis,
    isQuote,
} from './identify'

export const tokenize = (input: string) => {
    const tokens: Record<string, unknown>[] = []
    let cursor = 0

    while (cursor < input.length) {
        cursor++
    }

    return tokens
}
