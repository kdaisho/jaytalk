import inquirer from 'inquirer'
import chalk from 'chalk'
import { parseAndEvaluate } from './parse-and-evaluate'

const COMMAND = 'COMMAND'

async function askQuestions() {
    const questions = [
        {
            name: COMMAND,
            type: 'input',
            message: chalk.blue('>'),
        },
    ]

    return inquirer.prompt(questions)
}

if (process.argv[1] === import.meta.path) {
    console.log(
        chalk.greenBright('🔥 Welcome to the Moth programming language! 🔥')
    )
    repl()
}

async function repl() {
    try {
        const { COMMAND } = await askQuestions()

        if (COMMAND.trim()) {
            console.log(chalk.yellow(parseAndEvaluate(COMMAND)))
        }
    } catch (err) {
        console.error(`🔥${err}🔥`)
    }
    repl()
}

export default repl
