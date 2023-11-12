import { AST, NumericLiteral, Visitor, VisitorMethod } from './types'

function traverseArray({
    array,
    parent,
    visitor,
}: {
    array: AST[] | NumericLiteral[]
    parent?: AST
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
    node: AST | NumericLiteral
    parent?: AST
    visitor: Visitor
}) {
    const methods = visitor[node.type as keyof typeof visitor] as {
        enter?: VisitorMethod
        exit?: VisitorMethod
    }

    if (methods && methods.enter) {
        methods.enter({ node, parent })
    }

    if ('arguments' in node && node.arguments) {
        traverseArray({
            array: node.arguments,
            parent: node as AST,
            visitor,
        })
    }

    if (methods && methods.exit) {
        methods.exit({ node, parent })
    }
}

export default (node: AST, visitor: Visitor) => {
    traverseNode({ node, visitor })
}
