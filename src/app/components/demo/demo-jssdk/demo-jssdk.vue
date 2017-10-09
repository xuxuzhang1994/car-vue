
<template>
    <div class="demo-jssdk">
        <div class="form-template">
            <div class="form-cells">
                <div class="form-cell" v-on:click="onMenuShareTimeline">
                    分享朋友圈
                </div>
                <div class="form-cell" v-text="url">
                    分享朋友圈
                </div>
                <div class="form-cell" @click='upload'>
                    分享朋友圈
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'demo-jssdk',
        data() {
            return {
                url:"11"
            }
        },
        created() {
            //页面创建完成后
            //自定义标题
            this.page.setTitle("演示jssdk");
            var d=this.$route;
        },
        watch: {
            //监听动态路由
        },
        methods: {
            //页面方法
            onMenuShareTimeline(){
                this.wxsdk.onMenuShareTimeline({
                    title: '分享朋友圈标题', // 分享标题
                    link: '', // 分享链接，该链接域名必须与当前企业的可信域名一致
                    imgUrl: '', // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        alert(1)
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            },
            upload(){
                console.log(111)
                this.wxsdk.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        alert('图片选择成功')
                    }
                });
            },
        },
        components:{
        }
    }
</script>

<style lang="less" scoped>
    .demo-jssdk{
        //页面样式

    }
</style>