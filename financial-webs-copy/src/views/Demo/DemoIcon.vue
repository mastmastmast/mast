<template>
  <div>
    <el-row class="mb50">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>系统中字体图标的使用</span>
        </div>
        <div style="text-align: left">
          <el-row>
            <p class="mb50">注：所有的图标都需要添加yc-icon样式，然后再引用图标对应的样式，如下所示：</p>
            <el-row v-for="(row,index) in iconItems" :key="'row_'+index">
              <el-col :span="3" v-for="(item,itemIndex) in row" :key="index+'-'+itemIndex">
                <div class="icon-item">
                  <p class="icon"><i class="yc-icon" :class="item.class"></i></p>
                  <p class="desc">{{item.desc}}</p>
                  <p class="icon-class">{{item.class}}</p>
                </div>
              </el-col>
            </el-row>


          </el-row>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  import iconArray from './icon'

  export default {
    name: "DemoIcon",
    props: [''],
    data() {
      return {
        iconItems: []
      }
    },
    created() {
      let countPerRow = 8;
      for (let i = 0; i < iconArray.length; i += countPerRow) {
        this.iconItems.push(iconArray.slice(i, i + countPerRow));
      }
      console.log('this.iconItems', this.iconItems);
      console.log('iconArray', iconArray);
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/demo";

  .icon-item {
    .icon {
      font-size: 24px;
      color: #666;
    }
    p {
      margin-bottom: 5px;
      text-align: center;
    }
  }
</style>