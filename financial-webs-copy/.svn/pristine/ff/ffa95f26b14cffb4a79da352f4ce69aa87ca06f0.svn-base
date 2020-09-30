<template>
  <div class="yc-navbar">
    <span><i class="yc-icon yc-icon-home-2"></i></span>
    <div v-for="(item,index) in data.prevs" :key="'nav_'+index">
      <router-link :to="item.path" tag="span" class="link">{{item.name}}</router-link>
      <span>></span>
    </div>
    <span class="current">{{data.current}}</span>
  </div>
</template>

<script>
  export default {
    //头部导航
    name: "navbar",
    props: {
      data: {
        type: Object,
        default: function () {
          return {
            //上级菜单
            prevs: [],
            //当前位置
            current: ''
          }
        }
      }
    },
    data() {
      return {}
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .yc-navbar {
    margin:-20px -20px 0 -20px;
    padding-left:20px;
    height: 50px;
    line-height: 50px;
    background: #fff;
    font-size: 14px;
    color: #999;
    border-top: 1px solid #eee;
    > div {
      display: inline-block;
    }
    .yc-icon {
      font-size: 16px;
    }
    span {
      margin-right: 5px;
      &.link {
        cursor: pointer;
      }
    }
    .current {
      color: #666;
    }
  }
</style>