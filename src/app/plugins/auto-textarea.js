
export default {
    install(Vue, pluginOptions = {}){

        Vue.directive("autoheight",{
            //  bind: 只调用一次，当指令第一次被绑定到元素时调用。
            //  inserte: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
            //  update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
            //  componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
            //  unbind: 只调用一次，指令与元素解绑时调用。
            bind(el,binding){
                setTimeout(function () {
                    var u = navigator.userAgent
                    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                    if(isiOS){
                        $(el).css('marginLeft','-0.02rem')
                    }
                    $('body').append("<div class='hidebox'></div>")
                    $('.hidebox').css('wordBreak','break-all')
                    $('.hidebox').hide()
                    $('.hidebox').css('background','red')
                    var fontSize = $(el).css('font-size')
                    var fontStyle = $(el).css('font-family')
                    var lineHeight = $(el).css('line-height')
                    $(el).css('maxHeight','1.35rem')
                    $(el).css('overflow','auto')
                    console.log($(el).width())
                    $('.hidebox').width( $(el).width())
                    $('.hidebox').css('fontSize',fontSize)
                    $('.hidebox').css('fontFamily',fontStyle)
                    $('.hidebox').css('lineHeight',lineHeight)
                    $('.hidebox').css('paddingLeft','0.05rem')
                })
                el.oninput=function () {
                    if(el.value){
                        $('.hidebox').text(el.value)
                        $(this).height($('.hidebox').height())
                        console.log($(this).height())
                    }
                }
            },
            update(el,binding,vnode){

            },
        })
    },


}