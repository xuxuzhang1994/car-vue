
<template>
    <div class="demo-zjy">
        <ul>
            <li v-for='(item,index) in list'>
                <div class='title flex '>
                    <div class='left'>
                        <img :src="item.memFace" alt="">
                    </div>
                    <div class='right '>
                        <p v-text='item.title' class='font-15'></p>
                        <p v-text='item.type' class='font-11 color-gray9'></p>
                    </div>
                </div>
                <div class='zzz' :id="'zzz'+index" v-zzz="'zzz'+index">
                    <div class='content font-16' v-text='item.content' ></div>
                    <div class='experience-title font-10'>
                        经验教训
                    </div>
                    <div class='experience-content font-12' v-text='item.learning'></div>

                </div>
                <div class='more' @click='more()'>
                    <i class='iconfont icon-arrowB font-12'></i>
                </div>
                <div class='time font-11 color-gray9'>{{item.created | formatDate}}</div>
            </li>
        </ul>
    </div>
</template>

<script>

    import Vue from 'vue';
    import {formatDate} from '../../../plugins/formatDate'
    import api from "../../../api/dome-api";
    Vue.directive("zzz",{
        //  bind: 只调用一次，当指令第一次被绑定到元素时调用。
        //  inserte: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
        //  update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
        //  componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
        //  unbind: 只调用一次，指令与元素解绑时调用。
        bind(el,binding){
            setTimeout(
                function () {
                    var x='#'+binding.value
                    var firstHeight=$(x).children().eq(0).innerHeight()
                    console.log(firstHeight)
                    var firstLine=parseInt($(x).children().eq(0).css('line-height'))
                    var secondHeight=$(x).children().eq(1).innerHeight()
                    var secondLine=parseInt($(x).children().eq(1).css('line-height'))
                    var thirdHeight=$(x).children().eq(2).innerHeight()
                    var thirdLine=parseInt($(x).children().eq(2).css('line-height'))
                    //  console.log($(el).children().first().height())
                    var firstcul=parseInt(firstHeight/firstLine)
                    var secondcul=secondHeight/secondLine
                    var thirdcul=thirdHeight/thirdLine
                    console.log(firstcul,secondcul,thirdcul)
                    if(firstcul>3){
                        $(x).height(firstLine*3)
                        $(x).attr('height',$(x).height())
                        console.log($(x).height())
                        ishide(firstHeight,secondHeight,thirdHeight,$(x).height(),$(x))
                        return
                    }
                    if(firstcul>2){
                        $(x).height(firstHeight)
                        $(x).attr('height',$(x).height())
                       // console.log($(x).innerHeight())
                        ishide(firstHeight,secondHeight,thirdHeight,$(x).height(),$(x))
                        return
                    }
                    if(firstcul>1){
                        $(x).height(firstHeight+secondHeight)
                        $(x).attr('height',$(x).height())
                        console.log($(x).height())
                        ishide(firstHeight,secondHeight,thirdHeight,$(x).height(),$(x))
                        return
                    }
                    if(firstcul>0){
                        $(x).height(firstHeight+secondHeight+thirdLine)
                        $(x).attr('height',$(x).height())
                        console.log($(x).height())
                        ishide(firstHeight,secondHeight,thirdHeight,$(x).height(),$(x))
                        return
                    }
                }
            )


        },
        update(el,binding,vnode){

        },
    })
    export default {

        name: 'demo-zjy',
        data() {
            return {
                list:[]
            }
        },
        filters:{
            formatDate(time){
                let date = new Date(parseInt(time));
                console.log(date)
                return formatDate(date,'yyyy-MM-dd hh:mm');
                //此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
            }
        },
        created() {
            //页面创建完成后
            //自定义标题
            var self=this;
            self.page.setTitle("demo-zjy");

            var data={
                "errcode": 0,
                "errmsg": "ok",
                "errsdkcode": "",
                "requestId": "",
                "timestamp": 1506308904000,
                "result": {
                    "list": [{
                        "recordId": "417",
                        "uid": "5BBC04C27F0000017C90B894D3B4DB3D",
                        "created": "1505986689000",
                        "type": "PI",
                        "title": "图一样一物降一物图图",
                        "content": "我们的生活方式是什么时候回来呀图，如图二是",
                        "learning": "图小心翼翼小心翼翼呵护着",
                        "imgUrl": [],
                        "memFace": "http:\/\/p.qlogo.cn\/bizmail\/BYly1xE0LZIptUmX8lgMEiaqdQEouLL7dice1RZeicWQficHJmb5vKPBIg\/0",
                        "memUsername": "师文科",
                        "reads": 5,
                        "isLieked": false,
                        "likeList": "",
                        "likeTotal": 0,
                        "commentList": [],
                        "commentTotal": 0
                    }, {
                        "recordId": "416",
                        "uid": "5BBC04C27F0000017C90B894D3B4DB3D",
                        "created": "1505986452000",
                        "type": "PI",
                        "title": "图图为一物降一物图一",
                        "content": "你的孩子在你身边的时候就可以看到她",
                        "learning": "涂抹法起来了",
                        "imgUrl": ["https:\/\/dhr-shell.vchangyi.com\/xacy\/Common\/Frontend\/Attachment\/View\/Index\/atid\/A3C972F07F000001625DCE76E8CB4252?_identifier=safetyreport", "https:\/\/dhr-shell.vchangyi.com\/xacy\/Common\/Frontend\/Attachment\/View\/Index\/atid\/A3C989D17F000001625DCE7696ADA684?_identifier=safetyreport"],
                        "memFace": "http:\/\/p.qlogo.cn\/bizmail\/BYly1xE0LZIptUmX8lgMEiaqdQEouLL7dice1RZeicWQficHJmb5vKPBIg\/0",
                        "memUsername": "师文科",
                        "reads": 5,
                        "isLieked": false,
                        "likeList": "",
                        "likeTotal": 0,
                        "commentList": [],
                        "commentTotal": 0
                    }, {
                        "recordId": "415",
                        "uid": "5BBC04C27F0000017C90B894D3B4DB3D",
                        "created": "1505985934000",
                        "type": "PI",
                        "title": "旅途图图说好我是不知道",
                        "content": "图为证小心翼翼欻图",
                        "learning": "图图为一物降一物图一样",
                        "imgUrl": ["https:\/\/dhr-shell.vchangyi.com\/xacy\/Common\/Frontend\/Attachment\/View\/Index\/atid\/A3C1A3D07F000001625DCE766A3DD310?_identifier=safetyreport"],
                        "memFace": "http:\/\/p.qlogo.cn\/bizmail\/BYly1xE0LZIptUmX8lgMEiaqdQEouLL7dice1RZeicWQficHJmb5vKPBIg\/0",
                        "memUsername": "师文科",
                        "reads": 6,
                        "isLieked": false,
                        "likeList": "",
                        "likeTotal": 0,
                        "commentList": [],
                        "commentTotal": 0
                    }, {
                        "recordId": "414",
                        "uid": "55131C887F0000014E5FA7DFA4AC5DA3",
                        "created": "1505985778000",
                        "type": "PI",
                        "title": "测试",
                        "content": "同off哦哦哦<br \/>\n咯哦",
                        "learning": "咯哦哦",
                        "imgUrl": ["https:\/\/dhr-shell.vchangyi.com\/xacy\/Common\/Frontend\/Attachment\/View\/Index\/atid\/A3BF4BBC7F000001625DCE76052ACF0D?_identifier=safetyreport"],
                        "memFace": null,
                        "memUsername": null,
                        "reads": 6,
                        "isLieked": false,
                        "likeList": "",
                        "likeTotal": 0,
                        "commentList": [],
                        "commentTotal": 0
                    }, {
                        "recordId": "413",
                        "uid": "7F96A34E7F0000017D518E2153218599",
                        "created": "1505985757000",
                        "type": "PI",
                        "title": "测试单图截取",
                        "content": "那些年",
                        "learning": "就自己",
                        "imgUrl": ["https:\/\/dhr-shell.vchangyi.com\/xacy\/Common\/Frontend\/Attachment\/View\/Index\/atid\/A3BEF3BB7F000001625DCE761291A630?_identifier=safetyreport"],
                        "memFace": "http:\/\/p.qlogo.cn\/bizmail\/ib4xbC1sVGbboH4HfgpSUJqalFeyzKnNy5lv8AuARR0cAY9ATwHOj7w\/0",
                        "memUsername": "马雄伟",
                        "reads": 6,
                        "isLieked": false,
                        "likeList": "马雄伟",
                        "likeTotal": 1,
                        "commentList": [{
                            "cmtId": "A3BF32607F000001625DCE769C3E08B9",
                            "parentId": "",
                            "plIdentifier": "safetyreport",
                            "memUid": "7F96A34E7F0000017D518E2153218599",
                            "memUsername": "马雄伟",
                            "memFace": "http:\/\/p.qlogo.cn\/bizmail\/ib4xbC1sVGbboH4HfgpSUJqalFeyzKnNy5lv8AuARR0cAY9ATwHOj7w\/0",
                            "cmtContent": "技术教学技能",
                            "allow_delete": 0
                        }],
                        "commentTotal": 1
                    }, {
                        "recordId": "412",
                        "uid": "55131C887F0000014E5FA7DFA4AC5DA3",
                        "created": "1505985711000",
                        "type": "PI",
                        "title": "同",
                        "content": "你look 图来咯拖走了 all 度摩托了 all 度目录目哦额科托努目睹特特哦臀部特特哦图谋特痛图啊堵你look 图来咯拖走了 all 度摩托了 all 度目录目哦额科托努目睹特特哦臀部特特哦图谋特痛图啊堵",
                        "learning": "酒驾",
                        "imgUrl": ["https:\/\/dhr-shell.vchangyi.com\/xacy\/Common\/Frontend\/Attachment\/View\/Index\/atid\/A3BE446A7F000001625DCE7653E75B4A?_identifier=safetyreport"],
                        "memFace": null,
                        "memUsername": null,
                        "reads": 6,
                        "isLieked": false,
                        "likeList": "",
                        "likeTotal": 0,
                        "commentList": [],
                        "commentTotal": 0
                    }, {
                        "recordId": "411",
                        "uid": "55131C887F0000014E5FA7DFA4AC5DA3",
                        "created": "1505985557000",
                        "type": "PI",
                        "title": "测试",
                        "content": "事件描述",
                        "learning": "咯破MSN送命魔女特哦哦哦同 off怎么我哦哦哦咯哦哦哦哦特图啊咯哦特咯哦哦我乐于咯嗯特痛特我",
                        "imgUrl": ["https:\/\/dhr-shell.vchangyi.com\/xacy\/Common\/Frontend\/Attachment\/View\/Index\/atid\/A3BBEA427F000001625DCE76AC34ECCE?_identifier=safetyreport"],
                        "memFace": null,
                        "memUsername": null,
                        "reads": 6,
                        "isLieked": false,
                        "likeList": "",
                        "likeTotal": 0,
                        "commentList": [],
                        "commentTotal": 0
                    }, {
                        "recordId": "410",
                        "uid": "5C1301457F0000017C90B894B3D10B27",
                        "created": "1505119452000",
                        "type": "PI",
                        "title": "哈",
                        "content": "哈",
                        "learning": "哈",
                        "imgUrl": ["https:\/\/dhr-shell.vchangyi.com\/xacy\/Common\/Frontend\/Attachment\/View\/Index\/atid\/701C34087F000001777B16CB920C310F?_identifier=safetyreport"],
                        "memFace": null,
                        "memUsername": null,
                        "reads": 9,
                        "isLieked": false,
                        "likeList": "",
                        "likeTotal": 0,
                        "commentList": [{
                            "cmtId": "73D062CE7F000001777B16CBB3E03802",
                            "parentId": "",
                            "plIdentifier": "safetyreport",
                            "memUid": "F76F3B467F0000012B1D0FB5B5FD3B6F",
                            "memUsername": "刘鹏伟",
                            "memFace": "http:\/\/p.qlogo.cn\/bizmail\/iax6ev3k6E9VrXVLyrlZS2ERuXBTf5icLrkULCUz9ZUYzRc9I7IsiaKRg\/0",
                            "cmtContent": "交换机开发规划撒即可工行金卡施工队阖家安康干哈健康多杀几个卡麓山国际发卡量客家话vdsajklga11",
                            "allow_delete": 0
                        }, {
                            "cmtId": "73CFE0B07F000001777B16CBC47848C8",
                            "parentId": "",
                            "plIdentifier": "safetyreport",
                            "memUid": "F76F3B467F0000012B1D0FB5B5FD3B6F",
                            "memUsername": "刘鹏伟",
                            "memFace": "http:\/\/p.qlogo.cn\/bizmail\/iax6ev3k6E9VrXVLyrlZS2ERuXBTf5icLrkULCUz9ZUYzRc9I7IsiaKRg\/0",
                            "cmtContent": "少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所",
                            "allow_delete": 0
                        }, {
                            "cmtId": "73BA4BCF7F000001777B16CB8AA78C9F",
                            "parentId": "",
                            "plIdentifier": "safetyreport",
                            "memUid": "F76F3B467F0000012B1D0FB5B5FD3B6F",
                            "memUsername": "刘鹏伟",
                            "memFace": "http:\/\/p.qlogo.cn\/bizmail\/iax6ev3k6E9VrXVLyrlZS2ERuXBTf5icLrkULCUz9ZUYzRc9I7IsiaKRg\/0",
                            "cmtContent": "少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所",
                            "allow_delete": 0
                        }],
                        "commentTotal": 3
                    }, {
                        "recordId": "409",
                        "uid": "55131C887F0000014E5FA7DFA4AC5DA3",
                        "created": "1505119186000",
                        "type": "PI",
                        "title": "测试",
                        "content": "描述",
                        "learning": "教训",
                        "imgUrl": ["https:\/\/dhr-shell.vchangyi.com\/xacy\/Common\/Frontend\/Attachment\/View\/Index\/atid\/70176E607F000001777B16CB13FEAB1F?_identifier=safetyreport"],
                        "memFace": null,
                        "memUsername": null,
                        "reads": 8,
                        "isLieked": false,
                        "likeList": "范亲",
                        "likeTotal": 1,
                        "commentList": [{
                            "cmtId": "70189EB47F000001777B16CB0E504E5C",
                            "parentId": "",
                            "plIdentifier": "safetyreport",
                            "memUid": "55131C887F0000014E5FA7DFA4AC5DA3",
                            "memUsername": "范亲",
                            "memFace": "http:\/\/p.qlogo.cn\/bizmail\/NHKlUnksTOHj7rN0MvuXt0shjVszfBZgxZugo0ODgPvhicCR3hoUdjA\/0",
                            "cmtContent": "啊啊啊",
                            "allow_delete": 0
                        }],
                        "commentTotal": 1
                    }, {
                        "recordId": "408",
                        "uid": "5C1301457F0000017C90B894B3D10B27",
                        "created": "1505117865000",
                        "type": "PI",
                        "title": "标题",
                        "content": "事件",
                        "learning": "经验",
                        "imgUrl": ["https:\/\/dhr-shell.vchangyi.com\/xacy\/Common\/Frontend\/Attachment\/View\/Index\/atid\/7003F98A7F000001777B16CB68AE3CFD?_identifier=safetyreport"],
                        "memFace": null,
                        "memUsername": null,
                        "reads": 9,
                        "isLieked": false,
                        "likeList": "范亲,庞加加",
                        "likeTotal": 2,
                        "commentList": [{
                            "cmtId": "70058D197F000001777B16CB9377D85C",
                            "parentId": "",
                            "plIdentifier": "safetyreport",
                            "memUid": "5C1301457F0000017C90B894B3D10B27",
                            "memUsername": "庞加加",
                            "memFace": "http:\/\/p.qlogo.cn\/bizmail\/C3GP71Lwb8eVRoKwjFjzDTAY4M9Jm1fYCG4uyPb2JWS5u1GgFkjmRQ\/0",
                            "cmtContent": "同",
                            "allow_delete": 0
                        }, {
                            "cmtId": "700452117F000001777B16CB05B9E6E2",
                            "parentId": "",
                            "plIdentifier": "safetyreport",
                            "memUid": "5C1301457F0000017C90B894B3D10B27",
                            "memUsername": "庞加加",
                            "memFace": "http:\/\/p.qlogo.cn\/bizmail\/C3GP71Lwb8eVRoKwjFjzDTAY4M9Jm1fYCG4uyPb2JWS5u1GgFkjmRQ\/0",
                            "cmtContent": "测试",
                            "allow_delete": 0
                        },{

                        }
                        ],
                        "commentTotal": 2
                    }],
                    "total": 290,
                    "pape": 1,
                    "limit": 10,
                    "searchType": [{
                        "key": 3,
                        "val": "全部类型"
                    }, {
                        "key": 1,
                        "val": "PI"
                    }]
                }
            }
            self.list=data.result.list

        },
        watch: {
            //监听动态路由
        },
        methods: {
            //页面方法
            more(){
                var old=$(event.currentTarget).prev().attr('height')
                console.log($(event.currentTarget).prev().attr('height'))
                if($(event.currentTarget).prev().height()!=old){
                    $(event.currentTarget).prev().css('height',old)
                    $(event.currentTarget).removeClass('loadmore')
                }else{
                    old=$(event.currentTarget).prev().css('height')
                    $(event.currentTarget).prev().css('height','auto')
                    $(event.currentTarget).addClass('loadmore')
                }
            }
        },
        components:{
        }
    }
    function ishide(firstHeight,secondHeight,thirdHeight,x,dom) {
        if(firstHeight+secondHeight+thirdHeight<=x){
            dom.next().hide()
        }
    }
</script>

<style lang="less" scoped>
    .demo-zjy{
        //页面样式
        @import "../../../../css/config/variables";
        @import "../../../../css/config/mixins/border";
        padding: 0 20/100rem;
        background: #fff;
        li{
            padding: 20/100rem 0 40/100rem 0;
            position: relative;
            &:after{
                .Pseudo-border-after()
            }
        }
        .title{
            align-items: center;
        }
        .left{
            margin-right: 15/100rem;
            img{
                width: 60/100rem;
                height: 60/100rem;
                border-radius: 100%;
            }
        }
        .zzz{
            line-height: 1;
            position: relative;
            //height: 1rem;
            overflow: hidden;
            .content{
                overflow: hidden;
                padding-bottom: 12/100rem;
            }
            .experience-title{
                color: #FFD301;
            }

            .experience-title{
                padding-bottom: 8/100rem;
            }
        }
        .more{
            width: 100%;
            text-align: center;
            transition: 0.4s;
        }
        .loadmore{
            transform:rotate(180deg);
        }
    }
</style>