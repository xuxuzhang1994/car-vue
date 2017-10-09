
<template>
    <div class="maintenance-other-recommend">
        <div v-if='loadData && datalist.length!=0'>
            <header>
                <div class='title font-18 color-gray2'>其他保养项目推荐</div>
            </header>
            <section>
                <ul>
                    <li class='item ' v-for='(item,index) in datalist' :class="{'noborder':item.isShowDetail}">
                        <div class='preview flex last-no-bd' @click='showDetail(index)'>
                            <div class='left'>
                                <p class='font-14 color-gray2' v-text='item.name'>火花塞</p>
                                <p class='describe font-12 color-gray9' v-text='item.text'>超凡喜力5W-40全合成汽车润滑油</p>
                            </div>
                            <i class='iconfont icon-arrowB font-12' v-bind:class="{'show-detail':item.isShowDetail}"
                               ></i>
                        </div>
                        <div class='detail'
                             :class="{'height0':!item.isShowDetail}" >
                            <div class='detail-item flex' v-zzz v-for='detail in item.data' v-show='item.isShowDetail'>
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
                    </li>
                </ul>
            </section>
            <footer class='font-11 flex'>
                <p>此数据仅供参考，请以原厂保养手册为准。</p>
                <div class='feedback flex' @click='feedback()'>
                    <i class='iconfont icon-woshenpideline_ font-13'></i>
                    <span class='font-11'>我要反馈</span>
                </div>
            </footer>
        </div>
        <default-page v-show='loadData && datalist.length==0'></default-page>
    </div>
</template>

<script>
    import api from "../../../api/maintenance-api";
    import Vue from 'vue';
//    Vue.directive("zzz",{
//        //  bind: 只调用一次，当指令第一次被绑定到元素时调用。
//        //  inserte: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
//        //  update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
//        //  componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
//        //  unbind: 只调用一次，指令与元素解绑时调用。
//        bind(el,binding){
//            setTimeout(
//                function () {
//                    var s=0
//                    var firstHeight=$(el).parent().children()
//                    for(var i=0;i< firstHeight.length;i++){
//                        s=firstHeight.eq(i).innerHeight()+s
//                    }
//                    $(el).parent().height(s)
//                }
//            )
//        },
//    })
    export default {
        name: 'maintenance-other-recommend',
        data() {
            return {
                datalist:false,
                loadData:false
            }
        },
        created() {
            //页面创建完成后
            //自定义标题
            this.page.setTitle("其他保养推荐");
            var self=this
            if(self.$router.currentRoute.query.id){
                self.id=self.$router.currentRoute.query.id
                this.getData(self.id)
            }
        },
        watch: {
            //监听动态路由
        },
        methods: {
            //页面方法
            //获得数据
            getData(id){
                var self=this
                var loading=self.$loading
                loading.show('加载中...')
                api.upkeep({
                    id  : id,
                }).then((data) => {
                    if (data.result_code == 0) {
                        for(var i in data.response){
                            data.response[i].isShowDetail=false
                        }
                        self.datalist = data.response;
                        self.loadData=true
                    } else {
                        self.$toast.show({
                            showTime: 2,
                            message: data.message,
                            style: 'error'
                        });
                    }
                    loading.hide()
                    self.loadData=true

                });
            },
            //反馈
            feedback(){
                this.$router.push({path:'/maintenance/maintenance-feedback',query: {id:"1"}});
            },
            //显示详细
            showDetail(index){
               // this.datalist[index].isShowDetail=!this.datalist[index].isShowDetail
                if(this.datalist[index].isShowDetail==true){
                    for(var i in this.datalistr){
                        this.datalist[i].isShowDetail=false
                    }
                    return
                }
                if(this.datalist[index].isShowDetail==false){
                    for(var i in this.datalist){
                        this.datalist[i].isShowDetail=false
                    }
                    this.datalist[index].isShowDetail=true
                }
            }
        },
        components:{
        }
    }
</script>

<style lang="less" scoped>
    @import "./../../../../css/page/maintenance/other-recommend";

</style>