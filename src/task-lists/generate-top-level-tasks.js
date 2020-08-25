import { generateProjectTasks } from './generate-project-tasks'
import Listr from 'listr'

export const generateTopLevelTasks = (projects) => {
  return new Listr(generateTasks(projects))
}

const generateTasks = projects => {
  return projects.map(project => ({
    title: `Fixing ${project}`,
    task: () => {
      return generateProjectTasks(project)
    }
  }))
}
