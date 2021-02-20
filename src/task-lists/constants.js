import { GIT_MODE_CREATE, GIT_MODE_UPDATE } from '../utils/constants'
import { stashChanges } from '../tasks/git/stash-changes'
import { checkoutDestinationBranch, checkoutMainBranch } from '../tasks/git/checkout-branch'
import { pull } from '../tasks/git/pull'
import { createLocalBranch } from '../tasks/git/create-local-branch'
import { checkGitStatus } from '../tasks/git/check-git-status'

export const REPO_PREP_TASKS = {
  [GIT_MODE_CREATE]: [
    checkGitStatus,
    stashChanges,
    checkoutMainBranch,
    pull,
    createLocalBranch
  ],
  [GIT_MODE_UPDATE]: [
    checkGitStatus,
    stashChanges,
    checkoutDestinationBranch,
    pull
  ]
}
