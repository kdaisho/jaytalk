import Moth from './standard-library'

const last = (collection: any[]) => collection.at(-1)

const evaluate = (node: any) => {
    if (node.value) return node.value
}

export default evaluate
