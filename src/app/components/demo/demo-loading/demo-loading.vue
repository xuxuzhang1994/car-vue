
<template>
    <div class="demo-loading">
        <div v-on:click="loadingClick" >点击加载3秒后消失</div>
    </div>
</template>

<script>

    export default {
        name: 'demo-loading',
        data() {
            return {
            }
        },
        created() {
            //页面创建完成后
            //自定义标题
            this.page.setTitle("演示加载中");
        },
        watch: {
            //监听动态路由
        },
        methods: {
            //页面方法
            loadingClick(){
                let loading=this.$loading
                loading.show();

                setTimeout(function () {
                    loading.hide();
                },3000)
            }
        },
        components:{
        }
    }
</script>

<style lang="less" scoped>
    .demo-loading{
        //页面样式
        height: 100%;
    }
</style>