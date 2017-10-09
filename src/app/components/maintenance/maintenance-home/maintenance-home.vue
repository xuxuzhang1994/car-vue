<template>
    <transition>
        <div class="home" >

            <section v-show='loadData && brandList.length!=0' >
                <div class='mask' v-show='changeShow'></div>
                <header class='header flex' v-bind:class="{'filter':searchShow,'hide222':changeShow}">
                    <div class='searchBox flex'>
                        <i class='iconfont icon-csousuo font-13'></i>
                        <span class='font-13 color-gray9' @click='searchCar()'>请输入17位VIN码或车辆名称</span>
                        <i class='camera iconfont icon-xiangjiline_ font-13 color-gray9' @click='Photograph()'></i>
                    </div>
                    <div class='feedback' @click='feedback()'>
                        <i class='iconfont icon-woshenpideline_ font-16'></i>
                        <span class='font-9'>反馈</span>
                    </div>
                </header>
                <div class='main' v-bind:class="{'filter':searchShow,'hide222':changeShow}">
                    <div class='content p-t-9' >
                        <div class='hot'>
                            <div class='font-18 color-gray2 title'>
                                <span>热门品牌</span>
                            </div>
                            <div class='brand flex'>
                                <div class='column flex'>
                                    <div class='hot-brand' v-for="(item,index) in hotBrandList" v-if='index<5'>
                                        <div @click='choose(1,item)'>
                                            <div class='brand-logo'>
                                                <img v-bind:src="item.logo" alt="">
                                            </div>
                                            <div class='brand-name font-11 color-gray5' v-text='item.name'>宝马</div>
                                        </div>
                                    </div>
                                </div>
                                <div class='column flex'>
                                    <div class='hot-brand' v-for="(item,index) in hotBrandList" v-if='index>4'>
                                        <div @click='choose(1,item)'>
                                            <div class='brand-logo'>
                                                <img v-bind:src="item.logo" alt="">
                                            </div>
                                            <div class='brand-name font-10 color-gray5' v-text='item.name'>宝马</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='brand-list'>
                            <div class='brand-item' :id="'anchor-'+id" v-for='(item,id) in brandList'>
                                <div class='item-title'>
                                    <span class='font-16' v-text='item.initials'>A</span>
                                </div>
                                <div class='item-detail flex' v-for="(type,index) in item.data">
                                        <img v-bind:src="type.logo">
                                    <div class='name font-13 color-gray2'
                                         v-bind:class="{'last-no-bd':index==item.data.length-1}">
                                        <span v-text='type.name' @click='choose(1,type)'></span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class='nav-bar' v-show='!changeShow' v-bind:class="{'filter':searchShow,'hide222':changeShow}">
                    <div class='nav-item ' v-for='(item,index) in brandList'>
                        <div class='bubble font-20' v-text='item.initials'>A</div>
                        <div class='indexes font-9'  @click="goAnchor(index)">
                            <span v-text='item.initials' ></span>
                        </div>
                    </div>

                </div>
                <div class='changeTime' v-show='changeShow=="changBrand"'>
                    <div class='car-name font-11'>

                        <img :src="currentChoosed.logo" alt="">
                        <span class='color-gray5 text' v-text='currentChoosed.brand'>安驰</span>
                        <i class='close iconfont icon-guanbi font-10 color-grayC' @click='cancelChoose()'></i>
                    </div>
                    <div class='car-time font-14 color-gray2'>
                        <div class='time-item flex' v-for='item in currentChoosedNameList' @click='choose(2,item)'>
                            <span v-text='item'>威宝</span>
                            <i class='iconfont icon-arrowR font-10 color-grayC'></i>
                        </div>
                    </div>
                </div>
                <div class='changeTime' v-show='changeShow=="changeType"'>
                    <div class='car-name font-11'>
                        <img :src="currentChoosed.logo" alt="">
                        <span class='ddid21 text' v-text='currentChoosed.brand' @click='back(1)'>安驰</span><i
                        class='iconfont icon-arrowR font-10 color-grayC'></i><span class='color-gray5'
                                                                                   v-text='currentChoosed.name'>安驰</span>
                        <i class='close iconfont icon-guanbi font-10 color-grayC' @click='cancelChoose()'></i>
                    </div>
                    <div class='car-time font-14 color-gray2'>
                        <div class='time-item flex' v-for='item in currentChoosedDisplacementList' @click='choose(3,item)'>
                            <span>{{item.fuelType}}-{{item.displacement}}</span>
                            <i class='iconfont icon-arrowR font-10 color-grayC'></i>
                        </div>

                    </div>
                </div>
                <div class='changeTime' v-show='changeShow=="changeTime"'>
                    <div class='car-name font-11'>
                        <img :src="currentChoosed.logo" alt="">
                        <span class='ddid21 text' v-text='currentChoosed.brand' @click='back(1)'>安驰</span><i
                        class='iconfont icon-arrowR font-10 color-grayC'></i><span class='ddid21' @click='back(2)'
                                                                                   v-text='currentChoosed.name'>安驰</span><i
                        class='iconfont icon-arrowR font-10 color-grayC'></i><span class='color-gray5'
                                                                                   v-text='currentChoosed.type.fuelType+"-"+currentChoosed.type.displacement'>安驰</span>
                        <i class='close iconfont icon-guanbi font-10 color-grayC' @click='cancelChoose()'></i>
                    </div>
                    <div class='car-time font-14 color-gray2'>
                        <div class='time-item flex' @click='choose(4,item)' v-for='item in currentChoosedYearList'>
                            <span v-text='item'>2015年产</span>
                            <i class='iconfont icon-arrowR font-10 color-grayC'></i>
                        </div>
                    </div>
                </div>
                <div class='searchPage' v-bind:class="{'opacity':searchShow&&!changeShow,'hide222':changeShow,}">
                    <div class='search-default font-13 color-gray9'>
                        <div class='searchBox' @click="searchDefault=true">
                            <i class='back iconfont icon-arrowL font-10' @click='searchShow=!searchShow'></i>
                            <div class='search flex'>
                                <div class='search-icon '>
                                    <i class='iconfont icon-csousuo font-11'></i>
                                </div>
                                <input id='input' v-model='searchName' class='font-13 color-gray2' type="text"
                                       placeholder='请输入17位VIN码或车辆名称'/>
                                <i class='iconfont icon-quxiaoglyph_ font-13' @click='searchName=""'></i>

                            </div>
                            <span @click='search()'>搜索</span>
                        </div>

                        <div class='result' v-show='searchDefault'>
                            <ul>
                                <li class='font-14 flex color-gray2' v-for='item in searchDataList' @click='choose(1,item)'>
                                    <div class='img'>
                                        <img v-bind:src="item.logo">
                                    </div>
                                    <span v-text='item.name'>奥迪</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <default-page v-show='loadData && brandList.length==0'></default-page>
        </div>
    </transition>

</template>
<script>
    import api from "../../../api/maintenance-api";
    import de from "../../../plugins/default-page/default_page.vue";
    import wxsdk from 'weixin-js-sdk';
    export default {
        name: 'home',
        data() {
            return {
                changeShow: false,
                searchShow: false,
                searchDefault: false,
                brandList: [],
                searchName: '',
                hotBrandList: [],
                currentChoosedNameList: [],
                currentChoosedDisplacementList: [],
                currentChoosedYearList: [],
                searchDataList:[],
                currentChoosed: {
                    brand: '',
                    name: '',
                    type: '',
                    time: '',
                }
            }
        },
        created() {
            //页面创建完成后
            //自定义标题

            this.getData()
            this.page.setTitle("选择车型");
        },
        watch: {
            //监听动态路由
        },
        methods: {
            //页面方法
            getData() {
                let self = this;
                self.loadData = false
                let loading = self.$loading
                loading.show('加载中...')
                //车型列表
                api.carBrandList().then((data) => {
                    if (data.result_code == 0) {
                        self.brandList = data.response.list
                        loading.hide()
                        self.loadData = true
                        self.scroll()
                    }
                });
                //热门列表
                api.hotBrand().then((data) => {
                    if (data.result_code == 0) {

                        if(data.response.list.length==6){
                            data.response.list=data.response.list.concat([{},{},{},{}])
                        }
                        if(data.response.list.length==7){
                            data.response.list=data.response.list.concat([{},{},{}])
                        }
                        if(data.response.list.length==8){
                            data.response.list=data.response.list.concat([{},{}])
                        }
                        if(data.response.list.length==9){
                            data.response.list=data.response.list.concat([{}])
                        }
                        self.hotBrandList = data.response.list;

                    }
                });
            },
            searchCar(){
                var self=this
                self.searchShow=!self.searchShow
                setTimeout(function () {
                    $('input').focus()
                })
            },
            search() {
                var re = new RegExp(/[a-z0-9A-Z]{17}/);
                let self = this;
                let loading = self.$loading
                loading.show('加载中...')
                if(re.test(self.searchName)){
                    api.getIdByVin({
                        vinCode: self.searchName
                    }).then((data) => {
                        if (data.result_code == 0) {
                            self.levelId = data.response.levelId
                            self.$router.push({path:'/maintenance/maintenance-recommend',query: {levelId:self.levelId}});
                        } else {
                            self.$toast.show({
                                showTime: 2,
                                message: data.message,
                                style: 'error'
                            });
                        }
                        loading.hide()
                    });

                }else{
                    api.searchData({
                        name: self.searchName
                    }).then((data) => {
                        if (data.result_code == 0) {
                            self.searchDataList = data.response
                            if(self.searchDataList.length==0){
                                self.$toast.show({
                                    showTime: 2,
                                    message: '暂无车辆信息',
                                    style: 'error'
                                });
                            }
                        } else {
                            self.$toast.show({
                                showTime: 2,
                                message: data.message,
                                style: 'error'
                            });
                        }
                        loading.hide()
                    });
                }


//                self.brandList.forEach((currentValue, index, array) => {
//                    if (currentValue == self.searchData) {
//                    }
//                })
            },
            back(index) {
                var self = this;
                if (index == 1) {
                    self.changeShow = 'changBrand'
                }
                if (index == 2) {
                    self.changeShow = 'changeType'
                }
            },
            //选择车辆
            choose(index, current) {

                let self = this;
                let loading = self.$loading
                loading.show('加载中...')
                if (index == 1) {
                    self.changeShow = 'changBrand'
                    self.currentChoosed.brand = current.name
                    self.currentChoosed.logo = current.logo
                    api.choosType({
                        brandName: self.currentChoosed.brand
                    }).then((data) => {
                        if (data.result_code == 0) {
                            self.currentChoosedNameList = data.response
                        } else {
                            self.$toast.show({
                                showTime: 2,
                                message: data.message,
                                style: 'error'
                            });
                        }
                        loading.hide()
                    });
                }
                if (index == 2) {
                    self.changeShow = 'changeType'
                    self.currentChoosed.name = current
                    api.chooseDisplacement({
                        brandName: self.currentChoosed.brand,
                        models: self.currentChoosed.name
                    }).then((data) => {
                        if (data.result_code == 0) {
                            self.currentChoosedDisplacementList = data.response.specList
                        } else {
                            self.$toast.show({
                                showTime: 2,
                                message: data.message,
                                style: 'error'
                            });
                        }
                        loading.hide()

                    });
                }
                if (index == 3) {
                    self.changeShow = 'changeTime'
                    self.currentChoosed.type = {
                        fuelType:current.fuelType,
                        displacement:current.displacement
                    }
                    api.chooseYear({
                        brandName: self.currentChoosed.brand,
                        models: self.currentChoosed.name,
                        displacement: self.currentChoosed.type.displacement,
                        fuelType: self.currentChoosed.type.fuelType,
                    }).then((data) => {
                        if (data.result_code == 0) {
                            self.currentChoosedYearList = data.response
                        } else {
                            self.$toast.show({
                                showTime: 2,
                                message: data.message,
                                style: 'error'
                            });
                        }
                        loading.hide()
                    });
                }
                if (index == 4) {
                    var levelId
                    self.changeShow = 'changeTime'
                    api.get_recommend({
                        brandName: self.currentChoosed.brand,
                        models: self.currentChoosed.name,
                        displacement: self.currentChoosed.type.displacement,
                        fuelType: self.currentChoosed.type.fuelType,
                        modelYear: current,
                    }).then((data) => {
                        if (data.result_code == 0) {
                            levelId = data.response.levelId
                            this.$router.push({path:'/maintenance/maintenance-recommend',query: {levelId:levelId}});
                        } else {
                            self.$toast.show({
                                showTime: 2,
                                message: data.message,
                                style: 'error'
                            });
                        }
                        loading.hide()
                    });

                }
            },
            cancelChoose() {
                this.changeShow = '';
            },
            goAnchor(index) {
                var anchor = this.$el.querySelector('#anchor-' + index)
//                $('.main').animate({
//                    scrollTop: anchor.offsetTop - 46
//                }, 300);
                $('.main').scrollTop(
                     anchor.offsetTop - 46);
                $('.bubble').hide()
                $('.nav-item').removeClass('nav-item-active')
                $('.nav-item').eq(index).addClass('nav-item-active')
                $('.bubble').eq(index).show()
                setTimeout(function () {
                    $('.bubble').hide()
                    //  $('.nav-item').removeClass('nav-item-active')
                }, 500)
                if (navigator.vibrate) {
                    // 支持
                    console.log("支持设备震动！");
                    navigator.vibrate(200);
                }
            },
            feedback() {
                this.$router.push({path: '/maintenance/maintenance-feedback', query: {id: "1"}});
            },
            Photograph(){
                var self=this;
                let loading = this.$loading
                chooseImage()

                    .then((localIds)=>(uploadImageToWx(localIds)))
                    .then((serverId)=>(api.getVinByImg({vinImgId: serverId}))
                    .then((data) => {
                        loading.show('加载中...')
                            if (data.result_code == 0) {
                                self.levelId = data.response.levelId
                                self.$router.push({path:'/maintenance/maintenance-recommend',query: {levelId:self.levelId}});
                            } else {
                                self.$toast.show({
                                    showTime: 2,
                                    message: data.message,
                                    style: 'error'
                                });
                            }
                            loading.hide()
                        })
                    )
            },
            scroll(){
                var self=this;
                $('.main').scroll(function(event){
                    var x=$('.hot').innerHeight()
                    for(var i in self.brandList){
                        if($('.brand-item').eq(i).offset().top<47){
                            if($('.nav-item').eq(i).hasClass('nav-item-active') && i!=0){
                                return
                            }
                                $('.nav-item').removeClass('nav-item-active')
                                $('.nav-item').eq(i).addClass('nav-item-active')
                        }

                    }
                });
            }
        },
        components: {}
    }
    function chooseImage() {
        return new Promise((resolve, reject) => {
            wxsdk.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有,
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    if (res) {
                        resolve(
                            localIds
                        )
                    } else {
                        reject('上传失败')
                    }
                }
            })
        })
    }
    function uploadImageToWx(localIds) {
                 return new Promise((resolve) => {
                     wxsdk.uploadImage({
                         isShowProgressTips: 0,
                         localId: localIds[0],
                         success: function (res) {
                             var serverId = res.serverId
                             resolve(serverId)
                         }
                     });

                 })

             }
</script>

<style lang="less" scoped>
    @import "./../../../../css/page/maintenance/home";
</style>