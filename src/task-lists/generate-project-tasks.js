import { generateExecaParams } from '../utils/execa'
import { generateUserTasks } from './generate-user-tasks'
import Listr from 'listr'
import execa from 'execa'
const exec = require('child_process').exec

export const generateProjectTasks = (projectName) => {
  return new Listr([
    {
      title: `Navigating to ${projectName}`,
      task: (ctx) => exec(`cd ${ctx.absoluteBaseDirectory}/${projectName}`)// TODO: path.sep
    },
    {
      title: `Repository Prep for ${projectName}`,
      task: () => {
        return new Listr([
          {
            title: 'checking git status',
            task: (ctx) => execa('git', ['status', '--porcelain']).then(result => {
              if (result !== '') {
                ctx.stash = true
                console.warn(`Stashing changes for ${projectName}`)
              }
            })
          },
          {
            title: 'stashing changes',
            enabled: ctx => ctx.stash === true,
            task: () => execa('git', ['stash'])
          },
          {
            title: 'checking out master',
            task: (ctx) => execa('git', ['checkout', ctx.git.mainBranch])
          },
          {
            title: 'pulling remote changes',
            task: () => execa('git', ['pull'])
          },
          {
            title: 'creating local branch',
            task: (ctx) => execa('git', ['checkout', '-b', ctx.git.newBranch])
          }
        ])
      }
    },
    {
      title: `Execute User Commands Against ${projectName}`,
      task: (ctx) => {
        return new Listr(generateUserTasks(ctx.userCommands))
      }
    },
    {
      title: 'Test Changes',
      task: (ctx) => {
        if (ctx.testCommand) {
          return execa(generateExecaParams(ctx.testCommand))
        } else {
          return execa('npm', ['test'])
        }
      }
    },
    {
      title: 'Push Changes to remote',
      task: () => {
        return new Listr([
          {
            title: 'Commit changes',
            task: (ctx) => execa('git', ['commit', '-am', ctx.git.commitMessage])
          },
          {
            title: 'Push changes to remote',
            task: (ctx) => execa('git', ['push', '-u', ctx.git.remote, ctx.git.newBranch])
          }
        ])
      }
    }
  ])
}
