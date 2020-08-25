export const generateUserExecaCommands = userCommands => {
  return userCommands.map(userCommand => {
    return { title: userCommand, execaCommandParams: generateExecaParams(userCommand) }
  })
}

export const generateExecaParams = (commandString) => {
  const userCommandArray = commandString.split(' ')
  return [userCommandArray[0], userCommandArray.slice(1)]
}
