

import {get,post} from './http.js';

 
export function creatorder(params){
    return post('/bmorder/create',params)
}
export function orderlist(params){
    return get('/bmorder/list',params)
}
