import api from "../../../api/maintenance-api";
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
            htoBrandList1: [],
            htoBrandList2: [],
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
        this.page.setTitle("home");
        this.getData()
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
                }
            });
            //热门列表
            api.hotBrand().then((data) => {
                if (data.result_code == 0) {
                    self.htoBrandList = data.response.list;
                    self.htoBrandList1 = self.htoBrandList.slice(0, 4)
                    self.htoBrandList2 = self.htoBrandList.slice(5, 8)
                }
            });
        },
        search() {
            let self = this;
            let loading = self.$loading
            api.searchData({
                name: self.searchName
            }).then((data) => {
                if (data.result_code == 0) {
                    self.searchDataList = data.response
                } else {
                    self.$toast.show({
                        showTime: 2,
                        message: data.message,
                        style: 'error'
                    });
                }
                loading.hide()
            });
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
                var recommendData
                self.changeShow = 'changeTime'
                api.get_recommend({
                    brandName: self.currentChoosed.brand,
                    models: self.currentChoosed.name,
                    displacement: self.currentChoosed.type.displacement,
                    fuelType: self.currentChoosed.type.fuelType,
                    modelYear: current,
                }).then((data) => {
                    if (data.result_code == 0) {
                        recommendData = data.response
                        this.$router.push({path:'/maintenance/maintenance-recommend',query: {recommendData:recommendData}});
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
            $('.main').animate({
                scrollTop: anchor.offsetTop - 48
            }, 300);
            $('.bubble').hide()
            $('.nav-item').removeClass('nav-item-active')
            $('.nav-item').eq(index).addClass('nav-item-active')
            $('.bubble').eq(index).show()
            setTimeout(function () {
                $('.bubble').hide()
                //  $('.nav-item').removeClass('nav-item-active')
            }, 500)
        },
        feedback() {
            this.$router.push({path: '/maintenance/maintenance-feedback', query: {id: "1"}});
        },
        Photograph(){
            let loading = this.$loading
            chooseImage()
                .then((localIds)=>(uploadImageToWx(localIds)))
                .then((serverId)=>(api.getVinByImg({vinImgId: serverId}))
                    .then((data) => {
                        loading.show('加载中...')
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
                    })
                )
        },
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