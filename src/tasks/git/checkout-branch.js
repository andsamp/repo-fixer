import execa from 'execa'

export const checkoutMainBranch = {
  title: 'checking out main branch',
  task: (ctx) => execa('git', ['checkout', ctx.git.mainBranch], { cwd: ctx.cwd })
}

export const checkoutDestinationBranch = {
  title: 'checking out destination branch',
  task: (ctx) => execa('git', ['checkout', ctx.git.destinationBranch], { cwd: ctx.cwd })
}
