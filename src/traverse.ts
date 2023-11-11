import { CallExpressionVisitor, NumericLiteralVisitor } from './types'

function traverseArray({
    array,
    parent,
    visitor,
}: {
    array: Record<string, any>
    parent?: Record<string, any>
    visitor: CallExpressionVisitor | NumericLiteralVisitor
}) {
    array.forEach((node: Record<string, any>) => {
        traverseNode({ node, parent, visitor })
    })
}

function traverseNode({
    node,
    parent,
    visitor,
}: {
    node: Record<string, any>
    parent?: Record<string, any>
    visitor: CallExpressionVisitor | NumericLiteralVisitor
}) {
    const methods = visitor[node.type as keyof typeof visitor] as {
        enter?: ({
            node,
            parent,
        }: {
            node: Record<string, unknown>
            parent?: Record<string, unknown>
        }) => void
        exit?: ({
            node,
            parent,
        }: {
            node: Record<string, unknown>
            parent?: Record<string, unknown>
        }) => void
    }

    if (methods && methods.enter) {
        methods.enter({ node, parent })
    }

    if (node.arguments) {
        traverseArray({ array: node.arguments, parent: node, visitor })
    }

    if (methods && methods.exit) {
        methods.exit({ node, parent })
    }
}

export default (
    node: { type: string; arguments?: Record<string, any>[] },
    visitor: CallExpressionVisitor | NumericLiteralVisitor
) => {
    traverseNode({ node, visitor })
}
