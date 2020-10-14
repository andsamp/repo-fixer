export const GIT_MODE_CREATE = 'create-branch'
export const GIT_MODE_UPDATE = 'update-branch'
export const GIT_MODE_SKIP = 'skip'

export const VALID_GIT_MODES = [GIT_MODE_CREATE, GIT_MODE_UPDATE, GIT_MODE_SKIP]

export const DEFAULT_CONFIG = {
  baseDirectory: '.',
  git: {
    mode: GIT_MODE_CREATE,
    mainBranch: 'master',
    remote: 'origin',
    stashLocalChanges: true,
    commitFlags: [],
    pushFlags: []
  },
  installCommand: 'npm ci'
}
