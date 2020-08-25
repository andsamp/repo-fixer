export const generateUserExecaCommands = userCommands => {
  return userCommands.map(userCommand => {
    const userCommandArray = userCommand.split(' ')
    return { title: userCommand, execaCommandParams: [userCommandArray[0], userCommandArray.slice(1)] }
  })
}
