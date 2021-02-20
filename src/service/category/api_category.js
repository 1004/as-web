import {get,post} from '../api_core'
import * as apiPath from '../api_path'

export function categoryList(params) {
    return get(apiPath.api.categoryList)(params);
}

export function addCategoryName(params) {
    return post(apiPath.api.addCategory)(params)();
}

export function deleteCategory(params) {
    return get(apiPath.api.deleteCategory)(params);
}