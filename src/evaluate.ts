import { CALL_EXPRESSION, IDENTIFIER, VARIABLE_DECLARATION } from './parse'
import Moth from './standard-library'
import { HTML } from './tokenize'
import { CallExpression, HTMLNode, Node, VariableDeclaration } from './types'

const apply = (node: CallExpression): number | void => {
    console.log('==> EVAL', node)
    const fn = Moth[node.name]
    const args = node.arguments.map(evaluate) as number[]

    if (typeof fn !== 'function') {
        throw new TypeError(`${node.name} is not a function 🔥`)
    }

    console.log('==> EVAL 2', fn)
    console.log('==> EVAL 3', fn(...args))

    return fn(...args)
}

const getIdentifier = (node: { type: typeof IDENTIFIER; name: string }) => {
    if (Moth[node.name]) return Moth[node.name]
    throw new ReferenceError(`evaluate: ${node.name} is not defined 🔥`)
}

const define = (node: VariableDeclaration) => {
    Moth[node.identifier.name] = node.assignment.value
}

const heading: Record<number, string> = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
}

const buildHTML = (node: HTMLNode) => {
    const headingString =
        '<' +
        heading[node.value.length] +
        '>' +
        node.assignment.value +
        '</' +
        heading[node.value.length] +
        '>'
    return headingString
}

const evaluate = (
    node: Node | CallExpression | VariableDeclaration | HTMLNode
) => {
    if (node.type === VARIABLE_DECLARATION) return define(node)
    if (node.type === CALL_EXPRESSION) return apply(node)
    if (node.type === IDENTIFIER) return getIdentifier(node)
    if (node.type === HTML && 'value' in node && 'assignment' in node)
        return buildHTML(node)
    if (typeof node.value !== 'undefined') return node.value
}

export default evaluate
