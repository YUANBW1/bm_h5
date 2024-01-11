
import {get,post} from './http.js';

export function getuserinfo(params){
    return get('/user/getuserinfo',params)
}
export function login(params){
    return post('/noauth/user/login',params)
}
export function register(params){
    return post('/noauth/register',params)
}
