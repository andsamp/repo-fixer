import { DEFAULT_CONFIG } from './utils/constants'
import { defaultsDeep } from 'lodash'
import { isValidDirectoryPath, isValidFilePath } from './utils/file'
import { validateArray, validateExists, validateGitConfig } from './utils/config-validation'

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

  configValidationErrors.push(...validateGitConfig(config.git))

  configValidationErrors.push(...validateArray(config, 'projects'))
  configValidationErrors.push(...validateArray(config, 'commands'))

  configValidationErrors.push(...validateExists(config, 'installCommand'))

  if (configValidationErrors.length > 0) {
    throw new Error(`Invalid Configuration: ${JSON.stringify(configValidationErrors)}`)
  }
}
