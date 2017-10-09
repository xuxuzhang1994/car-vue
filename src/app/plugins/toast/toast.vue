<template>
    <div>
        <transition >
            <div v-show='isShow' id='toast' class="v-toast-default v1-toast" :class='style'>{{message}}</div>
        </transition>
    </div>
</template>
<style>
    .v-toast {
        position: fixed;
        left: 50%;
        max-width: 40%;
        min-width: 40%;
        padding: 5px 10px;
        text-align: center;
        word-break: break-all;
        -webkit-transform: translate3d(-50%, 0, 0);
        transform: translate3d(-50%, 0, 0);
        z-index: 5;
    }
    .v-toast-default {
        color: #fff;
        background: rgba(0, 0, 0, .8);
        /*border-radius: 5px;*/
        /*box-shadow: 0 0 10px #000;*/
    }

    .v-toast-seaBlue {
        color: #fff;
        background: rgba(0, 69, 107, .7);
        border-radius: 5px;
        box-shadow: 0 0 10px rgb(0, 69, 107);
    }

    .v-toast-bottom {
        bottom: 50px;
    }

    .v-toast-top {
        top: 50px;
    }

    .v1-toast {
        top: 0;
        position: fixed;
        left: 0;
        right: 0;
        padding: .23rem .2rem;
        font-size: .24rem;
        word-break: break-all;
        z-index: 5;
    }

    .v-toast-error {
        color: #fff;
        background: rgba(253, 112, 112, .9);
        border-bottom: 1px solid #ff5757;
    }

    .v-toast-success {
        color: #fff;
        background: rgba(84, 221, 171, .9);
        border-bottom: 1px solid #49c99a;
    }

    .v-toast-lost {
        color: #ffa200;
        background: rgba(255, 238, 202, .9);
        border-bottom: 1px solid #ffcd5c;
    }
</style>
<script>
    export default {
        data() {
            return {
                isShow: false,
                message: '',
                style: ''
            }
        },
        computed: {

        },
        methods: {
            /**
             * 显示
             */
            show(config) {
                console.log(config)
                this.message = config.message;
                this.style = config.style ? config.style : ''
                this.isShow = true;
            },
            /**
             * 隐藏
             */
            hide() {
                this.isShow = false
            },
        },
    }
</script>