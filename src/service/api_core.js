import {baseUrl} from './api_path'


export function get(urlPath) {
    return param => fetch(buildParams(baseUrl + urlPath, param), {
        headers: {}
    })
}

export function post(urlPath) {
    return formParams => {
        const formData = new FormData();
        Object.entries(formParams).forEach(([k, v]) => {
            formData.append(k, v);
        });
        return urlParams => {
            return fetch(buildParams(baseUrl + urlPath, urlParams), {
                headers: {},
                method: 'POST',
                body: formData,
            });
        }
    }
}

function buildParams(url, params = {}) {
    let newUrl = new URL(url);
    if (typeof params === 'object') {
        Object.keys(params).forEach(key => {
            newUrl.searchParams.append(key, params[key]);
        });
        return newUrl.toString();
    } else {
        return url.endsWith("/") ? url + params : url + "/" + params;
    }
}