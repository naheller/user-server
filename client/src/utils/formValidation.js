export const getNameErrors = (name) => {
  const errors = []
  if (!name) errors.push('Name required')
  return errors
}

export const getPasswordErrors = (password) => {
  const errors = []
  if (!password) errors.push('Password required')
  return errors
}
