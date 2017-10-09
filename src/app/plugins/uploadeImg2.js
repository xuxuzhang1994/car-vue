// import $ from 'jquery'
//
// import wxsdk from 'weixin-js-sdk';
//
// export default {
//     /**
//      * 每个插件都有的install方法，用于安装插件
//      * @param {Object} Vue - Vue类
//      * @param {Object} [pluginOptions] - 插件安装配置
//      */
//     install(Vue, pluginOptions = {}) {
//         let loading = Vue.loading;
//         let wx = wxsdk;
//         var z=5000
//         var xarr=['http://www.quanjing.com/image/2016index/yd4.jpg?v=02',
//             'http://www.quanjing.com/search.aspx?q=pe0060887&Fr=4',
//             'http://www.quanjing.com/image/2016index/ly3.jpg?v=02',
//             'http://www.quanjing.com/image/2016index/ms3.jpg?v=02',
//             'http://www.quanjing.com/image/2016index/ss2.jpg?v=02'
//         ]
//         // 预处理图片
//         function preLoadImg(source){
//             let pr = [];
//             var Q=$.Deferred();
//             xarr.forEach(url => {// 预加载图片
//                 z=z+1000
//                 let p = loadImage(url,z)
//                     .then(function(img){
//                         Q.resolve(img)
//                         console.log(img)
//                     })
//                     .catch(err => console.log(err))
//                 pr.push(p);
//             })
//             return Q.promise()
//
//
//
//             // // 图片全部加载完
//             // Promise.race(pr)
//             //     .then((x) => {
//             //        console.log(x)
//             //     });
//
//         }
//         // 预加载图片
//
//         function loadImage(url,x) {
//             return new Promise((resolve, reject) => {
//                 // let img = new Image();
//                 // img.onload = () => {
//                 //     setTimeout(function () {
//                 //         resolve(1)
//                 //     },1000)
//                 //     };
//                 // img.onerror = reject;
//                 // img.src = url;
//                 setTimeout(function () {
//                     resolve(1)
//                 },x)
//             })
//         }
//
//         /*
//         *  用来吊起微信选择图片
//         *  resolve 选择的图片localIds数组
//         * */
//         function chooseImage(config) {
//             debugger
//             return new Promise((resolve, reject) => {
//                 resolve([1,2,3,4])
//             })
//         }
//
//         /*
//         * 上传微信异步封装
//         * @localIds     本地图片id数组
//         * @             resolve返回微信服务器id
//         * */
//         function uploadImageToWx(localIds) {
//             return new Promise((resolve) => {
//                 resolve(1);
//             })
//         }
//
//         /*
//         *  用来上传图片到微信服务器，然后再上传到本地服务器
//         *  @localIds    本地图片id数组
//         *  @imageList   本地图片id数组
//         *  @index       当前第几张图片
//         *  @atId        本地服务器图片Id
//         *  @            resolve返回当前id本地服务器图片地址
//         * */
//         function uploadImage(localIds, imageList, index, atId) {
//             return new Promise((resolve) => {
//                 uploadImageToWx(localIds).then(function (serverId) {
//                     get(localIds,resolve)
//                 })
//             })
//         }
//
//         /*
//         * 用来获取本地图片地址，并发上传所有图片
//         * @resolve      返回本地服务器图片信息
//         * */
//         function get( localIds,resolve) {
//             debugger
//             if(localIds.length==1){
//                 resolve([1])
//                 return false;
//             }
//             setTimeout(function () {
//                 uploadImage(localIds.slice(1)).then(function (resDate) {
//                     console.log('resDate'+resDate)
//                     resolve([1].concat(resDate));
//                 },1000)
//
//             })
//         }
//         var uploadeImg = function (config) {
//             var Q=$.Deferred();
//             var imageList = [];
//             chooseImage(config).then(function (localIds) {
//                 uploadImage(localIds, imageList, 0, "")
//                     .then(function (promiseData) {
//                         console.log('promiseData' + promiseData)
//                         Q.resolve(promiseData)
//                 })
//             })
//             return{
//                 promise:Q.promise()
//             }
//         }
//         // var x=function () {
//         //     preLoadImg(xarr)
//         // }
//         Vue.uploade = Vue.prototype.uploade = preLoadImg;
//     }
// }