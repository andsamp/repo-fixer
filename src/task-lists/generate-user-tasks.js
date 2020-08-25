import { generateUserExecaCommands } from '../utils/execa'
import execa from 'execa'

export const generateUserTasks = userCommands => {
  generateUserExecaCommands(userCommands).map(execaCommand => {
    return {
      title: execaCommand.title,
      task: () => execa.stdout(...execaCommand.execaCommandParams)
    }
  })
}
