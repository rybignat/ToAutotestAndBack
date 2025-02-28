export interface NavigationBarStructure {
  [key: string]: string[]
}

export interface UserRegistration {
  firstName: string
  lastName: string
  email: string
  age: string
  salary: string
  department: string
}

export type rowsOptions = 5 | 10 | 20 | 25 | 50 | 100

type Hours =
  | `0${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `1${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `2${0 | 1 | 2 | 3}`

type Minutes = '00' | '15' | '30' | '45'

export type timeOptions = `${Hours}:${Minutes}`
