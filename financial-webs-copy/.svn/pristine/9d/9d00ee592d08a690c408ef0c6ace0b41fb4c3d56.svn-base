<template>
  <div>
    <el-row>
      <el-row class="mb50">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>pagination分页样式组件</span>
          </div>
          <div style="text-align: left">
            <el-row>
              <pagination :pagination="paginationData"/>
            </el-row>
          </div>
        </el-card>
      </el-row>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "demoPagination",
    props: [''],
    data() {
      return {
        paginationData: {
          pageNum: 2,
          pageSize: 10,
          total: 100,
          maxPage: 10,
          url: '',
          params: {}
        }
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