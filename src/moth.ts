import { parseAndEvaluate } from './parse-and-evaluate'

const [command, ...args] = process.argv.slice(2)

if (!command) {
    const repl = await import('./repl')
    repl.default()
} else if (command === 'run') {
    const file = Bun.file(args[0])
    const text = await file.text()

    console.log(parseAndEvaluate(text))
}
