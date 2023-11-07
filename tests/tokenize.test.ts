import { NAME, NUMBER, PARENTHESIS, STRING, tokenize } from '../src/tokenize'
import { Token } from '../src/types'

describe('tokenize', () => {
    it('should return an array', () => {
        expect(Array.isArray(tokenize(''))).toBe(true)
    })

    it('should be able to tokenize a pair of parentheses', () => {
        const input = '()'
        const result: Token[] = [
            { type: PARENTHESIS, value: '(' },
            { type: PARENTHESIS, value: ')' },
        ]

        expect(tokenize(input)).toEqual(result)
    })

    it('should ignore whitespace completely', () => {
        const input = '                  '
        const result: Token[] = []

        expect(tokenize(input)).toEqual(result)
    })

    it('should correctly tokenize a single digit', () => {
        const input = '2'
        const result: Token[] = [{ type: NUMBER, value: 2 }]

        expect(tokenize(input)).toEqual(result)
    })

    it('should be able to handle single numbers in expressions', () => {
        const input = '(1 2)'
        const result: Token[] = [
            { type: PARENTHESIS, value: '(' },
            { type: NUMBER, value: 1 },
            { type: NUMBER, value: 2 },
            { type: PARENTHESIS, value: ')' },
        ]

        expect(tokenize(input)).toEqual(result)
    })

    it('should be able to handle multi-digit numbers', () => {
        const input = '(11 22)'
        const result: Token[] = [
            { type: PARENTHESIS, value: '(' },
            { type: NUMBER, value: 11 },
            { type: NUMBER, value: 22 },
            { type: PARENTHESIS, value: ')' },
        ]

        expect(tokenize(input)).toEqual(result)
    })

    it('should be able to handle single letters in expressions', () => {
        const input = '(abc xyz)'

        const result: Token[] = [
            { type: PARENTHESIS, value: '(' },
            { type: NAME, value: 'abc' },
            { type: NAME, value: 'xyz' },
            { type: PARENTHESIS, value: ')' },
        ]

        expect(tokenize(input)).toEqual(result)
    })

    it('should know about strings', () => {
        const input = '(log "hello" "world")'
        const result: Token[] = [
            { type: PARENTHESIS, value: '(' },
            { type: NAME, value: 'log' },
            { type: STRING, value: 'hello' },
            { type: STRING, value: 'world' },
            { type: PARENTHESIS, value: ')' },
        ]

        expect(tokenize(input)).toEqual(result)
    })

    it('should correctly tokenize a simple expression', () => {
        const input = '(add 2 3)'
        const result: Token[] = [
            { type: PARENTHESIS, value: '(' },
            { type: NAME, value: 'add' },
            { type: NUMBER, value: 2 },
            { type: NUMBER, value: 3 },
            { type: PARENTHESIS, value: ')' },
        ]

        expect(tokenize(input)).toEqual(result)
    })

    it('should ignore whitespace', () => {
        const input = '   (add    2 3)'
        const result: Token[] = [
            { type: PARENTHESIS, value: '(' },
            { type: NAME, value: 'add' },
            { type: NUMBER, value: 2 },
            { type: NUMBER, value: 3 },
            { type: PARENTHESIS, value: ')' },
        ]

        expect(tokenize(input)).toEqual(result)
    })
})
