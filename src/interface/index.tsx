export enum Menu {
  MAIN = 0,
  CREATE = 1,
  IMPORT = 2,
}

export enum ErrorType {
  DEFAULT = "DEFAULT",
  SUCCESS = "SUCCESS",
  IMPORT  = "IMPORT"
}

export interface AppStateType {
  menu: Menu,
  loading: ErrorType,
  message: string,
  alert: string,
}