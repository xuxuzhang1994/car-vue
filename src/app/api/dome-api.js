
import http from './http'

export default {

    login(params){
        return http.get("xacy/Common/Api/Debug/Login/SetCookie",params);
    },
    jsLogin(params){
        return http.get(url,params);
    },
    zjy(params){
        return http.post('https://dhr-shell.vchangyi.com/xacy/Hsse/Api/Look/List',params);
    }
}