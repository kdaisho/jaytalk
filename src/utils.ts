/* eslint-disable @typescript-eslint/no-explicit-any */
import { Token } from './types'

export const pipe =
    (...fns: ((v: any) => any)[]) =>
    (value: any) => {
        return fns.reduce((value, fn) => fn(value), value)
    }

export const peek = (array: Token[]) => array[0]
export const pop = (array: Token[]) => array.shift()
