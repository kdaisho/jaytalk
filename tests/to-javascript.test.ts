import toJavaScript from '../src/to-javascript'
import { AST } from '../src/types'

describe('toJavaScript', () => {
    it('should reformat Moth to valid JavaScript', () => {
        const ast: AST = {
            type: 'CallExpression',
            name: 'add',
            arguments: [
                { type: 'NumericLiteral', value: 2 },
                { type: 'NumericLiteral', value: 3 },
                {
                    type: 'CallExpression',
                    name: 'subtract',
                    arguments: [
                        { type: 'NumericLiteral', value: 5 },
                        { type: 'NumericLiteral', value: 4 },
                    ],
                },
            ],
        }

        expect(toJavaScript(ast)).toBe('add(2, 3, subtract(5, 4))')
    })
})
