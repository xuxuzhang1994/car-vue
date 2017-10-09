
<template>
    <div class="demo-list">
        <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" class="my-scroller">
            <div v-for="item in items" class="item">
                <div v-if="item.type==='letter'" v-text="item.value"></div>
                <div v-if="item.type==='car'" v-text="item.value"></div>
            </div>
        </scroller>
    </div>
</template>

<script>

    export default {
        name: 'demo-list',
        data() {
            return {
                items: []
            }
        },
        mounted() {
            for (let i = 0; i <= 20; i++) {
                var item;
                if(i%7==0){
                    item={
                        type:"letter",
                        value:"A"
                    };
                }else {
                    item={
                        type:"car",
                        value:"奥迪"+i
                    };
                }

                this.items.push(item)
            }
            this.top = 1
            this.bottom = 20
        },
        created() {
            //页面创建完成后
            //自定义标题
            this.page.setTitle("演示list");
        },
        watch: {
            //监听动态路由
        },
        methods: {
            //页面方法
            refresh(done) {
                setTimeout(() => {
                    let start = this.top - 1
                    for (let i = start; i > start - 10; i--) {
                        var item;
                        if(i%7==0){
                            item={
                                type:"letter",
                                value:"A"
                            };
                        }else {
                            item={
                                type:"car",
                                value:"奥迪下拉"+i
                            };
                        }

                        this.items.splice(0, 0, item)
                    }
                    this.top = this.top - 10;
                    done()
                }, 1500)
            },
            infinite(done) {
                setTimeout(() => {
                    let start = this.bottom + 1
                    for (let i = start; i < start + 10; i++) {
                        var item;
                        if(i%7==0){
                            item={
                                type:"letter",
                                value:"A"
                            };
                        }else {
                            item={
                                type:"car",
                                value:"奥迪上拉"+i
                            };
                        }

                        this.items.push(item)
                    }
                    this.bottom = this.bottom + 10
                    done()
                }, 1500)
            },
        },
        components:{
        }
    }
</script>

<style lang="less" scoped>
    .demo-list{
        //页面样式
        .my-scroller .pull-to-refresh-layer .spinner-holder
        {
            visibility: hidden;
        }
        .my-scroller .pull-to-refresh-layer {
            background-image: url(http://qianka.b0.upaiyun.com/images/4f013b6bc7d96fc347f416ad3673f937.png);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 40px 40px;
            opacity: 0;
            -webkit-transform: scale(1);
            transform: scale(1);
            transition: all .15s linear;
            -webkit-transition: all .15s linear;
        }
        .my-scroller .pull-to-refresh-layer.active {
            -webkit-transform: scale(1.35);
            transform: scale(1.35);
            opacity: 1;
        }


        .item {
            height: 80/100rem;
            line-height: 80/100rem;
            padding-left: 20/100rem;
            border-bottom: 1px solid #eee;
        }
    }
</style>