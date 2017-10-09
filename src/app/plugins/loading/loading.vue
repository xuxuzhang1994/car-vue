<template>
    <div v-show="isShow">
        <div class="mask-layer"></div>
        <div class="loading-center">
            <div class="loading-animation">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
                <div class="bar4"></div>
                <div class="bar5"></div>
                <div class="bar6"></div>
                <div class="bar7"></div>
                <div class="bar8"></div>
                <div class="bar9"></div>
                <div class="bar10"></div>
                <div class="bar11"></div>
                <div class="bar12"></div>
            </div>
            <div class="loading-message" v-text='showText'>加载中...</div>
        </div>
    </div>
</template>
<style lang="less">
    /*遮罩层*/
    .mask-layer {
        position: fixed;
        width: 100%;
        top: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0);
        z-index: 998;
    }
    .loading-center {
        position: fixed;
        width: 2.5rem;
        left: 50%;
        top: 40%;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 0.1rem;
        padding: 0.3rem 0;
        text-align: center;
        font-size: 16px;
        margin-left: -1.25rem;
        z-index: 1010;
    }
    @media screen and (max-width: 321px) {
        .loading-center {
            font-size: 16px;
        }
    }
    @media screen and (min-width: 321px) and (max-width: 400px) {
        .loading-center {
            font-size: 17px;
        }
    }
    @media screen and (min-width: 400px) {
        .loading-center {
            font-size: 19px;
        }
    }
    .loading-message {
        color: #fff;
        padding-top: 0.16rem;
    }
    .loading-animation{
        position: relative;
        display: inline-block;
        vertical-align: middle;
        width: 0.6rem;
        height: 0.6rem;
        div {
            background-color: white;
            position: absolute;
            width: 8%;
            height: 25%;
            top: 60%;
            left: 50%;
            margin-left: -4.15%;
            opacity: 0;
            border-bottom-left-radius: 0.7rem 1.2rem;
            border-bottom-right-radius: 0.7rem 1.2rem;
            -webkit-transform-origin: center -80%;
            -ms-transform-origin: center -80%;
            transform-origin: center -80%;
            -webkit-animation: fade 1s linear infinite;
        }
        .bar1 {
            -webkit-transform: rotate(0deg);
            -webkit-animation-delay: 0s;
        }
        .bar2 {
            -webkit-transform: rotate(30deg);
            -webkit-animation-delay: -0.9167s;
        }
        .bar3 {
            -webkit-transform: rotate(60deg);
            -webkit-animation-delay: -0.833s;
        }
        .bar4 {
            -webkit-transform: rotate(90deg);
            -webkit-animation-delay: -0.75s;
        }
        .bar5 {
            -webkit-transform: rotate(120deg);
            -webkit-animation-delay: -0.667s;
        }
        .bar6 {
            -webkit-transform: rotate(150deg);
            -webkit-animation-delay: -0.5833s;
        }
        .bar7 {
            -webkit-transform: rotate(180deg);
            -webkit-animation-delay: -0.5s;
        }
        .bar8 {
            -webkit-transform: rotate(210deg);
            -webkit-animation-delay: -0.41667s;
        }
        .bar9 {
            -webkit-transform: rotate(240deg);
            -webkit-animation-delay: -0.333s;
        }
        .bar10 {
            -webkit-transform: rotate(270deg);
            -webkit-animation-delay: -0.25s;
        }
        .bar11 {
            -webkit-transform: rotate(300deg);
            -webkit-animation-delay: -0.1667s;
        }
        .bar12 {
            -webkit-transform: rotate(330deg);
            -webkit-animation-delay: -0.0833s;
        }
    }
    .spinner-cc {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        width: 0.6rem;
        height: 0.6rem;

    }
    .spinner-cc div {
        background-color: white;
        position: absolute;
        width: 8%;
        height: 25%;
        top: 60%;
        left: 50%;
        margin-left: -4.15%;
        opacity: 0;
        border-bottom-left-radius: 0.7rem 1.2rem;
        border-bottom-right-radius: 0.7rem 1.2rem;
        -webkit-transform-origin: center -80%;
        -ms-transform-origin: center -80%;
        transform-origin: center -80%;
        -webkit-animation: fade 1s linear infinite;
    }
    .spinner-cc div.bar1 {
        -webkit-transform: rotate(0deg);
        -webkit-animation-delay: 0s;
    }
    .spinner-cc div.bar2 {
        -webkit-transform: rotate(30deg);
        -webkit-animation-delay: -0.9167s;
    }
    .spinner-cc div.bar3 {
        -webkit-transform: rotate(60deg);
        -webkit-animation-delay: -0.833s;
    }
    .spinner-cc div.bar4 {
        -webkit-transform: rotate(90deg);
        -webkit-animation-delay: -0.75s;
    }
    .spinner-cc div.bar5 {
        -webkit-transform: rotate(120deg);
        -webkit-animation-delay: -0.667s;
    }
    .spinner-cc div.bar6 {
        -webkit-transform: rotate(150deg);
        -webkit-animation-delay: -0.5833s;
    }
    .spinner-cc div.bar7 {
        -webkit-transform: rotate(180deg);
        -webkit-animation-delay: -0.5s;
    }
    .spinner-cc div.bar8 {
        -webkit-transform: rotate(210deg);
        -webkit-animation-delay: -0.41667s;
    }
    .spinner-cc div.bar9 {
        -webkit-transform: rotate(240deg);
        -webkit-animation-delay: -0.333s;
    }
    .spinner-cc div.bar10 {
        -webkit-transform: rotate(270deg);
        -webkit-animation-delay: -0.25s;
    }
    .spinner-cc div.bar11 {
        -webkit-transform: rotate(300deg);
        -webkit-animation-delay: -0.1667s;
    }
    .spinner-cc div.bar12 {
        -webkit-transform: rotate(330deg);
        -webkit-animation-delay: -0.0833s;
    }
    @-webkit-keyframes fade {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }


</style>
<script>
    export default {
        data() {
            return {
                isShow: false,
                showText:'加载中...'
            }
        },
        computed: {
        },
        methods: {

            /**
             * 显示动画loading
             */
            show(text) {
                this.isShow = true
                this.showText = text
            },
            /**
             * 隐藏动画loading
             */
            hide() {
                this.isShow = false
            },
        },
    }

</script>