
export default {
    install(Vue, pluginOptions = {}){
        var isfinsh=true; //用来表示当前加载状态
        Vue.directive("listmore",{
            //  bind: 只调用一次，当指令第一次被绑定到元素时调用。
            //  inserte: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
            //  update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
            //  componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
            //  unbind: 只调用一次，指令与元素解绑时调用。
            bind(el,binding){
                let OList = binding;
                var startPageY, endPageY;
                var go;
                function touchstart(){
                    startPageY = event.targetTouches[0].pageY;
                }
                function touchmove(){
                    var elementClientRect = el.getBoundingClientRect();
                    var top = elementClientRect.top; //元素顶端到可见区域顶端的距离
                    var readyHeight = elementClientRect.height*0.725;
                    var se = document.documentElement.clientHeight; //浏览器可见区域高度。
                    var visitHeight = se - top ;
                    if(visitHeight>=readyHeight) {
                        go=true;
                    }else{
                        go=false;
                    }
                }
                function touchend(){
                    endPageY = event.changedTouches[0].pageY;
                        if(isfinsh&&go && startPageY-endPageY>100){
                            OList.value.more()
                            go=false
                            isfinsh=false
                        }
                }
                $(document).on('touchstart', touchstart);
                $(document).on('touchmove', touchmove);
                $(document).on('touchend', touchend);
            },
            unbind(el,binding){
                $(document).unbind()
            },
            update(){
                isfinsh=true
            }

        })
        // Vue.$watch(function () {
        //         console.log(1111)
        // })
    },
}
