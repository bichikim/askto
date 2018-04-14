export type TFunctionPath = (payload: {[name: string]: string}) => string | string []
export type TCallType = 'action' | 'mutation'
export type TPath = string | TFunctionPath | string[]
export type TMethod = 'GET' | 'SET' | 'PUT' | 'PATCH' | 'DELETE' | null // default = get
export type TMap = (data: any) => any

export interface IKeyObject {
  [name: string]: any
}

export interface IRequestInfo {
  success?: TCallType | TCallType[]
  failure?: TCallType | TCallType[]
  path: TPath
  method?: TMethod
  responseData?: TMap
  responseHeaders?: TMap
  request?: TMap
  error?: TMap
  headers?: TMap
}

export interface IRequestInfoGroup {
  basePath?: string
  group?: {[name: string]: IRequestInfoGroup}
  requests?: {
    [name: string]: IRequestInfo,
  },
}



export interface IRequestPathname {
  kind?: string
  name: string
}