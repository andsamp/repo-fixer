import Listr from 'listr'
import execa from 'execa'
import { generateExecaParams } from '../utils/execa'
import { generateUserTasks } from './generate-user-tasks'
import { checkGitStatus } from '../../dist/tasks/git/check-git-status'
import { stashChanges } from '../tasks/git/stash-changes'
import { checkoutMainBranch } from '../tasks/git/checkout-main-branch'
import { createLocalBranch } from '../tasks/git/create-local-branch'
import { pull } from '../tasks/git/pull'
import { commit } from '../tasks/git/commit'
import { pushToRemote } from '../tasks/git/push-to-remote'

export const generateProjectTasks = (projectName, commands) => {
  return new Listr([
    {
      title: `Navigating to ${projectName}`,
      task: (ctx) => {
        ctx.cwd = `${ctx.absoluteBaseDirectory}/${projectName}`
        ctx.currentProjectName = projectName
        ctx.stash = undefined
      }
    },
    {
      title: `Repository Prep for ${projectName}`,
      task: () => {
        return new Listr([
          checkGitStatus,
          stashChanges,
          checkoutMainBranch,
          pull,
          createLocalBranch
        ])
      }
    },
    {
      title: `Execute User Commands Against ${projectName}`,
      task: (ctx) => {
        return new Listr(generateUserTasks(commands, { cwd: ctx.cwd }))
      }
    },
    {
      title: 'Test Changes',
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
