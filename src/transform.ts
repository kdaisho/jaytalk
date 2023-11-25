import traverse from './traverse'
import {
    CallExpression,
    Identifier,
    NumericLiteral,
    StringLiteral,
} from './types'

const specialForms: { [k: string]: (_: CallExpression) => void } = {
    'define'(node: Record<string, unknown>) {
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
    '#': (node: Record<string, unknown>) => {
        console.log('==> TR', node)
        const assignment = (node.arguments as unknown[])[0]
        node.assignment = assignment
        delete node.name
        delete node.arguments
        console.log('==> TR 2', node)
    },
}

export default function (node: CallExpression) {
    console.log('==> HERE?', node)
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

                node.callee = { type: 'Identifier', name: node.name } // name is undefined
                console.log('==> TR 3', node)
            },
        },
    })

    console.log('==> TTT', node)

    return node
}
