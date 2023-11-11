declare global {
    const describe: (description: string, tests: () => void) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const expect: (value: any) => any
    const it: (description: string, tests: () => void) => void
}
