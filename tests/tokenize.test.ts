import { describe, expect, it } from 'bun:test'
import { tokenize } from '../src/tokenize'

describe('tokenize', () => {
    it('should return an array', () => {
        expect(Array.isArray(tokenize(''))).toBe(true)
    })

    it('should be able to tokenize a pair of parentheses', () => {
        const input = '()'
        const result = [
            { type: 'Parenthesis', value: '(' },
            { type: 'Parenthesis', value: ')' },
        ]

        expect(tokenize(input)).toEqual(result)
    })
})
