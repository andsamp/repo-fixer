import { generateUserExecaCommands } from '../utils/execa'
import execa from 'execa'

export const generateUserTasks = (userCommands, options) => {
  generateUserExecaCommands(userCommands, options).map(execaCommand => {
    return {
      title: execaCommand.title,
      task: () => execa(...execaCommand.execaCommandParams)
    }
  })
}
