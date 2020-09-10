import execa from 'execa'

export const checkGitStatus = {
  title: 'checking git status',
  task: (ctx) => execa('git', ['status', '--porcelain'], { cwd: ctx.cwd }).then(result => {
    if (result !== '') {
      ctx.stash = true
      console.warn(`Stashing changes for ${ctx.currentProjectName}`)
    }
  })
}
