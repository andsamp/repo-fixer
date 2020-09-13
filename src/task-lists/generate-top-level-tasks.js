import { generateProjectTasks } from './generate-project-tasks'
import Listr from 'listr'

export const generateTopLevelTasks = (projects, commands) => {
  return new Listr(generateTasks(projects, commands))
}

const generateTasks = (projects, commands, gitMode) => {
  return projects.map(project => ({
    title: `Fixing ${project}`,
    task: () => {
      return generateProjectTasks(project, commands, gitMode)
    }
  }))
}
