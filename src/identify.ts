const LETTER = /[a-z]/i
const WHITESPACE = /\s+/
const NUMBER = /^[0-9]+$/
const OPERATORS = ['+', '-', '*', '/', '%']

export const isLetter = (char: string) => LETTER.test(char)

export const isWhitespace = (char: string) => WHITESPACE.test(char)

export const isNumber = (char: string) => NUMBER.test(char)

export const isOperator = (char: string) => OPERATORS.includes(char)

export const isOpeningParenthesis = (char: string | number) => {
    if (typeof char === 'number') return false
    return char === '('
}

export const isClosingParenthesis = (char: string | number) => {
    if (typeof char === 'number') return false
    return char === ')'
}

export const isParenthesis = (char: string) =>
    isOpeningParenthesis(char) || isClosingParenthesis(char)

export const isQuote = (char: string) => char === '"'
