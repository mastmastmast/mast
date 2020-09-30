<!--用于展示组件使用方法的demo页面-->
<template>
  <!--<div class="demo-wrapper">-->
  <!--<div class="demo-header"></div>-->
  <div class="demo-main">
    <div class="demo-sidebar">
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo">
        <el-submenu v-for="(item,index) in menuItems" :key="index" :index="''+index+1">
          <template slot="title">
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group v-if="item.children &&item.children.length>0">
            <el-menu-item v-for="(subItem,subIndex) in item.children" :index="index+1+'-'+subIndex+1"
                          :key="'subindex_'+subIndex"
                          @click="currentComponent=subItem.component">{{subItem.name}}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="demo-content">
      <!--<router-view/>-->
      <component :is="currentComponent"/>
    </div>
  </div>
  <!--</div>-->
</template>

<script>
  import DemoIcon from './DemoIcon'
  import DemoButton from './button';
  import ContentBox from './contentBox';
  import DemoLabel from './demoLabel';
  import DemoPagination from './demoPagination';
  import DemoDialog from './dialog';
  import JsDialog from './jsDialog'
  import DemoTable from './table';
  import MsgList from './msgList';
  import Tabs from './DemoTabs';
  import DemoVerticalTable from './DemoVerticalTable';
  import DemoNavbar from './DemoNavbar';

  export default {
    name: "demo",
    data() {
      return {
        currentComponent: 'DemoIcon',
        menuItems: [
          {
            name: '样式组件',
            children: [
              {
                name: '字体图标',
                component: 'DemoIcon'
              },
              {
                name: 'button 按钮',
                component: 'DemoButton'
              },
              {
                name: 'content-box 内容块',
                component: 'ContentBox'
              },
              {
                name: 'yc-table 表格',
                component: 'DemoTable'
              },
              {
                name: '弹出层',
                component: 'DemoDialog'
              },
              {
                name: '分页条',
                component: 'DemoPagination'
              },
              {
                name: 'label标签',
                component: 'DemoLabel'
              },
              {
                name: '消息列表',
                component: 'MsgList'
              },
              {
                name: 'tabs标签页',
                component: 'Tabs'
              }
            ]
          },
          {
            name: 'js组件',
            children: [
              {
                name: '消息提示框',
                component: 'JsDialog'
              }
            ]
          },
          {
            name: 'vue组件',
            children: [
              {
                name: 'verticalTable纵向表格',
                component: 'DemoVerticalTable'
              },
              {
                name: 'navrbar 头部快速导航',
                component: 'DemoNavbar'
              }
            ]
          }
        ]
      }
    },
    components: {
      DemoIcon, DemoButton, ContentBox,
      DemoLabel, DemoPagination, DemoDialog,
      JsDialog, DemoTable, MsgList, Tabs, DemoVerticalTable,
      DemoNavbar
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/demo";
</style>