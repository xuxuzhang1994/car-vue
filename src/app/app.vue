<template>
    <transition>
        <router-view></router-view>
    </transition>
</template>

<script>

    export default {
        name: '',
        data() {
            return {
                transitionName: 'slide-out'
            }
        },
        created() {
            //页面创建完成后
        },
        watch: {
            //监听动态路由
            '$route' (to, from) {
            }
        },
        methods: {
            //页面方法
        },
        components:{
        }
    }
</script>

<style lang="less" scoped>

</style>