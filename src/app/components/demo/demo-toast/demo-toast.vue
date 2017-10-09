
<template>
    <div class="demo-toast">
        demo-toast
        <div v-on:click="toastClick('success')" >点击出现提示2秒后消失(成功)</div>
        <div v-on:click="toastClick('error')" >点击出现提示2秒后消失(失败)</div>
        <div v-on:click="toastClick('lost')" >点击出现提示2秒后消失(丢失)</div>
    </div>
</template>

<script>

    export default {
        name: 'demo-toast',
        data() {
            return {
            }
        },
        created() {
            //页面创建完成后
            //自定义标题
            this.page.setTitle("demo-toast");
        },
        watch: {
            //监听动态路由
        },
        methods: {
            //页面方法
            toastClick(type){
                let toast=this.$toast
                toast.show({
                    showTime: 2,
                    message: '分享成功',
                    style:type
                });
            },
        },
        components:{
        }
    }
</script>

<style lang="less" scoped>
    .demo-toast{
        //页面样式

    }
</style>