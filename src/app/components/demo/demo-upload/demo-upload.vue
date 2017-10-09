
<template>
    <div class="demo-upload">
        demo-upload1234
        <div>
            <div class='upload' v-upfiled='config'>
                上传文件
            </div>
        </div>
        <section class="file-list">
            <p class="gray-9 font-12 " >
                <i class="iconfont icon-fujian32 font-14 gray"></i>
                <span class="gray-2"> 附件 </span>
                <span class="" v-text="'('+filelist.length+')'">(2)</span>
            </p>
            <ul class="list-container">
                <li v-for="item in filelist">
                    <a :href="item.atAttachment">
                        <!--TXT，PDF，PPT,PPTX，DOC，DOCX，XLS，XLSX-->
                        <div class="img m-r-20">
                            <img src="../../../../images/file/E@2x.png"
                                 v-if="item.atFilename.indexOf('xls')  || item.atFilename.indexOf('xlsx')"/>
                            <img src="../../../../images/file/P@2x.png"
                                 v-if="item.atFilename == 'ppt' || item.atFilename == 'pptx'"/>
                            <img src="../../../../images/file/pdf@2x.png"
                                 v-if="item.atFilename == 'pdf'" />
                            <img src="../../../../images/file/T@2x.png" v-if="item.atFilename == 'txt'"/>
                            <img src="../../../../images/file/w@2x.png" v-if="item.atFilename == 'doc' || item.atFilename == 'docx'"/>
                        </div>
                    </a>
                        <div class="detail">
                            <p class="font-14 gray-5 ellipsis p-b-10" style="max-width: 4rem;" v-text="item.atFilename">附件 123.doc</p>
                            <p class="font-11 gray-9"
                               v-text="filesize(item.atFilesize)" >3.1M</p>
                        </div>

                </li>
            </ul>
        </section>

    </div>
</template>

<script>
    export default {
        name: 'demo-upfiled',
        data() {
            return {
                config:{
                    url:'https://dhr-shell.vchangyi.com/xacy/Common/Api/Attachment/UploadAtta',
                    size:'10',
                    fileType:['doc','docx','xls','xlsx','pdf','jpg','png','ppt','pptx','txt'],
                    multiple:true,
                    atMediatype:'99',
                    callback:this.uploadcall
                },
                filelist:[{
                        "atId": "3C759AE67F0000014E343D04EF2BBCC5",
                        "epId": "B538D3637F00000165C3EACC5E29FB65",
                        "atFilename": "汽车助手前端项目排期.xls",
                        "atFilesize": 11264,
                        "atMediatype": 99,
                        "atAttachment": "https:\/\/t-rep.vchangyi.com\/common\/20170901\/3C759AE67F0000014E343D04EF2BBCC5.xls?atId=3C759AE67F0000014E343D04EF2BBCC5",
                        "atCreated": 1504252893929,
                        "atAuthRequired": 0,
                        "atAuthUrl": "",
                        "atDefaultAuth": 1},
                    {
                        "atId": "3C759AE67F0000014E343D04EF2BBCC5",
                        "epId": "B538D3637F00000165C3EACC5E29FB65",
                        "atFilename": "汽车助手前端项目排期.xls",
                        "atFilesize": 11264,
                        "atMediatype": 99,
                        "atAttachment": "https:\/\/t-rep.vchangyi.com\/common\/20170901\/3C759AE67F0000014E343D04EF2BBCC5.xls?atId=3C759AE67F0000014E343D04EF2BBCC5",
                        "atCreated": 1504252893929,
                        "atAuthRequired": 0,
                        "atAuthUrl": "",
                        "atDefaultAuth": 1
                    }
                ]
            }
        },
        created() {
            //页面创建完成后
            //自定义标题
            this.page.setTitle("demo-upfiled");
        },
        watch: {
            //监听动态路由
        },
        methods: {
            //页面方法
            uploadcall(data){
                this.filelist.push(data)
                //alert(this.filelist)
            },
            filesize (value) {
                var res = parseInt(value) / 1024;
                if (res > 100) {
                    res = res / 1024;
                    return res.toFixed(2) + 'M';
                } else {
                    return res.toFixed(2) + 'K';
                }
            }
        },
        components:{
        },

    }
</script>

<style lang="less" scoped>
    @import "../../../../css/config/variables";
    @import "../../../../css/config/mixins/border";
    .demo-upload{
        //页面样式
        padding: 0 20/100rem;
        background: #fff;
        .upload{
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
        .file{
            a{
                display: block;
                width: 1rem;
                height: 1rem;
                background: url("./../../../../images/default/vcy_pic_categories.png");
            }
        }
        .file-list{
            padding-top: .28rem;
            position: relative;
            &:before{
                .Pseudo-border-before(#ddd);
            }
            .list-container{
                padding: .22rem 0;
                li:first-child{
                    margin-top: 0;
                }
                li{
                    position: relative;
                    margin-top: .28rem;
                    .img{
                        display: inline-block;
                        vertical-align: middle;
                        width: .6rem;
                        height: .6rem;
                        border-radius: 2px;
                        img{
                            width: 100%;
                        }
                    }
                    .detail{
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .download{
                        position: absolute;
                        top: 50%;
                        right: -.2rem;
                        padding: .2rem;
                        .translate(0,-50%);
                        z-index: 1;
                    }
                }
            }
        }
    }
</style>