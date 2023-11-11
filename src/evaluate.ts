import { CALL_EXPRESSION, IDENTIFIER } from './parse'
import Moth from './standard-library'
import {
    CallExpression,
    NumericLiteral,
    StandardLibrary,
    StringLiteral,
    Token,
} from './types'

// const last = (collection: any[]) => collection.at(-1)

const apply = (node: CallExpression): number | void => {
    const fn = Moth[node.name]
    const args = node.arguments.map(evaluate) as number[]

    if (typeof fn !== 'function') {
        throw new TypeError(`🔥${node.name} is not a function🔥`)
    }

    return fn(...args)
}

const getIdentifier = (node: {
    type: typeof IDENTIFIER
    name: StandardLibrary
}) => {
    if (Moth[node.name]) return Moth[node.name]
    throw new ReferenceError(`🔥${node.name} is not defined🔥`)
}

type Identifier = {
    type: typeof IDENTIFIER
    name: StandardLibrary
}

const evaluate = (
    node: CallExpression | Identifier | NumericLiteral | StringLiteral | Token
) => {
    if (node.type === CALL_EXPRESSION) return apply(node)
    if (node.type === IDENTIFIER) return getIdentifier(node)
    if (typeof node.value !== 'undefined') return node.value
}

export default evaluate
