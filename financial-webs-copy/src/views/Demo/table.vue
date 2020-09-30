<template>
    <div>
        <el-row class="mb50">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>yc-table.default的用法</span>
                </div>
                <div style="text-align: left">
                    <el-row>
                        <el-table class="yc-table default mt20"
                                  :data="tableData1"
                                  border>
                            <el-table-column
                                    width="200px"
                                    prop="name"
                                    :show-overflow-tooltip="true"
                                    label="公司名称标题文字太长我不会换行"
                            >
                            </el-table-column>
                            <el-table-column
                                    :show-overflow-tooltip="true"
                                    prop="note"
                                    label="企业"
                            >
                            </el-table-column>
                        </el-table>
                    </el-row>
                </div>
            </el-card>
        </el-row>
        <el-row class="mb50">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>yc-table.nowrap-th的用法，表头内容过长不换行</span>
                </div>
                <div style="text-align: left">
                    <el-row>
                        <el-table class="yc-table nowrap-th mt20"
                                  :data="tableData1"
                                  border>
                            <el-table-column
                                    width="200px"
                                    prop="name"
                                    label="公司名称标题文字太长我会换行哦"
                                    :show-overflow-tooltip="true"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="note"
                                    label="企业"
                                    :show-overflow-tooltip="true"
                            >
                            </el-table-column>

                        </el-table>
                    </el-row>
                </div>
            </el-card>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "ycTable",
        props: [''],
        data() {
            return {
                tableData1: [
                    {name: 'xxx公司1', note: '备注'},
                    {name: 'xxx公司2', note: '备注'},
                    {name: 'xxx公司3太多了文字就会显示省略号', note: '备注'}
                ]
            }
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/demo";
</style>