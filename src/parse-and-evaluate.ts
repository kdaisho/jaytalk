import { tokenize } from './tokenize'
import parse from './parse'
import evaluate from './evaluate'
import { pipe } from './utils'
// import { parseProgram } from './parse-program'
// import { transform } from './transform'

export const parseAndEvaluate = pipe(tokenize, parse, evaluate)

export const tokenizeAndParse = pipe(tokenize, parse)
