import traverse from './traverse'
import {
    CallExpression,
    Identifier,
    NumericLiteral,
    StringLiteral,
} from './types'

const specialForms: { [k: string]: (_: CallExpression) => void } = {
    define(node: Record<string, unknown>) {
        const [identifier, assignment] = node.arguments as [
            Identifier,
            NumericLiteral | StringLiteral
        ]
        node.type = 'VariableDeclaration'
        node.identifier = identifier
        node.assignment = assignment
        delete node.name
        delete node.arguments
    },
}

export default function transform(node: CallExpression) {
    traverse(node, {
        CallExpression: {
            enter({
                node,
            }: {
                node: CallExpression & { callee: Identifier }
            }): void {
                if (specialForms[node.name]) {
                    specialForms[node.name](node as CallExpression)
                }
                node.callee = { type: 'Identifier', name: node.name }
            },
        },
    })

    return node
}
