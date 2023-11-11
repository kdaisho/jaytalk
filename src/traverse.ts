import {
    CallExpression,
    CallExpressionVisitor,
    NumericLiteral,
    NumericLiteralVisitor,
} from './types'

function traverseArray({
    array,
    parent,
    visitor,
}: {
    array: (CallExpression | NumericLiteral)[]
    parent?: { type: string; arguments?: (CallExpression | NumericLiteral)[] }
    visitor: CallExpressionVisitor | NumericLiteralVisitor
}) {
    array.forEach(
        (node: {
            type: string
            arguments?: (CallExpression | NumericLiteral)[]
        }) => {
            traverseNode({ node, parent, visitor })
        }
    )
}

function traverseNode({
    node,
    parent,
    visitor,
}: {
    node: { type: string; arguments?: (CallExpression | NumericLiteral)[] }
    parent?: { type: string; arguments?: (CallExpression | NumericLiteral)[] }
    visitor: CallExpressionVisitor | NumericLiteralVisitor
}) {
    const methods = visitor[node.type as keyof typeof visitor] as {
        enter?: ({
            node,
            parent,
        }: {
            node: {
                type: string
                arguments?: (CallExpression | NumericLiteral)[]
            }
            parent?: {
                type: string
                arguments?: (CallExpression | NumericLiteral)[]
            }
        }) => void
        exit?: ({
            node,
            parent,
        }: {
            node: {
                type: string
                arguments?: (CallExpression | NumericLiteral)[]
            }
            parent?: {
                type: string
                arguments?: (CallExpression | NumericLiteral)[]
            }
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
    node: { type: string; arguments?: (CallExpression | NumericLiteral)[] },
    visitor: CallExpressionVisitor | NumericLiteralVisitor
) => {
    traverseNode({ node, visitor })
}
