import execa from 'execa'

export const pushToRemote = {
  title: 'push changes to remote',
  task: (ctx) => execa('git', ['push', '-u', ctx.git.remote, ctx.git.destinationBranch, ...ctx.git.pushFlags], { cwd: ctx.cwd })
}
