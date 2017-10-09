
import Toast from './toast.vue'



export default {
    /**
     * 每个插件都有的install方法，用于安装插件
     * @param {Object} Vue - Vue类
     * @param {Object} [pluginOptions] - 插件安装配置
     */
    install(Vue, pluginOptions = {}) {
        // 创建"子类"方便挂载
        const VueToast = Vue.extend(Toast)
        let toast = null
        let $toast={};
        /**
         * 初始化并显示loading
         * @returns {Promise} Promise实例
         */
        var isShow = false;                 // 标记当前是否显示
        var currentTime = 0;                // 消息显示时间技术
        $toast.show= function(config) {
            return new Promise((resolve) => {
                var message = config.message;

                var time = config.showTime;
                currentTime = time;
                var style = config.style ? config.style : ''
                if (style == 'error') {
                    config.style = 'v-toast-error'
                } else if (style == 'success') {
                    config.style = 'v-toast-success'
                } else if (style == 'lost') {
                    config.style = 'v-toast-lost'
                }
                // 第一次调用
                if (!toast) {
                    toast = new VueToast()
                    // 手动创建一个未挂载的实例
                    toast.$mount()
                    // 挂载
                    document.querySelector(pluginOptions.container || 'body').appendChild(toast.$el)
                }
                // 显示loading
                toast.show(config)
                if(!isShow) {
                    isShow = true;
                    clock();
                }
                resolve()
            })
        }
        /**
         * 消息倒计时
         */
        function clock() {
            currentTime--;
            if(currentTime<=0) {
                $toast.hide();
            } else {
                setTimeout(clock,1000);
            }
        }
        /**
         * 隐藏消息
         */
        $toast.hide = function() {
            isShow = false;
            currentTime = 0;
            toast.hide()
        };
        Vue.toast = Vue.prototype.$toast = $toast
    },

}
