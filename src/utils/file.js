const fs = require('fs')
const path = require('path')

export const isValidFilePath = filePath => {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile()
}

export const isValidDirectoryPath = filePath => {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile()
}

export const getAbsolutePath = (directory, project = '') => {
  const fullPath = `${directory}${path.sep}${project}`
  if (isValidFilePath(fullPath)) {
    return path.resolve(fullPath)
  } else {
    throw new Error(`Invalid path: ${fullPath}`)
  }
}
