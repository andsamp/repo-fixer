import execa from 'execa'

export const pull = {
  title: 'pulling remote changes',
  task: (ctx) => execa('git', ['pull'], { cwd: ctx.cwd })
}
