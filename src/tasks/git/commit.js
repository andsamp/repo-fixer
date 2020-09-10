import execa from 'execa'

export const commit = {
  title: 'committing changes',
  task: (ctx) => execa('git', ['commit', '-am', ctx.git.commitMessage], { cwd: ctx.cwd })
}
