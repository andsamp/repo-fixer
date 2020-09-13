import { DEFAULT_CONFIG, VALID_GIT_MODES } from './utils/constants'
import { defaultsDeep } from 'lodash'
import { isValidDirectoryPath, isValidFilePath } from './utils/file'
import { validateArray, validateExists } from './utils/config-validation'

const fs = require('fs')
const path = require('path')

export const generateConfig = (configFile) => {
  if (isValidFilePath(configFile)) {
    const userConfig = JSON.parse(fs.readFileSync(configFile))
    const config = defaultsDeep(userConfig, DEFAULT_CONFIG)

    validateConfig(config)

    config.absoluteBaseDirectory = path.resolve(config.baseDirectory)

    return config
  } else {
    throw new Error(`Specified config file(${configFile}) is not valid`)
  }
}

export const validateConfig = (config) => {
  const configValidationErrors = []

  if (!config.baseDirectory) {
    configValidationErrors.push('baseDirectory not specified')
  } else if (isValidDirectoryPath(config.baseDirectory)) {
    configValidationErrors.push('baseDirectory is not a valid directory')
  }

  if (!config.git.mode) {
    configValidationErrors.push('git.mode not specified')
  } else if (!VALID_GIT_MODES.includes(config.git.mode)) {
    configValidationErrors.push(`git.mode is invalid(allowed values: ${JSON.stringify(VALID_GIT_MODES)}`)
  }
  if (!config.git.mainBranch) configValidationErrors.push('git.mainBranch not specified')
  if (!config.git.remote) configValidationErrors.push('git.remote not specified')
  if (!config.git.destinationBranch) configValidationErrors.push('git.destinationBranch not specified')
  if (!config.git.commitMessage) configValidationErrors.push('git.commitMessage not specified')

  configValidationErrors.push(...validateArray(config, 'projects'))
  configValidationErrors.push(...validateArray(config, 'commands'))

  configValidationErrors.push(...validateExists(config, 'installCommand'))

  if (configValidationErrors.length > 0) {
    throw new Error(`Invalid Configuration: ${JSON.stringify(configValidationErrors)}`)
  }
}
