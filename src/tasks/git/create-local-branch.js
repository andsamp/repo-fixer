import execa from 'execa'

export const createLocalBranch = {
  title: 'creating local branch',
  task: (ctx) => execa('git', ['checkout', '-b', ctx.git.destinationBranch], { cwd: ctx.cwd })
}
