
<template>
    <div class="demo-img-upload">
        demo-img-upload  点击预览

        <div class='imgbox' v-for="(item,index) in imglist">
            <img :src="item.atAttachment" alt="" @click='previewimg(item.atAttachment)'>
            <button @click='delimg(index)'>删除图片</button>
        </div>
        <p @click='upload()'>上传图片</p>
    </div>
</template>

<script>

    export default {
        name: 'demo-img-upload',
        data() {
            return {
                imglist:[{'atAttachment':'http://img95.699pic.com/photo/50004/2199.jpg_wh300.jpg'}]
            }
        },
        created() {
            //页面创建完成后
            //自定义标题
            this.page.setTitle("demo-img-upload");
        },
        watch: {
            //监听动态路由
        },
        methods: {
            //页面方法
            upload(){
                var self=this;
                let loading=this.$loading
                var res=self.uploade({
                    count: 6-this.imglist.length, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                })
                res.then(function (data) {
                    //self.imglist=self.imglist.concat(data);
                    console.log(data)
                    //alert(self.imglist)
                    loading.hide()
                })
                res.catch(function (err) {
                    loading.hide()
                    console.log(err)
                })
            },
            previewimg(atAttachment){
                debugger
                var imglist=this.imglist
                var urlList=[];
                for (var i in imglist){
                    urlList.push(imglist[i].atAttachment)
                }
                this.imgpreview(atAttachment,urlList)
            },
            delimg(index){
                var self=this;
                console.log(index)
                self.imglist.splice(index,1)
            }
        },
        components:{
        }
    }
</script>

<style lang="less" scoped>
    .demo-img-upload{
        //页面样式
        p{
            width: 100%;
            height: 80/100rem;
            background: orange;
            margin-top: 20/100rem;
            align-items: center;
            color: #fff;
            border-radius: 100px;
            text-align: center;
            display: flex;
            justify-content: center;
        }
        .imgbox{
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            img{
                width: 2rem;
                height: auto;
            }
        }
    }
</style>