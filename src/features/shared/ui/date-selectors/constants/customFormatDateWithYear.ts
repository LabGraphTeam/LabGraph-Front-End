const customFormatDateWithYear = (dataString: string | number | Date): string => {
  const dateObj = new Date(dataString)
  const year = dateObj.getFullYear().toString().padStart(4, '0')
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const day = dateObj.getDate().toString().padStart(2, '0')
  const hour = dateObj.getHours().toString().padStart(2, '0')
  const minutes = dateObj.getMinutes().toString().padStart(2, '0')

  return `${day}/${month}/${year} ${hour}:${minutes}`
}

export default customFormatDateWithYear
