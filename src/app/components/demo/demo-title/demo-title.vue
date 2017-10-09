
<template>
    <div class="demo-title">
        demo-title
    </div>
</template>

<script>

    export default {
        name: 'demo-title',
        data() {
            return {
            }
        },
        created() {
            //页面创建完成后
            //自定义标题
            this.page.setTitle("演示标题");
        },
        watch: {
            //监听动态路由
        },
        methods: {
            //页面方法
        },
        components:{
        }
    }
</script>

<style lang="less" scoped>
    .demo-title{
        //页面样式

    }
</style>