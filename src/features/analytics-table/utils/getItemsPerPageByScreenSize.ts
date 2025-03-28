const getItemsPerPageByScreenSize = (screenWidth: number, screenHeight: number) => {
  if (screenWidth >= 2560 || screenHeight >= 2560) return 18
  if (screenWidth >= 1920 || screenHeight >= 1920) return 13
  if (screenWidth >= 1280) return 8
  if (screenWidth >= 768) return 7
  if (screenWidth >= 480) return 6
  return 4
}

export default getItemsPerPageByScreenSize
