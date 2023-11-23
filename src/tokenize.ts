import {
    isLetter,
    isWhitespace,
    isNumber,
    isParenthesis,
    isQuote,
    isPound,
} from './identify'
import { Token } from './types'

export const NUMBER = 'Number'
export const PARENTHESIS = 'Parenthesis'
export const STRING = 'String'
export const NAME = 'Name'
export const HEADING = 'Heading'

export const tokenize = (input: string) => {
    const tokens: Token[] = []
    let cursor = 0

    while (cursor < input.length) {
        const char = input[cursor]

        if (isParenthesis(char)) {
            tokens.push({
                type: PARENTHESIS,
                value: char,
            })
            cursor++
            continue
        }

        if (isWhitespace(char)) {
            cursor++
            continue
        }

        if (isNumber(char)) {
            let strNumber = char

            while (isNumber(input[++cursor])) {
                strNumber += input[cursor]
            }

            tokens.push({
                type: NUMBER,
                value: parseInt(strNumber, 10),
            })
            continue
        }

        if (isLetter(char)) {
            let symbol = char

            while (isLetter(input[++cursor])) {
                symbol += input[cursor]
            }

            tokens.push({
                type: NAME,
                value: symbol,
            })
            continue
        }

        if (isQuote(char)) {
            let str = ''

            while (!isQuote(input[++cursor])) {
                str += input[cursor]
            }

            tokens.push({
                type: STRING,
                value: str,
            })

            /* now, input[cursor] is the closing quote,
            so bump the cursor to the next character */
            cursor++
            continue
        }

        if (isPound(char)) {
            let symbol = char

            while (isPound(input[++cursor])) {
                symbol += input[cursor]
            }

            tokens.push({
                type: HEADING,
                value: symbol,
            })
            continue
        }

        throw new Error(`${char} is not valid 🔥`)
    }

    return tokens
}
