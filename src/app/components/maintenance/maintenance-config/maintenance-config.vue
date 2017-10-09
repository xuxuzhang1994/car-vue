
<template>
    <div class="maintenance-config" v-show='loadData'>
        <div v-if='loadData&& configList.length!=0'>
            <header>
                <div class='brand'>
                    <img :src="title.logo" alt="">
                    <div class='left color-gray2' v-text='title.brand'></div>
                </div>
                <div class='type color-gray9 font-13' v-text='title.models'></div>
            </header>
            <section>
                <ul>
                    <li class='flex' v-for='item in configList' v-if='item.field_id!="brandLogo"'>
                        <div class='left color-gray9 font-13' v-text='item.field_name'></div>
                        <div class='right color-gray5 font-13' v-text='item.field_value'> </div>
                    </li>
                </ul>
            </section>
            <footer>
                <div class='back' @click='back()'>返回</div>
            </footer>
        </div>
        <default-page v-show='loadData && configList.length==0'></default-page>
    </div>
</template>

<script>
    import api from "../../../api/maintenance-api";
    export default {
        name: 'maintenance-config',
        data() {
            return {
                title:{
                    brand:'',
                    models:'',
                    logo:'',
                },
                configList:[],
                loadData:false
            }
        },
        created() {
            //页面创建完成后
            //自定义标题
            this.page.setTitle("车辆配置");
            this.getDetail()
        },
        watch: {
            //监听动态路由
        },
        methods: {
            //页面方法
            feedback(){
                this.$router.push({path:'/maintenance/maintenance-feedback',query: {id:"1"}});
            },
            getDetail(){
                let self=this;
                let loading = self.$loading;
                loading.show('加载中...')
                self.levelId=self.$router.currentRoute.query.levelId
                api.getConfig({
                    levelId: self.levelId,
                }).then((data) => {
                    if (data.result_code == 0) {
                        self.configList = data.response.fields
                        console.log(self.configList)
                        self.configList.forEach((currentValue, index, array) => {
                            if (currentValue.field_id == 'brand') {
                                self.title.brand=currentValue.field_value
                            }
                            if (currentValue.field_id == 'models') {
                                self.title.models=currentValue.field_value
                            }
                            if (currentValue.field_id == 'brandLogo') {
                                self.title.logo=currentValue.field_value
                            }
                        })
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
            back(){
                this.$router.push({path:'/maintenance/maintenance-recommend',query: {levelId:this.levelId}});
            }
        },
        components:{
        }
    }
</script>

<style lang="less" scoped>
        @import "./../../../../css/page/maintenance/config";
</style>