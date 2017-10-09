<template>
    <div class="maintenance-cycle" >
        <section v-if=' maintenanceDatalist.length!=0'>
            <div class='mask flex font-15' v-show='  isfirst'>
                <i class='iconfont icon-guanbi' @click='tipIsShow()'></i>
            </div>
            <div v-show='!isfirst'>
                <nav class='flex font-12 color-gray-2' v-bind:class="{ active: currentType=='yuanchang' }">
                    <div class='nav-item' v-bind:class="{ 'active-color': currentType=='baoyang' }"
                         @click='changeType("baoyang")'>保养计划周期</div>
                    <div class='nav-item' v-bind:class="{ 'active-color': currentType=='yuanchang' }"
                         @click='changeType("yuanchang")'>原厂配件参数</div>
                </nav>
                <section class='baoyang' v-show='currentType=="baoyang"'>
                    <div class='title color-gray-2 font-13'>
                        <div class='left flex'>保养计划</div>
                        <div class='right'>
                            <div class='fixbox' >
                                <div class='term-right-top font-11 ' >
                                    <div class='status' v-for='item in maintenanceDatalist.header'>
                                        <!--<p class='month color-gray2'>6个月</p>-->
                                        <p class='color-gray9' v-text='item+"KM"'>5000KM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='term flex'>
                        <div class='term-left flex'>
                            <div class='term-left-item color-gray-2'>
                                <div class='status flex font-12' v-for='item in maintenanceDatalist.data'>
                                    <div v-text='item.name' >小保养服务</div>
                                </div>
                            </div>
                        </div>
                        <div class='term-right'>
                            <div class='term-right-item' v-for='item in maintenanceDatalist.data'>
                                <div class='status flex' v-for='child in maintenanceDatalist.header'>
                                    <div class='radio' :class="{'cantRadio':item.state==2}" v-show='child==item.value'
                                         @click='item.state==1?goOtherRecommend(item):""'></div>
                                </div>
                            </div>
                        </div>

                    </div>


                </section>
                <section class='ycpj flex' v-show='currentType=="yuanchang"'>
                    <div class='title color-gray9 font-11 flex'>
                        <div class='left flex'>保养计划</div>
                        <div class='right'>
                            <div class='fixbox'>
                                <div class='term-right-top font-11 '>
                                    <div class='status'>
                                        <p class='color-gray9'>规格型号</p>
                                    </div>
                                    <div class='status'>
                                        <p class='color-gray9'>参考用量</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='term flex'>
                        <div class='item' v-for='item in rawDatalist'>
                            <div class='term-left flex'>

                                    <div class='status flex font-12 color-gray-2'>
                                        <div v-text='item.type'>机油</div>
                                    </div>

                            </div>
                            <div class='term-right'>
                                <div class='term-right-item font-13'>
                                    <div class='status flex' v-text='item.rule'>
                                        10W-40
                                    </div>
                                    <div class='status flex' v-text='item.filling?item.filling:"-"'>
                                        4.0
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>
                <footer class='font-11 flex'>
                    <p>此数据仅供参考，请以原厂保养手册为准。</p>
                    <div class='feedback' @click='feedback()'>
                        <i class='iconfont icon-woshenpideline_ font-13'></i>
                        <span class='font-11'>我要反馈</span>
                    </div>
                </footer>
            </div >
        </section>
        <default-page v-show='loadData && maintenanceDatalist.length==0'></default-page>
    </div>
</template>

<script>
    import api from "../../../api/maintenance-api";
    export default {

        name: 'maintenance-cycle',
        data() {
            return {
                currentType:'baoyang',
                tipshow:true,
                maintenanceDatalist:'',
                rawDatalist:'',
                loadData:false,
                isfirst:true
            }
        },
        created() {
            //页面创建完成后
            //自定义标题
            this.page.setTitle("保养周期");
            var self=this
            self.currentType=1
            if(self.$router.currentRoute.query.levelId){
                self.levelId=self.$router.currentRoute.query.levelId
                self.changeType('baoyang')
            }
            this.getData()
            console.log(sessionStorage.getItem("isfirst")+'zzz')
            if(!sessionStorage.getItem("isfirst")){
                sessionStorage.setItem("isfirst", true);
            }else{
                this.isfirst=false
            }
        },
        watch: {
            //监听动态路由
        },
        methods: {
            //页面方法
            getData(){
                var self=this
                var loading=self.$loading;
                loading.show('加载中...')
                    api.maintenanceCycle({
                        levelId  : self.levelId,
                    }).then((data) => {
                        if (data.result_code == 0) {
                            self.maintenanceDatalist = data.response;
                            self.loadData=true
                            self.scroll()
                            api.rawData({
                                levelId  : self.levelId,
                            }).then((data) => {
                                if (data.result_code == 0) {
                                    self.rawDatalist = data.response.list;
                                    self.loadData=true
                                    self.scroll()
                                } else {
                                    self.$toast.show({
                                        showTime: 2,
                                        message: data.message,
                                        style: 'error'
                                    });
                                }
                                loading.hide()
                            });
                        } else {
                            self.$toast.show({
                                showTime: 2,
                                message: data.message,
                                style: 'error'
                            });
                        }
                    });

            },
            changeType (type) {
                var self=this
                self.currentType=type;
            },
            //其他保养项目推荐
            goOtherRecommend(item){
                this.$router.push({path:'/maintenance/maintenance-other-recommend',query: {id:item.id}});
            },
            //反馈
            feedback(){
                this.$router.push({path:'/maintenance/maintenance-feedback',query: {id:"1"}});
            },
            scroll(){
                setTimeout(function () {
                    console.log($('.term-right').eq(0).innerWidth()+'1111')
                    $('.baoyang .right').width($('.term-right').eq(0).innerWidth())
                    $(".fixbox").eq(0).scroll(function(){
                        $(".term-right").eq(0).scrollLeft($(this).scrollLeft()); // 横向滚动条
                        console.log($(this).scrollLeft())
                    });
                    $(".fixbox").eq(1).scroll(function(){
                        $(".term-right").eq(1).scrollLeft($(this).scrollLeft()); // 横向滚动条
                        console.log($(this).scrollLeft())
                    });
                    $(".term-right").eq(0).scroll(function(){
                        $(".fixbox").eq(0).scrollLeft($(this).scrollLeft());
                    });
                    $(".term-right").eq(1).scroll(function(){
                        $(".fixbox").eq(1).scrollLeft($(this).scrollLeft());
                    });
                })
            },
            tipIsShow(){
                var self=this;
                self.tipshow=!self.tipshow
                self.isfirst=false
                this.scroll()
            },
    },
        components: {},
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper;
            }
        },
        mounted() {

//            this.$refs.mySwiper.swiper.params.control = this.$refs.mySwiper1.swiper
//            this.$refs.mySwiper1.swiper.params.control = this.$refs.mySwiper.swiper;

            //console.log(this.$refs.mySwiperA.swiper.params.control)
            //this.$refs.mySwiper1.swiper.params.control=this.$refs.mySwiper3.swiper
        }
    }


</script>

<style lang="less" scoped>
    @import "./../../../../css/page/maintenance/cycle";
</style>