import { generateConfig } from './config'
import { generateTopLevelTasks } from './task-lists/generate-top-level-tasks'

const configFile = 'repo-fixr.json'

const config = generateConfig(configFile)

const batch = generateTopLevelTasks(config.projects)

batch.run(config)
