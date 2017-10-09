#!/usr/bin/env bash

# 发布环境配置
PROJ_DIR="$WORKSPACE/"            # 发布工程目录
HOST=$1                           # 服务器IP
DEPLOY_DIR=$2                     # 发布生产目录
DEPLOY_ENV=$3                     # 当前发布环境
TEMP_DIR=${DEPLOY_DIR}"_temp"     # 发布临时目录
BACKUP_DIR=${DEPLOY_DIR}"_backup" # 备份目录
###############

# 加载发布工具方法
. ${PROJ_DIR}/deploy_script/tools/deploy-tool.sh

# 配置打包/部署环境
tool_config ${PROJ_DIR} ${DEPLOY_ENV}

# clean build env
tool_build_gulp ${PROJ_DIR} ${PROJ_DIR}/dist.tar.gz ${DEPLOY_ENV}

tool_backup "sourcecode_h5_pc_${DEPLOY_ENV}" ${HOST} ${DEPLOY_DIR} ${BACKUP_DIR}

tool_deploy ${PROJ_DIR} ${PROJ_DIR}/dist.tar.gz ${HOST} ${DEPLOY_DIR} ${TEMP_DIR}
