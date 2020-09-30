<template>
    <div>
        <el-row class="mb50">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>dialog.js文件中主要封装了一些消息提示框的js方法</span>
                </div>
                <div style="text-align: left">
                    <el-row>
                        <el-button class="btn default" @click="openInfo">提示</el-button>
                        <el-button class="btn default" @click="openInfo2">提示2</el-button>
                        <el-button class="btn default" @click="openSuccess">成功</el-button>
                        <el-button class="btn default" @click="openSuccess2">成功2</el-button>
                        <el-button class="btn default" @click="openWarning">警告</el-button>
                        <el-button class="btn default" @click="openWarning2">警告2</el-button>
                        <el-button class="btn default" @click="openError">错误</el-button>
                        <el-button class="btn default" @click="openError2">错误2</el-button>
                        <el-button class="btn default" @click="openConfirm">确认提示</el-button>
                        <el-button class="btn default" @click="openConfirm2">确认提示2</el-button>
                    </el-row>
                </div>
            </el-card>
        </el-row>

    </div>
</template>

<script>
    import {dialog} from "../../assets/js/dialog";

    export default {
        name: "jsDialog",
        props: [''],
        data() {
            return {}
        },
        mounted() {
        },
        methods: {
            openInfo() {
                dialog.info('这是一条提示信息');
            },
            openInfo2() {
                dialog.info2(this, '这是一条提示信息');
            },
            openSuccess() {
                dialog.success('这是一条成功信息');
            },
            openSuccess2() {
                dialog.success2(this, '这是一条成功信息');
            },
            openWarning() {
                dialog.warning('这是一条警告信息');
            },
            openWarning2() {
                dialog.warning2(this, '这是一条警告信息');
            },
            openError() {
                dialog.error('这是一条错误信息');
            },
            openError2() {
                dialog.error2(this, '这是一条错误信息');
            },
            openConfirm() {
                dialog.confirm(this, '确认进行该操作', function () {
                }, function () {

                });
            },
            openConfirm2() {
                dialog.confirm2(this, '确认进行该操作', function () {
                }, function () {

                });
            }
        }
    }
</script>

<style scoped>

</style>