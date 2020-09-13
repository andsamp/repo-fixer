import Listr from 'listr'
import { GIT_MODE_SKIP } from '../utils/constants'
import { REPO_PREP_TASKS } from './constants'

export const generateRepositoryPrepTasks = (projectName, gitMode) => {
  if (GIT_MODE_SKIP === gitMode) {
    return undefined
  }

  return {
    title: `Repository Prep for ${projectName}`,
    task: () => {
      return new Listr(REPO_PREP_TASKS[gitMode])
    }
  }
}
