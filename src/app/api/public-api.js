
import http from './http'

export default {
    //上传图片
    uploadImg(params){
        return http.post("common/attachment/uploadAtta",params);
    },

}