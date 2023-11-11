import { CALL_EXPRESSION, NUMERIC_LITERAL } from '../src/parse'
import traverse from '../src/traverse'

describe('traverse', () => {
    it('should travel to all the nodes in the tree and reverse the math', () => {
        const ast = {
            type: CALL_EXPRESSION,
            name: 'add',
            arguments: [
                { type: NUMERIC_LITERAL, value: 12 },
                { type: NUMERIC_LITERAL, value: 6 },
            ],
        }

        const visitor = {
            CallExpression: {
                enter({ node }: Record<string, any>) {
                    if (node.name === 'add') {
                        node.name = 'subtract'
                    }
                },
            },
            NumericLiteral: {
                exit({ node }: Record<string, any>) {
                    node.value = node.value * 2
                },
            },
        }

        traverse(ast, visitor)

        expect(ast.name).toBe('subtract')
        expect(ast.arguments[0].value).toBe(24)
    })

    it('should travel to all the nodes in the tree and double all of the numbers', () => {
        const ast = {
            type: 'CallExpression',
            name: 'add',
            arguments: [
                { type: 'NumericLiteral', value: 12 },
                { type: 'NumericLiteral', value: 6 },
            ],
        }

        const visitor = {
            NumericLiteral: {
                exit({ node }: Record<string, any>) {
                    node.value = node.value * 2
                },
            },
        }

        traverse(ast, visitor)

        expect(ast.arguments[0].value).toBe(24)
        expect(ast.arguments[1].value).toBe(12)
    })
})
