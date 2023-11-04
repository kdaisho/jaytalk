import { describe, expect, it } from 'bun:test'
import { tokenize, type Token } from '../src/tokenize'

describe('tokenize', () => {
    it('should return an array', () => {
        expect(Array.isArray(tokenize(''))).toBe(true)
    })

    it('should be able to tokenize a pair of parentheses', () => {
        const input = '()'
        const result: Token[] = [
            { type: 'Parenthesis', value: '(' },
            { type: 'Parenthesis', value: ')' },
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
        const result: Token[] = [{ type: 'Number', value: 2 }]

        expect(tokenize(input)).toEqual(result)
    })

    it('should be able to handle single numbers in expressions', () => {
        const input = '(1 2)'
        const result: Token[] = [
            { type: 'Parenthesis', value: '(' },
            { type: 'Number', value: 1 },
            { type: 'Number', value: 2 },
            { type: 'Parenthesis', value: ')' },
        ]

        expect(tokenize(input)).toEqual(result)
    })

    it('should be able to handle multi-digits in expressions', () => {
        const input = '(11 22)'
        const result: Token[] = [
            { type: 'Parenthesis', value: '(' },
            { type: 'Number', value: 11 },
            { type: 'Number', value: 22 },
            { type: 'Parenthesis', value: ')' },
        ]

        expect(tokenize(input)).toEqual(result)
    })
})
