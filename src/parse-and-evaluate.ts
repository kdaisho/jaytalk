import { tokenize } from './tokenize'
import parse from './parse'
import evaluate from './evaluate'
import transform from './transform'
import { pipe } from './utils'

export const parseAndEvaluate = pipe(tokenize, parse, transform, evaluate)

export const tokenizeAndParse = pipe(tokenize, parse)
