
export default {
    install(Vue, pluginOptions = {}){

        Vue.directive("upfiled",{
            //  bind: 只调用一次，当指令第一次被绑定到元素时调用。
            //  inserte: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
            //  update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
            //  componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
            //  unbind: 只调用一次，指令与元素解绑时调用。
            bind(el,binding){
                el.onclick=function () {
                    upload()
                }
                let loading = Vue.loading;
                function upload() {
                    //判断当前页面是否存在创建的input，存在就直接使用，不存在就创建
                    if(document.getElementById('myUploadInput')){
                        input = document.getElementById('myUploadInput');
                    }else{
                        input = document.createElement('input');
                        input.setAttribute('id', 'myUploadInput');
                        input.setAttribute('type', 'file');
                        input.setAttribute('name', 'file');
                        document.body.appendChild(input);
                        input.style.display = 'none';
                    }

                    //配置可以上传的文件格式
                    var option = binding.value;
                    var fileType =option.fileType;
                    var fileMaxSize =option.fileMaxSize;
                    var xhr = new XMLHttpRequest();
                    var fd = new FormData()
                    var input;
                    input = document.createElement('input');
                    input.setAttribute('id', 'myUploadInput');
                    input.setAttribute('type', 'file');
                    input.setAttribute('name', 'file');
                    //是否开启多文件上传
                    if(option.multiple==true){
                        input.setAttribute('multiple', 'multiple');
                    }
                    document.body.appendChild(input);
                    input.style.display = 'none';
                    input.click();
                    //监听文件改变
                    input.onchange = function(){
                        if(!input.value){
                            return false;
                        }
                        var type = input.value.split('.').pop(); //获取文件类型
                        if(fileType.indexOf(type.toLocaleLowerCase()) == -1){
                            Vue.toast.show({
                                showTime: 2,
                                message: '暂不支持该类型的文件',
                                style:'error'
                            });
                            return;
                        }
                        //判断文件大小
                        if(option.fileMaxSize &&  input.files[0].size > option.fileMaxSize * 1024 * 1024){
                            Vue.toast.show({
                                showTime: 2,
                                message: '文件不能大于10',
                                style:'success'
                            });
                            return;
                        }
                        // 提交参数
                        if(option.multiple==true){
                            fd.append('file', input.files[0]);
                        }
                        fd.append('_identifier', 'newsshellhero');
                        fd.append('atMediatype', option.atMediatype);
                        loading.show('上传中...')
                        xhr.open('post',option.url );
                        xhr.onreadystatechange = function(){
                            if(xhr.readyState == 4){
                                if(xhr.status == 200){
                                    if(option.callback instanceof Function){
                                        //alert(xhr.responseText)
                                        option.callback(JSON.parse(xhr.responseText).result);
                                        loading.hide()
                                    }
                                }else{
                                    Vue.toast.show({
                                        showTime: 2,
                                        message: '上传失败，请重试11',
                                        style:'error'
                                    });
                                    loading.hide()
                                    return false
                                }
                            }
                        }
                        //这里配置上传进度，比如进度条等
                            xhr.upload.onprogress = function(event){
                            var pre = Math.floor(100 * event.loaded / event.total);
                        }
                        xhr.send(fd);
                    }
                }
            },
            update(el,binding,vnode){

            },
        })
    },


}