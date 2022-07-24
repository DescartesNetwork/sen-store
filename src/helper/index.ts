export const shortenString = (str: string, limit = 18, delimiter = '...') => {
  if (str.length < limit) return str
  return str.substring(0, limit) + delimiter
}
