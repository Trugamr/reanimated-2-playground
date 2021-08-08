export const randomNumber = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max - min))
}

export const getKeys = Object.keys as <T extends object>(
  obj: T,
) => Array<keyof T>
