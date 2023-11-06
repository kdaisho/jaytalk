import { describe, expect, it } from 'bun:test'
import parse, {
    IDENTIFIER,
    NUMERIC_LITERAL,
    STRING_LITERAL,
} from '../src/parse'
import { Token } from '../src/types'
import { NAME, NUMBER, PARENTHESIS, STRING } from '../src/tokenize'

describe('parse', () => {
    it('should return a token with the type of NumericLiteral for number tokens', () => {
        const tokens: Token[] = [{ type: NUMBER, value: 1 }]
        const ast = { type: NUMERIC_LITERAL, value: 1 }

        expect(parse(tokens)).toEqual(ast)
    })

    it('should return a token with the type of StringLiteral for string tokens', () => {
        const tokens: Token[] = [{ type: STRING, value: 'hello' }]
        const ast = { type: STRING_LITERAL, value: 'hello' }

        expect(parse(tokens)).toEqual(ast)
    })

    it('should return a token with the type of Identifier for name tokens', () => {
        const tokens: Token[] = [{ type: NAME, value: 'x' }]
        const ast = { type: IDENTIFIER, name: 'x' }

        expect(parse(tokens)).toEqual(ast)
    })

    it('should return an AST for a basic data structure', () => {
        const tokens: Token[] = [
            { type: PARENTHESIS, value: '(' },
            { type: NAME, value: 'add' },
            { type: NUMBER, value: 2 },
            { type: NUMBER, value: 3 },
            { type: PARENTHESIS, value: ')' },
        ]

        const ast = {
            type: 'CallExpression',
            name: 'add',
            arguments: [
                { type: NUMERIC_LITERAL, value: 2 },
                { type: NUMERIC_LITERAL, value: 3 },
            ],
        }

        const result = parse(tokens)

        expect(result).toEqual(ast)
    })

    it('should return an AST for a nested data structure', () => {
        const tokens: Token[] = [
            { type: PARENTHESIS, value: '(' },
            { type: NAME, value: 'add' },
            { type: NUMBER, value: 2 },
            { type: NUMBER, value: 3 },
            { type: PARENTHESIS, value: '(' },
            { type: NAME, value: 'subtract' },
            { type: NUMBER, value: 4 },
            { type: NUMBER, value: 2 },
            { type: PARENTHESIS, value: ')' },
            { type: PARENTHESIS, value: ')' },
        ]
        // (add 2 3 (subtract 4 2))

        const ast = {
            type: 'CallExpression',
            name: 'add',
            arguments: [
                { type: 'NumericLiteral', value: 2 },
                { type: 'NumericLiteral', value: 3 },
                {
                    type: 'CallExpression',
                    name: 'subtract',
                    arguments: [
                        { type: 'NumericLiteral', value: 4 },
                        { type: 'NumericLiteral', value: 2 },
                    ],
                },
            ],
        }

        expect(parse(tokens)).toEqual(ast)
    })
})
