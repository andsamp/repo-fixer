import { generateExecaParams } from '../utils/execa'
import { generateUserTasks } from './generate-user-tasks'
import Listr from 'listr'
import execa from 'execa'

export const generateProjectTasks = (projectName) => {
  return new Listr([
    {
      title: `Navigating to ${projectName}`,
      task: (ctx) => { ctx.cwd = `${ctx.absoluteBaseDirectory}/${projectName}` }
    },
    {
      title: `Repository Prep for ${projectName}`,
      task: () => {
        return new Listr([
          {
            title: 'checking git status',
            task: (ctx) => execa('git', ['status', '--porcelain'], { cwd: ctx.cwd }).then(result => {
              if (result !== '') {
                ctx.stash = true
                console.warn(`Stashing changes for ${projectName}`)
              }
            })
          },
          {
            title: 'stashing changes',
            enabled: ctx => ctx.stash === true,
            task: (ctx) => execa('git', ['stash'], { cwd: ctx.cwd })
          },
          {
            title: 'checking out master',
            task: (ctx) => execa('git', ['checkout', ctx.git.mainBranch], { cwd: ctx.cwd })
          },
          {
            title: 'pulling remote changes',
            task: (ctx) => execa('git', ['pull'], { cwd: ctx.cwd })
          },
          {
            title: 'creating local branch',
            task: (ctx) => execa('git', ['checkout', '-b', ctx.git.newBranch], { cwd: ctx.cwd })
          }
        ])
      }
    },
    {
      title: `Execute User Commands Against ${projectName}`,
      task: (ctx) => {
        return new Listr(generateUserTasks(ctx.commands, { cwd: ctx.cwd }))
      }
    },
    {
      title: 'Test Changes',
      task: (ctx) => {
        if (ctx.testCommand) {
          return execa(generateExecaParams(ctx.testCommand, { cwd: ctx.cwd }))
        } else {
          return execa('npm', ['test'], { cwd: ctx.cwd })
        }
      }
    },
    {
      title: 'Push Changes to remote',
      task: (ctx) => {
        return new Listr([
          {
            title: 'Commit changes',
            task: (ctx) => execa('git', ['commit', '-am', ctx.git.commitMessage], { cwd: ctx.cwd })
          },
          {
            title: 'Push changes to remote',
            task: (ctx) => execa('git', ['push', '-u', ctx.git.remote, ctx.git.newBranch], { cwd: ctx.cwd })
          }
        ])
      }
    }
  ])
}
