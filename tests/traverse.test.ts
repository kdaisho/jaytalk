import { CALL_EXPRESSION, NUMERIC_LITERAL } from '../src/parse'
import traverse from '../src/traverse'
import { AST, CallExpression, NumericLiteral, Visitor } from '../src/types'

describe('traverse', () => {
    it('should travel to all the nodes in the tree and reverse the math', () => {
        const ast: AST = {
            type: CALL_EXPRESSION,
            name: 'add',
            arguments: [
                { type: NUMERIC_LITERAL, value: 12 },
                { type: NUMERIC_LITERAL, value: 6 },
            ],
        }

        const visitor: Visitor = {
            CallExpression: {
                enter({ node }) {
                    if (node.name === 'add') {
                        node.name = 'subtract'
                    }
                },
            },
            NumericLiteral: {
                exit({ node }: { node: NumericLiteral }) {
                    node.value = node.value * 2
                },
            },
        }

        traverse(ast, visitor)

        expect(ast.name).toBe('subtract')
        expect((ast.arguments[0] as NumericLiteral).value).toBe(24)
    })

    it('should travel to all the nodes in the tree and double all of the numbers', () => {
        const ast: AST = {
            type: 'CallExpression',
            name: 'add',
            arguments: [
                { type: 'NumericLiteral', value: 12 },
                { type: 'NumericLiteral', value: 6 },
            ],
        }

        const visitor = {
            NumericLiteral: {
                exit({ node }: { node: NumericLiteral }) {
                    node.value = node.value * 2
                },
            },
        }

        traverse(ast, visitor)

        expect((ast.arguments[0] as NumericLiteral).value).toBe(24)
        expect((ast.arguments[1] as NumericLiteral).value).toBe(12)
    })

    it('should modify the tree', () => {
        const ast: AST = {
            type: 'CallExpression',
            name: '+',
            arguments: [
                { type: 'NumericLiteral', value: 12 },
                { type: 'NumericLiteral', value: 6 },
            ],
        }

        const visitor = {
            CallExpression: {
                enter({ node }: { node: CallExpression }) {
                    if (node.name === '+') {
                        node.name = 'add'
                    }
                },
            },
        }

        traverse(ast, visitor)

        expect(ast.name).toBe('add')
    })
})
