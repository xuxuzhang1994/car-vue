
import wxsdk from 'weixin-js-sdk';
export default {
    /**
     * 每个插件都有的install方法，用于安装插件
     * @param {Object} Vue - Vue类
     * @param {Object} [pluginOptions] - 插件安装配置
     */
    install(Vue, pluginOptions = {}) {
        let loading = Vue.loading;
        let wx = wxsdk;
        /*
        *  用来吊起微信选择图片
        *  resolve 选择的图片localIds数组
        * */
        var previewImg = function (current,list) {
            wx.previewImage({
                current: current, // 当前显示图片的http链接
                urls: list // 需要预览的图片http链接列表
            });
        }
        Vue.imgpreview = Vue.prototype.imgpreview = previewImg;
    }
}