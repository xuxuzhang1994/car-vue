
export default {
    /**
     * 每个插件都有的install方法，用于安装插件
     * @param {Object} Vue - Vue类
     * @param {Object} [pluginOptions] - 插件安装配置
     */
    install(Vue, pluginOptions = {}) {

        var page={}

        page.setTitle = function (title) {
            document.title = title;
            let ua = navigator.userAgent;
            if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
                var i = document.createElement('iframe');
                i.src = '/favicon.ico';
                i.style.display = 'none';
                i.onload = () => {
                    setTimeout(() => {
                        i.remove();
                    }, 9);
                };
                document.body.appendChild(i);
            }
        };
       Vue.page=Vue.prototype.page=page;
    },

}
