<template>
  <div>
    <el-row class="mb50">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>纵向表格</span>
        </div>
        <div style="text-align: left">
          <el-row>
            <p class="mb10">label的宽度固定</p>
            <vertical-table :table-data="tableData" :data-item-count-per-row="2" label-width="100px"></vertical-table>
          </el-row>
          <el-row>
            <p class="mb10">label的宽度为百分比</p>
            <vertical-table :table-data="tableData2" :data-item-count-per-row="3" label-width="30%" :ellipsis="true"></vertical-table>
          </el-row>
          <el-row>
            <p class="mb10">label有填充，设置属性fill-label="true"</p>
            <vertical-table :table-data="tableData" :data-item-count-per-row="3" label-width="30%" :fill-label="true"></vertical-table>
          </el-row>

        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  import VerticalTable from "../../components/verticalTable";
  export default {
    name: "DemoVerticalTable",
    components: {VerticalTable},
    props: [''],
    data() {
      return {
        tableData:[
          {
            key:'prop1',
            value:'字段1的值',
            label:'字段1'
          },
          {
            key:'prop2',
            value:'字段2的值',
            label:'字段2'
          },
          {
            key:'prop3',
            value:'字段3的值',
            label:'字段3'
          },
          {
            key:'prop4',
            value:'字段4的值',
            label:'字段4'
          },
          {
            key:'prop5',
            value:'字段5的值',
            label:'字段5'
          },
          {
            key:'prop6',
            value:'字段6的值',
            label:'字段6'
          },
          {
            key:'prop7',
            value:'字段7的值',
            label:'字段7'
          },
          {
            key:'prop8',
            value:'字段8的值,这里会比较长一点，真的很长，但是我不会换行哦',
            label:'字段8'
          },
          {
            key:'prop9',
            value:'字段9的值',
            label:'字段9',
            width:'100%'
          },
          {
            key:'prop10',
            value:'字段10的值',
            label:'字段10',
            width:'100%'
          }
        ],
        tableData2:[
          {
            key:'prop1',
            value:'字段1的值',
            label:'字段1',
            emphasis:true
          },
          {
            key:'prop2',
            value:'字段2的值',
            label:'字段2'
          },
          {
            key:'prop3',
            value:'字段3的值',
            label:'字段3'
          },
          {
            key:'prop4',
            value:'字段4的值',
            label:'字段4'
          },
          {
            key:'prop5',
            value:'字段5的值',
            label:'字段5'
          },
          {
            key:'prop6',
            value:'字段6的值',
            label:'字段6'
          },
          {
            key:'prop7',
            value:'字段7的值',
            label:'字段7'
          },
          {
            key:'prop8',
            value:'字段8的值,这里会比较长一点，真的很长很长，可能会换行',
            label:'字段8'
          },
          {
            key:'prop9',
            value:'字段9的值',
            label:'字段9',
            width:'100%'
          },
          {
            key:'prop10',
            value:'字段10的值',
            label:'字段10',
            width:'100%'
          }
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