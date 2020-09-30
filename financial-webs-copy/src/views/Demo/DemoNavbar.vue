<template>
  <div>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本用法</span>
        </div>
        <div style="text-align: left">
          <navbar :data="data"/>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "DemoNavbar",
    data() {
      return {
        data: {
          prevs: [
            {
              name: '首页',
              path: '/home'
            }
          ],
          current: '企业搜索'
        }
      }
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped lang="scss">

</style>