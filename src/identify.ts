const LETTER = /[a-z]/i
const WHITESPACE = /\s+/
const NUMBER = /^[0-9]+$/
const OPERATORS = ['+', '-', '*', '/', '%']

export const isLetter = char => LETTER.test(char)

export const isWhitespace = char => WHITESPACE.test(char)

export const isNumber = char => NUMBER.test(char)

export const isOperator = char => OPERATORS.includes(char)

export const isOpeningParenthesis = char => char === '('

export const isClosingParenthesis = char => char === ')'

export const isParenthesis = char =>
    isOpeningParenthesis(char) || isClosingParenthesis(char)

export const isQuote = char => char === '"'
