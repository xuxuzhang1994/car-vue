
<template>
    <div class="demo-pagelist">
        <ul class="example-list-item" v-for="(item,index) in list.dataList">
            <li>这是一段文字{{index+1}}</li>
        </ul>
        <div v-listmore="list">
            <p v-if='list.hasMore'>加载更多</p>
            <p v-if='!list.hasMore'>没有更多内容</p>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'demo-pagelist',
        data() {
            return {
                params:{
                    limit:10,
                    page:1,
                },
                data:{
                    list:[],
                    total:''
                },
                list:{},
            }
        },
        created() {
            //页面创建完成后
            //自定义标题
            this.page.setTitle("demo-pagelist");
            let loading=this.$loading
            //定义一个list，第一个参数定义list的id用来判断是否已经存在这个list，第二个参数用来给list传每次加载的数据
            this.list=this.$list('x',function () {
                //异步加载数据
                return new Promise((resolve) => {
                    loading.show();
                    setTimeout(function () {
                        resolve({
                            total: '22',
                            list: [{x:'111111'},{x:'22222'}]
                        })
                        loading.hide();
                    },2000)
                })
            });
            // 初始化list，参数会赋值给list.listParams，
            // @page：加载第几页
            this.list.init(
                {
                    limit: 10,
                    page: 1
                }
            );
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
    .demo-pagelist{
        //页面样式

    }
</style>