export const generateUserExecaCommands = (userCommands, options) => {
  return userCommands.map(userCommand => {
    return { title: userCommand, execaCommandParams: generateExecaParams(userCommand, options) }
  })
}

export const generateExecaParams = (commandString, options) => {
  const userCommandArray = commandString.split(' ')
  return [userCommandArray[0], userCommandArray.slice(1), options]
}
