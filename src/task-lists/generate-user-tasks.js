import { generateUserExecaCommands } from '../utils/execa'
import execa from 'execa'

export const generateUserTasks = (userCommands, options) => {
  return generateUserExecaCommands(userCommands, options).map(execaCommand => {
    return {
      title: execaCommand.title,
      task: () => execa(...execaCommand.execaCommandParams)
    }
  })
}
