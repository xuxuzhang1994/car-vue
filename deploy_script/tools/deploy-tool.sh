#!/usr/bin/env bash

#############
# 备份生产环境
# $1: 环境名称
# $2: 服务器IP
# $3: 发布目录
# $4: 备份目录
#############
function tool_backup() {
    back_name="backup_$1_`date +%F_%H.%M.%S`.tgz"
    echo "备份环境：$1 => $2:$3 -> $4/$back_name"
    ssh root@$2 "mkdir -p $4"
    ssh root@$2 "tar -czvf $4/$back_name $3/*"
}

#############
# 配置发布环境信息
# $1：工程目录
# $2: 发布环境
#############
function tool_config() {
    echo "配置发布环境：$2"

    cd "$1"
    cp -rf deploy_script/env/$2/* client/
    npm install --registry=http://registry.npm.taobao.org --phantomjs_cdnurl=http://cnpmjs.org/downloads
    # npm install -g bower
    #rm -rf bower_components
    #bower instasll
}

#############
# 打包工程代码
# $1：工程目录
# $2: 打包过后的压缩文件包
#
#############
function tool_build_gulp() {
    echo "打包工程：$1"
    echo "到：     $2"

    cd "$1"
    rm -f $2
    echo `pwd`
    npm run build $3

    tar -czvf $2 dist
}

#############
# 发布到服务器
# $1：工程目录
# $2: 发布的tar包路径
# $3: 服务器IP
# $4: 发布目录
# $5: 发布临时目录
#
#############
function tool_deploy() {
    echo "发布到服务器：$3"

    cd "$1"

    ssh root@$3 "mkdir -p $5 && cd $5 && pwd"
    ssh root@$3 "mkdir -p $4 && cd $4 && pwd"

    ssh root@$3 "rm -rf $5/*"
    scp $2 root@$3:$5/app.tar.gz
    ssh root@$3 "cd $5 && tar -zxvf app.tar.gz"

    ssh root@$3 "rm -rf $4/* && cp -rf $5/dist/* $4/"
    ssh root@$3 "cd $4 && pwd && ls -al"
}
