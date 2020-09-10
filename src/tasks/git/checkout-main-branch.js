import execa from 'execa'

export const checkoutMainBranch = {
  title: 'checking out main branch',
  task: (ctx) => execa('git', ['checkout', ctx.git.mainBranch], { cwd: ctx.cwd })
}
