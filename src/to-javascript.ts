import generate from '@babel/generator'
import traverse from './traverse'
import { AST, Identifier, Node, StandardLibrary, Visitor } from './types'

const babelVisitor: Visitor = {
    CallExpression: {
        enter({
            node,
        }: {
            node: { name: StandardLibrary; callee: Identifier }
        }) {
            node.callee = { type: 'Identifier', name: node.name }
        },
    },
}

export default (ast: AST | Node) => {
    traverse(ast, babelVisitor)
    return generate(ast as Node).code
}
