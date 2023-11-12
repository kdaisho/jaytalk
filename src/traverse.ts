import { CallExpression, NumericLiteral, Visitor, VisitorMethod } from './types'

function traverseArray<T>({
    array,
    parent,
    visitor,
}: {
    // array: CallExpression<CallExpression | NumericLiteral>[]
    array: T[]
    parent?: CallExpression<CallExpression | NumericLiteral>
    visitor: Visitor
}) {
    array.forEach(node => {
        traverseNode({ node, parent, visitor })
    })
}

function traverseNode({
    node,
    parent,
    visitor,
}: {
    node: CallExpression<CallExpression | NumericLiteral>
    parent?: CallExpression<CallExpression | NumericLiteral>
    visitor: Visitor
}) {
    const methods = visitor[node.type as keyof typeof visitor] as {
        enter?: VisitorMethod
        exit?: VisitorMethod
    }

    if (methods && methods.enter) {
        methods.enter({ node, parent })
    }

    if (node.arguments) {
        traverseArray<CallExpression<CallExpression | NumericLiteral>>({
            array: node.arguments,
            parent: node,
            visitor,
        })
    }

    if (methods && methods.exit) {
        methods.exit({ node, parent })
    }
}

export default (node: CallExpression<NumericLiteral>, visitor: Visitor) => {
    traverseNode({ node, visitor })
}
