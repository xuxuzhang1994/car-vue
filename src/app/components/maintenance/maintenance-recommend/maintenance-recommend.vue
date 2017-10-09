
<template>
    <transition>
        <div class="maintenance-recommend" :class="{'bg':data.length!=0}" >
            <section v-if='loadData&& data.length!=0'>
                <header class='header'>
                    <div class='top flex'>
                        <div class='title flex'>
                            <span class='font-15' v-text="(data.car.brand+'-'+data.car.models).maxLength(30)">长安福特-经典福克斯
                            </span>
                            <i class='iconfont icon-arrowR font-10'></i>
                        </div>
                        <div class='feedback' @click='feedback()'>
                            <i class='iconfont icon-woshenpideline_ font-16'></i>
                            <span class='font-8'>反馈</span>
                        </div>
                    </div>
                    <div class='nav'>
                        <div class='cycle' @click='gopage(1)'>
                            <i class='iconfont icon-rililine_ font-13'></i>
                            <span class='font-14'>保养周期</span>
                        </div>
                        <div class='config' @click='gopage(2)'>
                            <i class='iconfont icon-kepai-peizhi font-13'></i>
                            <span class='font-14'>车辆配置</span>
                        </div>
                    </div>
                    <div class='search flex' v-if='data.engineOil && data.other'>
                        <div class='tip'>
                            <i class='iconfont icon-kepai-gongli font-13'></i>
                            <span class='color-gray5 font-14'>当前里程数(KM)</span>
                        </div>
                        <div class='int flex'>
                            <input class='color-gray5 font-14' type="number" placeholder='请输入' v-model='currentMi'>
                            <span class='font-13' @click='getMaintenance()' v-show='currentMi.length>0'>确认</span>
                        </div>
                    </div>
                </header>
                <div class='main'>
                    <section class='recommend' >
                        <div class='' v-if='data.engineOil.length!=0'>
                            <header class='flex'>
                                <div class='title font-18 color-gray2'>机油推荐</div>
                                <div class='type font-12 color-gray9'>(机油加注量:
                                    <span v-text='data.engineOil.filling+"L"'>3L</span>
                                    )</div>
                            </header>
                            <div class='content flex' >
                                <div class='item'>
                                    <img
                                        :src="data.engineOil.lowerImage" alt="">
                                    <p class='font-12 color-gray2' v-text='data.engineOil.lower'>超凡喜力5W-40全合成汽车润滑油</p>
                                </div>
                                <div class='item'>
                                    <img
                                        :src="data.engineOil.highImage" alt="">
                                    <p class='font-12 color-gray2'><span class='chiji font-10 flex'>最佳</span>{{data.engineOil.high}}</p>
                                </div>
                            </div>
                        </div>
                        <div class='noEngineOil' v-if='data.engineOil.length==0'>
                            <img src="../.././../../images/default/vcy_pic_content" alt="">
                            <p class='title color-gray5'>暂无机油推荐</p>
                            <p class='title-en color-gray5'>Oil recommendation</p>
                        </div>
                    </section>
                    <section class='other-commehernd' v-if='data.other.length!=0'>
                        <header class='flex'>
                            <div class='title font-18 color-gray2'>其他保养项目推荐</div>
                        </header>
                        <div class='content'>
                            <div class='item' v-for="(item,index) in data.other" :class="{'noborder':item.isShowDetail}">
                                <div class='preview flex last-no-bd' @click='showDetail(index)'>
                                    <div class='left '>
                                        <p class='font-14 color-gray2' v-text='item.name'>火花塞</p>
                                        <p class='describe font-12 color-gray9' v-text='item.text' v-if='item.text'>超凡喜力5W-40
                                            全合成汽车润滑油</p>
                                    </div>
                                    <i class='iconfont icon-arrowB font-12' v-bind:class="{'show-detail':item.isShowDetail}"
                                       ></i>
                                </div>
                                <div class='detail'
                                     :class="{'height0':!item.isShowDetail}" >
                                    <div class='detail-item flex' v-for='detail in item.data'
                                         v-show='item.isShowDetail' v-zzz>
                                        <div class='brand-item '>
                                            <div class='logo flex'>
                                                <img :src="detail.brandLogo" alt="">
                                            </div>
                                            <div class='brand font-14 color-gray2 flex' v-text='detail.brandName'>
                                                电装
                                            </div>
                                            <div class='flex type font-12 color-gray9'
                                                 v-text='(detail.first?detail.first:"")+" "+(detail.second?detail.second:"")+" "+(detail.third?detail.third:"")'>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <default-page v-show='loadData && data.length==0'></default-page>
        </div>
    </transition>

</template>

<script>
    import api from "../../../api/maintenance-api";
    import Vue from 'vue';
    Vue.directive("zzz",{
        //  bind: 只调用一次，当指令第一次被绑定到元素时调用。
        //  inserte: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
        //  update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
        //  componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
        //  unbind: 只调用一次，指令与元素解绑时调用。
        bind(el,binding){
//            var u = navigator.userAgent
//            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
//            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//            if(isiOS) {
//
//            }
            setTimeout(
                function () {
                    var s=0
                    var firstHeight=$(el).parent().children()
                    for(var i=0;i< firstHeight.length;i++){
                        s=firstHeight.eq(i).innerHeight()+s
                    }
                    $(el).parent().height(s)
                }
            )
        },

    })
    export default {
        name: 'maintenance-recommend',
        data() {
            return {
                recommendData:'',
                currentMi:'',
                data:[],
                loadData:false
            }
        },
        created() {
            //页面创建完成后
            //自定义标题
            this.page.setTitle("保养推荐");

            var self=this

            if(self.$router.currentRoute.query.levelId){
                self.levelId=self.$router.currentRoute.query.levelId
            }

            console.log(self.recommendData)
            this.getMaintenance();
        },
        watch: {
            //监听动态路由
        },
        methods: {
            //页面方法
            gopage(type){
                if(type==1){
                    this.$router.push({path:'/maintenance/maintenance-cycle',query: {levelId:this.levelId}});
                }else{
                    this.$router.push({path:'/maintenance/maintenance-config',query: {levelId:this.levelId}});
                }
            },
            //反馈
            feedback(){
                this.$router.push({path:'/maintenance/maintenance-feedback',query: {id:"1"}});
            },
            getMaintenance(){
                let self=this;
                let loading=this.$loading
                    loading.show('加载中...')
                api.getMaintenance({
                    levelId  : self.levelId,
                    km       : self.currentMi
                }).then((data) => {
                    if (data.result_code == 0) {
                        for(var i in data.response.other){
                            data.response.other[i].isShowDetail=false
                        }
                        self.data=data.response
                    } else {
                        self.$toast.show({
                            showTime: 2,
                            message: data.message,
                            style: 'error'
                        });
                    }
                    self.loadData=true
                    loading.hide()
                });
            },
            //显示详细
            showDetail(index){
                if(this.data.other[index].isShowDetail==true){
                    for(var i in this.data.other){
                        this.data.other[i].isShowDetail=false
                    }
                    return
                }
                if(this.data.other[index].isShowDetail==false){
                    for(var i in this.data.other){
                        this.data.other[i].isShowDetail=false
                    }
                    this.data.other[index].isShowDetail=true
                }

            }
        },
        components:{
        }
    }
    String.prototype.maxLength = function (x)
    {
        // x英文字节数
        var str=this
        for (var i=0; i<this.length; i++) {
            if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {
                x--
                if(this.length>x){
                    str=this.substring(0,x)+'...'
                }
            } else {

                if(this.length>x){
                    str=this.substring(0,x)+'...'
                }
            }
        }
        console.log(x)

        return str
    }
</script>

<style lang="less" scoped>
    @import "./../../../../css/page/maintenance/recommend";
</style>