import execa from 'execa'

export const stashChanges = {
  title: 'stashing changes',
  enabled: ctx => ctx.stash === true,
  task: (ctx) => execa('git', ['stash'], { cwd: ctx.cwd })
}
