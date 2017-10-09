
<template>
    <div class="<%= fileName %>">
        <%= fileName %>
    </div>
</template>

<script>

    export default {
        name: '<%= fileName %>',
        data() {
            return {
            }
        },
        created() {
            //页面创建完成后
            //自定义标题
            this.page.setTitle("<%= fileName %>");
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
    .<%= fileName %>{
        //页面样式

    }
</style>