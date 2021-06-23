export const getWaveForms = (size = 150) => {
  return Array(size).fill(null).map(() => Math.max(10, Math.floor(Math.random() * 100)))
}