import {
  forEach,
  isString,
  isArray,
  isNil,
  isObject,
} from 'lodash'
import {
  IRequestInfo,
  IRequestInfoGroup,
  IRequestPathname,
  IKeyObject,
} from './type'

export const getRequestPathname = (
  pathname: string | IRequestPathname | string [],
): IRequestPathname => {
  let name, kind
  if(isString(pathname)){
    const [_name, _kind] = pathname.split('@')
    name = _name
    kind = _kind
  }else if(isArray(pathname)){
    const [_name, _kind] = pathname as string[]
    name = _name
    kind = _kind
  }else if(isObject(pathname)){
    name = pathname.name
    kind = pathname.kind
  }
  if(isString(name) && (isNil(kind) || isString(kind))){
    return {name, kind}
  }
  throw new Error(`[askto] pathname: ${pathname} is not a request path`)
}

export const getRequestInfo = (
  where: IRequestPathname,
  info:  IRequestInfoGroup,
  ): IRequestInfo => {
  const {kind, name} = where
  let myRequestInfo
  let currentInfo = info
  if(kind){
    const kindArray = kind.split('/')
    forEach(kindArray, (currentKind) => {
      if(!currentInfo || !currentInfo.group){
        throw new Error(`[askto] cannot find kind of group: ${kind}`)
      }
      currentInfo = currentInfo.group[currentKind]
    })
  }
  if(!currentInfo.requests){
    throw new Error(`[askto] cannot find request in kind of group: ${kind}`)
  }
  myRequestInfo = currentInfo.requests[name]
  if(!myRequestInfo){
    throw new Error(`[askto] cannot find name: ${name} in kind of group`)
  }
  return myRequestInfo
}

export const getPath = (requestInfo: IRequestInfo, pathParameters?: {[name: string]: any}) => {
  const {path} = requestInfo
  if(!path) {
    throw new Error(`[askto] requestInfo: ${requestInfo} has no path`)
  }
}

export const translateKeys = (keys: IKeyObject): IKeyObject => {
  return {}
}