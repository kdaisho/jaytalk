import evaluate from '../src/evaluate'
import { NUMERIC_LITERAL, STRING_LITERAL } from '../src/parse'

describe('evaluate', () => {
    it('should fall back to returning a primitive numeric value', () => {
        const ast = { type: NUMERIC_LITERAL, value: 2 }
        expect(evaluate(ast)).toBe(2)
    })

    it('should fall back to returning a primitive string value', () => {
        const ast = { type: STRING_LITERAL, value: 'hello' }
        expect(evaluate(ast)).toBe('hello')
    })
})
