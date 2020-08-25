import { generateExecaParams, generateUserExecaCommands } from './utils'

const execa = require('execa')
const Listr = require('listr')

export const generateTasks = ({ mainBranch = 'master' }) => {
  return new Listr([
    {
      title: 'Repository Prep',
      task: () => {
        return new Listr([
          {
            title: 'checking git status',
            task: (ctx) => execa.stdout('git', ['status', '--porcelain']).then(result => {
              if (result !== '') {
                ctx.stash = true
              }
            })
          },
          {
            title: 'stashing changes',
            enabled: ctx => ctx.stash === true,
            task: () => execa.stdout('git', ['stash'])
          },
          {
            title: 'checking out master',
            task: (ctx) => execa.stdout('git', ['checkout', ctx.git.mainBranch])
          },
          {
            title: 'pulling remote changes',
            task: () => execa.stdout('git', ['pull'])
          },
          {
            title: 'creating local branch',
            task: (ctx) => execa.stdout('git', ['checkout', '-b', ctx.git.newBranch])
          }
        ])
      }
    },
    {
      title: 'User commands',
      task: (ctx) => {
        return new Listr(generateUserCommands(ctx.userCommands))
      }
    },
    {
      title: 'Test Changes',
      task: (ctx) => {
        if (ctx.testCommand) {
          return execa.stdout(generateExecaParams(ctx.testCommand))
        } else {
          return execa.stdout('npm', ['test'])
        }
      }
    },
    {
      title: 'Push Changes to remote',
      task: () => {
        return new Listr([
          {
            title: 'Commit changes',
            task: (ctx) => execa.stdout('git', ['commit', '-am', ctx.git.commitMessage])
          },
          {
            title: 'Push changes to remote',
            task: (ctx) => execa.stdout('git', ['push', '-u', ctx.git.remote, ctx.git.newBranch])
          }
        ])
      }
    }
  ])
}

const generateUserCommands = userCommands => {
  generateUserExecaCommands(userCommands).map(execaCommand => {
    return {
      title: execaCommand.title,
      task: () => execa.stdout(...execaCommand.execaCommandParams)
    }
  })
}
