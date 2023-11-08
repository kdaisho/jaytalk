import { CALL_EXPRESSION } from './parse'
import Moth from './standard-library'
import { CallExpression } from './types'

const last = (collection: any[]) => collection.at(-1)

const apply = (node: CallExpression): number => {
    const fn = Moth[node.name]
    const args = node.arguments.map(evaluate)

    if (typeof fn !== 'function') {
        throw new TypeError(`${node.name} is not a function`)
    }

    return fn(...args)
}

const evaluate = (node: any) => {
    if (node.type === CALL_EXPRESSION) return apply(node)
    if (node.value) return node.value
}

export default evaluate
