import { generateConfig } from './config'
import { generateTopLevelTasks } from './task-lists/generate-top-level-tasks'
import yargs from 'yargs'
const fs = require('fs')

const args = yargs(process.argv.slice(2))
  .option('config', {
    default: './config.json',
    type: 'string',
    describe: 'Path of config file to use.'
  })
  .argv

const configFile = fs.readFileSync(args.config)

const config = generateConfig(JSON.parse(configFile))

const batch = generateTopLevelTasks(config.projects, config.commands, config.git.mode)

batch.run(config)
