
<template>

    <div class="news-list" >
        <div class="example-list-item" v-for="item in list2.dataList">
            <p>这是</p>
            <p>一段</p>
            <p>文字</p>
        </div>
        <div v-on:click="loadingClick" >点击加载3秒后消失</div>
        2222
        <p>
            <button class='dialog-btn-box' @click='upload()'>点击上传图片</button>
        </p>
            <div v-for="item in imglist">
                    <img :src="item.atAttachment" alt="">
            </div>
        <div v-listmore="list2">
            <p v-if='list2.hasMore'>加载更多</p>
            <p v-if='!list2.hasMore'>没有更多内容</p>
        </div>
        <!--<uploader :src="'/api/imgs'"></uploader>-->
        <p>
            <button @click='previewimg()'>预览图片</button>
        </p>
    </div>

</template>

<script>
    export default {

        //name: 'news-    list',
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
                list:[],
                list2:{},
                config:{
                    url:'post',
                    size:'10'
                },
                imglist:[]
            }
        },
        created() {
            //页面创建完成后
            let loading=this.$loading

            this.list2=this.$list('x',function () {
                 return new Promise((resolve) => {
                     loading.show();
                     setTimeout(function () {
                         resolve({
                             total: '22',
                             list: ['111111','22222']
                         })
                         loading.hide();
                     },2000)
                })
            });
            this.list2.init(
                {
                    _identifier:1,
                    cmtObjid:2,
                    limit: 10,
                    page: 1
                }
            );

        },
        watch: {
            //监听动态路由
        },
        mounted() {
        },
        methods: {
            upload(){
                let loading=this.$loading
                var self=this;
                var res=self.uploade({
                    count: 3, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                })
                res.then(function (data) {
                    self.imglist=data;
                    loading.hide()
                })
                res.catch(function (err) {
                    loading.hide()
                    console.log(err)
                })
            },
            loadingClick(){
                let toast=this.$toast
                toast.show({
                    showTime: 2,
                    message: '分享成功',
                    style:'success'
                });
            },
            previewimg(){
                this.imgpreview()
            }
        },
        components:{
        }
    }
</script>

<style lang="less" scoped>
.news-list{
    img{
        width: 100px;
        height: 100px;
    }
}
</style>