import inquirer from 'inquirer'
import chalk from 'chalk'
import { parseAndEvaluate } from './parse-and-evaluate'

const COMMAND = 'COMMAND'

const askQuestions = () => {
    const questions = [
        {
            name: COMMAND,
            type: 'input',
            message: chalk.blue('>'),
        },
    ]

    return inquirer.prompt(questions)
}

const repl = async () => {
    try {
        const { COMMAND } = await askQuestions()

        if (COMMAND.trim()) {
            console.log(chalk.yellow(parseAndEvaluate(COMMAND)))
        }
    } catch (err) {
        console.error(`🔥${err}🔥`)
    }
}

repl()
