
<template>
    <div class="demo">
        <div class="title text-center">相关dome演示</div>
        <div class="form-template">
            <div class="form-cells">
                <div class="form-cell" v-for="item in pageList" v-on:click="goPage(item.url)">
                    <div class="form-cell-title" v-text="item.name">
                        标题
                    </div>
                    <div class="form-cell-content form-control">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import url from './demo.js'

    export default {
        name: 'demo',
        data() {
            return {
                pageList:[]
            }
        },
        created() {
            //页面创建完成后
            //自定义标题
            let url1=url;
            console.log(url1);
            for (let i=0;i<url.length;i++){
                this.pageList.push({
                    url:url[i].path,
                    name:url[i].meta.title
                })
            }
            this.page.setTitle("demo");
        },
        watch: {
            //监听动态路由
        },
        methods: {
            //页面方法
            goPage(url){
                this.$router.push({path:url,query: {id:"111"}});
            }
        },
        components:{
        }
    }
</script>

<style lang="less" scoped>
    .demo{
        //页面样式
        .title{
            height: 80/100rem;
            line-height: 80/100rem;
        }
    }
</style>