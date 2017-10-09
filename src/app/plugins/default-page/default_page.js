import DefaultPage from './default_page.vue'

//export default {
//     install(Vue, pluginOptions = {}){
//         const x = Vue.extend(DefaultPage)
//         Vue.component("default-page",{
//             'template':x
//         })
//     }
//}
const x={
    install:function (Vue) {
        Vue.component('default-page',DefaultPage)
    }
}
export default x