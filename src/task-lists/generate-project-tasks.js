import Listr from 'listr'
import execa from 'execa'
import { generateExecaParams } from '../utils/execa'
import { generateUserTasks } from './generate-user-tasks'
import { commit } from '../tasks/git/commit'
import { pushToRemote } from '../tasks/git/push-to-remote'
import { generateRepositoryPrepTasks } from './generate-repository-prep-tasks'

export const generateProjectTasks = (projectName, commands, gitMode) => {
  return new Listr([
    {
      title: `Navigating to ${projectName}`,
      task: (ctx) => {
        ctx.cwd = `${ctx.absoluteBaseDirectory}/${projectName}`
        ctx.currentProjectName = projectName
        ctx.stash = undefined
      }
    },
    generateRepositoryPrepTasks(projectName, gitMode),
    {
      title: `Execute User Commands Against ${projectName}`,
      task: (ctx) => {
        return new Listr(generateUserTasks(commands, { cwd: ctx.cwd }))
      }
    },
    {
      title: 'Execute Healthcheck',
      enabled: ctx => ctx.testCommand || false,
      task: (ctx) => {
        if (ctx.testCommand) {
          return execa(...generateExecaParams(ctx.testCommand, { cwd: ctx.cwd }))
        } else {
          return execa('npm', ['test'], { cwd: ctx.cwd })
        }
      }
    },
    {
      title: 'Push Changes to remote',
      task: (ctx) => {
        return new Listr([
          commit,
          pushToRemote
        ])
      }
    }
  ])
}
