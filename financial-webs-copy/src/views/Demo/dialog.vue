<template>
    <div>
        <el-row class="mb50">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>yc-table.nowrap-th的用法，表头内容过长不换行</span>
                </div>
                <div style="text-align: left">
                    <el-row>
                        <el-button class="btn default" @click="dialogVisible=true">点我打开弹出层</el-button>
                    </el-row>
                </div>
            </el-card>
        </el-row>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
    <el-button class="btn cancel" @click="dialogVisible = false">取 消</el-button>
    <el-button class="btn submit" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "dialog",
        props: [''],
        data() {
            return {
                dialogVisible: false
            }
        },
        mounted() {
        },
        methods: {
            handleClose(done) {
                console.log('关闭对话框');
                done();
            }
        }
    }
</script>

<style scoped>

</style>