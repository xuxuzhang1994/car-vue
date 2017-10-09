<template>
    <div class="default-page">
        <div>
            <div class="img">
                <img src="../../../images/default/vcy_pic_wuneirong.png">
            </div>
            <div class="message">
                <div class="title">暂无内容</div>
                <div class="tip">当前列表暂无数据</div>
                <div class="tip" >The current list has no data</div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .default-page{
        position: absolute;
        text-align: center;
        top:2.1rem;
        width: 100%;
        line-height: 1;
        .img{
            height: 160/100rem;
            text-align: center;
            img{
                height: 100%;
            }
            .iconfont{
                font-size: 80/100rem;
                color: #80d439;
            }
        }
        .message{
            margin-top: 40/100rem;
            text-align: center;
            font-size: 36/100rem;
            color: #222222;
            padding: 0 80/100rem;
            .title{
                font-size: 32/100rem;
                color: #555555;
            }
            .tip{
                margin-top: 14/100rem;
                font-size: 24/100rem;
                color: #555555;
            }
        }

    }
</style>
<script>
    export default {
        data() {
            return {
                isShow: false,
            }
        },
        computed: {
        },
        methods: {

        },
    }

</script>