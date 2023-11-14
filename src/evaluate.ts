import { CALL_EXPRESSION, IDENTIFIER, VARIABLE_DECLARATION } from './parse'
import Moth from './standard-library'
import { CallExpression, Node, VariableDeclaration } from './types'

const apply = (node: CallExpression): number | void => {
    const fn = Moth[node.name]
    const args = node.arguments.map(evaluate) as number[]

    if (typeof fn !== 'function') {
        throw new TypeError(`🔥${node.name} is not a function🔥`)
    }

    return fn(...args)
}

const getIdentifier = (node: { type: typeof IDENTIFIER; name: string }) => {
    if (Moth[node.name]) return Moth[node.name]
    throw new ReferenceError(`🔥${node.name} is not defined🔥`)
}

const define = (node: VariableDeclaration) => {
    Moth[node.identifier.name] = node.assignment.value
}

const evaluate = (node: Node | CallExpression | VariableDeclaration) => {
    if (node.type === VARIABLE_DECLARATION) return define(node)
    if (node.type === CALL_EXPRESSION) return apply(node)
    if (node.type === IDENTIFIER) return getIdentifier(node)
    if (typeof node.value !== 'undefined') return node.value
}

export default evaluate
