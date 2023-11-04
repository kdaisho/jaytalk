import {
    isLetter,
    isWhitespace,
    isNumber,
    isParenthesis,
    isQuote,
} from './identify'

export type Token =
    | {
          type: 'Parenthesis'
          value: string
      }
    | {
          type: 'Number'
          value: number
      }
    | {
          type: 'Name'
          value: string
      }

export const tokenize = (input: string) => {
    const tokens: Token[] = []
    let cursor = 0

    while (cursor < input.length) {
        const char = input[cursor]

        if (isParenthesis(char)) {
            tokens.push({
                type: 'Parenthesis',
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
                type: 'Number',
                value: parseInt(strNumber, 10),
            })

            continue
        }

        if (isLetter(char)) {
            tokens.push({
                type: 'Name',
                value: char,
            })
            cursor++
            continue
        }

        throw new Error(`${char} is not valid`)
    }

    return tokens
}
