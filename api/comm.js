import { post, get } from './http.js';

export function upload(params){
	return post('/comm/uploadimage',params)
}