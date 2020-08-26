export const validateArray = (config, key) => {
  const validationErrors = []

  if (!config[key]) {
    validationErrors.push(`${key} not specified`)
  } else if (!Array.isArray(config[key])) {
    validationErrors.push(`${key} is NOT an array`)
  } else if (config.commands.length === 0) {
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
