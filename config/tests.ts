declare global {
    var describe: (description: string, tests: () => void) => void
    var expect: (value: any) => any
    var it: (description: string, tests: () => void) => void
}
