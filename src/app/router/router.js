import Vue from 'vue'
import VueRouter from 'vue-router'
import Page from "../plugins/page"
import Default404 from '../components/default/404.vue'
import ComponentsRouter from '../components/components'

Vue.use(VueRouter);


// 然后定义路由(routes)，components还可以是Vue.extend()创建的
let routes = [
    { path: '/', component: Default404,meta:{title:'页面404'} },
];
routes=routes.concat(ComponentsRouter);

let router=new VueRouter({
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    },
    beforeEach:function(to,from,next){
        // window.scrollTo(0,0);
    },
    afterEach:function () {
    }

});
router.afterEach(function (to, from) {
   Vue.page.setTitle(to.meta.title);
})

export default router;