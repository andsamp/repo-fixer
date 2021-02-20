import { generateProjectTasks } from './generate-project-tasks'
import Listr from 'listr'
import UpdaterRenderer from 'listr-update-renderer'

export const generateTopLevelTasks = (projects, commands, gitMode) => {
  return new Listr(generateTasks(projects, commands, gitMode), { renderer: UpdaterRenderer, collapse: false })
}

const generateTasks = (projects, commands, gitMode) => {
  return projects.map(project => ({
    title: `Fixing ${project}`,
    task: () => {
      return generateProjectTasks(project, commands, gitMode)
    }
  }))
}
