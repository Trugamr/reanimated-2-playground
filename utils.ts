export const randomNumber = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max - min))
}
