export async function findKeyByValue<T> (obj: { [key: string]: T[] }, value: T): Promise<string | undefined> {
  for (const key in obj) {
    if (obj[key].includes(value)) {
      return key
    }
  }
  console.error(`${value} doesn't exist in ${obj}`)
  return undefined
}
