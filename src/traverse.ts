function traverseArray({
    array,
    parent,
    visitor,
}: {
    array: Record<string, any>
    parent?: Record<string, any>
    visitor: VisitorPattern
}) {
    array.forEach((node: Record<string, any>) => {
        traverseNode({ node, parent, visitor })
    })
}

function traverseNode<T>({
    node,
    parent,
    visitor,
}: {
    node: Record<string, any>
    parent?: Record<string, any>
    visitor: VisitorPattern
}) {
    const methods = visitor[node.type]

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
    visitor: VisitorPattern
) => {
    traverseNode({ node, visitor })
}

type VisitorPattern = {
    [key: string]: {
        enter?: ({
            node,
            parent,
        }: {
            node: Record<string, any>
            parent?: Record<string, any>
        }) => void
        exit?: ({
            node,
            parent,
        }: {
            node: Record<string, any>
            parent?: Record<string, any>
        }) => void
    }
}
