export const DEFAULT_CONFIG = {
  baseDirectory: '.',
  git: {
    mainBranch: 'master',
    remote: 'origin',
    stashLocalChanges: true
  },
  installCommand: 'npm ci',
  testCommand: 'npm t'
}
