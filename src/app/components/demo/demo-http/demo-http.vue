
<template>
    <div class="demo-http">
        <div class="form-template">
            <div class="from-other">
                文本框（单行）
            </div>
            <div class="form-cells">
                <div class="form-cell">
                    <div class="form-cell-content form-control">
                        <input type="text" placeholder="请输入标题"/>
                    </div>
                </div>
            </div>
            <div class="from-other">
                文本框（多行）
            </div>
            <div class="form-cells">
                <div class="form-cell">
                    <div class="form-cell-content form-control">
                        <textarea  placeholder="请输入内容（必填）"></textarea>
                    </div>
                </div>
            </div>

            <div class="from-other">
                单行表单
            </div>
            <div class="form-cells">
                <div class="form-cell">
                    <div class="form-cell-title">
                        标题
                    </div>
                    <div class="form-cell-content form-control">
                        <input type="text" placeholder="请输入标题"/>
                        <span class="form-error" v-show="true "><i class="iconfont icon-gantan"></i></span>
                        <span class="form-success" v-show="false"><i class="iconfont icon-xuanze_"></i></span>
                    </div>
                </div>
                <div class="form-cell">
                    <div class="form-cell-title">
                        手机号数字
                    </div>
                    <div class="form-cell-content form-control">
                        <input type="tpl" placeholder="请输入手机号" maxlength="11"/>
                        <span v-if="true" class="form-phone-btn form-phone-btn-start"
                        >获取验证</span>
                        <span v-if="false" class="form-phone-btn form-phone-btn-done"
                        >重新({{times}})</span>
                    </div>
                </div>
                <div class="form-cell">
                    <div class="form-cell-title">
                        选择日期
                    </div>
                    <div class="form-cell-content form-select right-arrow" >
                        <div class="select-value" ><span v-if="detail.date!=''" ></span><span v-if="detail.date==''" class="placeholder">请选择日期</span></div>
                        <div class="select-key">
                            <input class="select"  type="date" name="input" v-model="detail.date" required />
                        </div>
                    </div>
                </div>
            </div>
            <div class="from-other">
                开关
            </div>
            <div class="form-cells">
                <div class="form-cell">
                    <div class="form-cell-title">
                        是否开启
                    </div>
                    <div class="form-cell-content form-control" >
                        <div class="from-switch" >
                            <label class="label-switch" >
                                <input type="checkbox" v-model="detail.proof_open" >
                                <div class="checkbox"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="from-other">
                开关
            </div>
            <div class="form-cells">
                <div class="form-cell">
                    <div class="form-cell-title">
                        是否开启
                    </div>
                    <div class="form-cell-content form-control" >
                        <div class="from-switch" >
                            <label class="label-switch" >
                                <input type="checkbox" v-model="detail.proof_open" >
                                <div class="checkbox"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="from-other">
                选人&提示语
            </div>
            <div class="form-cells">
                <div class="form-cell">
                    <div class="form-cell-title">
                        人员权限
                    </div>
                    <div class="form-cell-content form-control" >
                        <span class="choose pull-right" ></span>
                    </div>
                </div>
            </div>
            <div class="form-cells form-cells-m-t-none" v-if="detail.proof_open==1">
                <div class="form-cell cell-pt-0 cell-pb-0">
                    <div class="choose-head">
                        <div >
                            <ul v-class="{'ul-80': (!detail.inspectorHeight && (detail.inspector.length)>12)}">
                                <li class="head-li" v-for="item in detail.inspector">
                                    <div class="head-eidt">
                                        <div class="head-img">
                                            <img v-bind:src="item.memFace" src="../../../../images/base/face.png" width="100%"/>
                                            <span class="head-icon-delete" v-show="!$first" v-click="chooseDelete($index,4)">
                                                <img src="../../../../images/base/delete.png" >
                                            </span>
                                        </div>
                                        <div class="head-name" v-text="item.memUsername">小黑</div>
                                    </div>
                                </li>
                                <div class="clearfix"></div>
                            </ul>
                            <div v-show="(detail.inspector.length)>12">
                                <div class="head-more" v-show="!detail.inspectorHeight"
                                >
                                    <div class="more-line"></div>
                                    <span class="iconfont icon-icon9 more-icon"></span>
                                    <div class="more-text">
                                        显示更多
                                    </div>
                                </div>
                                <div class="head-more" v-show="detail.inspectorHeight"
                                >
                                    <div class="more-line"></div>
                                    <span class="iconfont icon-icon10 more-icon"></span>
                                    <div class="more-text">
                                        收起
                                    </div>
                                </div>
                            </div>
                            <div class="head-li-none" v-show="(detail.inspector.length)==0">
                                <span v-show="errcode==0">当前暂无人员信息</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="from-other" v-show="detail.proof_open==1">报名成功的用户会获得一个二维码，用户可以截图或进入活动查看，由签到人在活动现场扫码签到。</div>

            <div class="from-other">
                select选择框
            </div>
            <div class="form-cells">
                <div class="form-cell">
                    <div class="form-cell-title">
                        单项选择
                    </div>
                    <div class="form-cell-content form-select right-arrow" >
                        <div class="select-value" >
                            <!--<span v-if="detail.deadline_remind_time.key!=0"  v-text="detail.deadline_remind_time.value"></span><span v-if="detail.deadline_remind_time.key==0" class="">不提醒</span>-->
                            <!--<span class="iconfont right"></span>-->
                        </div>
                        <div class="select-key">
                            <select v-model="detail.deadline_remind_time" >
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="from-other">
                单项选择
            </div>
            <div class="form-cells">
                <div class="form-cell">
                    <div class="form-cell-title">
                        单项选择
                    </div>
                </div>
            </div>
        </div>
        <div class="title text-center">登录</div>
        <div class="form-template">
            <div class="form-cells">
                <div class="form-cell">
                    <div class="form-cell-title">
                        用户名
                    </div>
                    <div class="form-cell-content form-control">
                        <input type="text" placeholder="请输入名称" v-model="user.name" />
                        <span class="form-error" v-show="true "><i class="iconfont icon-gantan"></i></span>
                        <span class="form-success" v-show="false"><i class="iconfont icon-xuanze_"></i></span>
                    </div>
                </div>
                <div class="form-cell">
                    <div class="form-cell-title">
                        密码
                    </div>
                    <div class="form-cell-content form-control">
                        <input type="text" placeholder="请输入密码" maxlength="11" v-model="user.password"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn text-center" v-on:click="login">登录</div>
    </div>
</template>

<script>
    import api from "../../../api/dome-api";
    export default {
        name: 'demo-http',
        data() {
            return {
                detail:{},
                user:{
                    name:"",
                    password:""
                }
            }
        },
        created() {
            //页面创建完成后
            //自定义标题
            this.page.setTitle("演示数据请求");
        },
        watch: {
            //监听动态路由
        },
        methods: {
            //页面方法
            login:function(){
                var params={
                    uid:'F76F3B467F0000012B1D0FB5B5FD3B6F',
                    _identifier:'common'
                }
                api.login(params).then(function (data) {
                    if(data.errcode == 0){
                        alert("登录成功")
                    }
                });
            },
        },
        components:{
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../../css/config/variables";
    .demo-http{
        //页面样式
        .title{
            margin: 20/100rem 0;
            background: @body-bg;
            height: 80/100rem;
            line-height: 80/100rem;
        }
        .btn{
            margin: 20/100rem 0;
            background: #fd6461;
            height: 80/100rem;
            line-height: 80/100rem;
            color: @body-bg;
        }
    }
</style>