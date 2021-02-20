import { GIT_MODE_CREATE, GIT_MODE_UPDATE, VALID_GIT_MODES } from './constants'

export const validateArray = (config, key, emptyAllowed = false) => {
  const validationErrors = []

  if (!config[key]) {
    validationErrors.push(`${key} not specified`)
  } else if (!Array.isArray(config[key])) {
    validationErrors.push(`${key} is NOT an array`)
  } else if (!emptyAllowed && config[key].length === 0) {
    validationErrors.push(`${key} is an empty array`)
  }

  return validationErrors
}

export const validateExists = (config, key) => {
  if (!config[key]) {
    return [`${key} not specified`]
  }

  return []
}

export const validateGitConfig = (gitConfig) => {
  console.log('gitConfig')
  const configValidationErrors = []

  if (!gitConfig.mode) {
    configValidationErrors.push('git.mode not specified')
  } else if (!VALID_GIT_MODES.includes(gitConfig.mode)) {
    configValidationErrors.push(`git.mode is invalid(allowed values: ${JSON.stringify(VALID_GIT_MODES)}`)
  }

  if ([GIT_MODE_CREATE, GIT_MODE_UPDATE].includes(gitConfig.mode)) {
    if (!gitConfig.remote) configValidationErrors.push('git.remote not specified')
    if (!gitConfig.destinationBranch) configValidationErrors.push('git.destinationBranch not specified')
    if (!gitConfig.commitMessage) configValidationErrors.push('git.commitMessage not specified')
  }

  if (GIT_MODE_CREATE === gitConfig.mode) {
    if (!gitConfig.mainBranch) configValidationErrors.push('git.mainBranch not specified')
  }

  configValidationErrors.push(...validateArray(gitConfig, 'commitFlags', true))
  configValidationErrors.push(...validateArray(gitConfig, 'pushFlags', true))

  return configValidationErrors
}
