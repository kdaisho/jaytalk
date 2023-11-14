import generate from '@babel/generator'
import traverse from './traverse'
import {
    AST,
    BabelNode,
    Identifier,
    Node,
    StandardLibrary,
    VariableDeclaration,
    Visitor,
} from './types'

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
    VariableDeclaration: {
        enter({ node }: { node: BabelNode }) {
            node.kind = 'let'
            node.declarations = [
                {
                    type: 'VariableDeclarator',
                    id: node.identifier,
                    init: node.assignment,
                },
            ]
        },
    },
}

export default (ast: AST | Node | VariableDeclaration) => {
    traverse(ast, babelVisitor)
    return generate(ast as Node).code
}
