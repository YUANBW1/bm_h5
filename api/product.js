
import {get,post} from './http.js';

 
export function productlist(params){
    return get('/noauth/product/list',params)
}
export function productinfo(params){
    return get('/noauth/product/info',params)
}


