import {get,post} from '../api_core'
import * as apiPath from '../api_path'

export function configList(params) {
    return get(apiPath.api.configList)(params);
}

export function addConfig(params) {
    return post(apiPath.api.addConfig)(params)()
}