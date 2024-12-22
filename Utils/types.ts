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
