<template>
  <div>
    <el-row class="mb50">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本用法</span>
        </div>
        <div style="text-align: left">
          <el-row>
            <el-button class="btn default">默认按钮</el-button>
            <el-button class="btn gray">灰色按钮</el-button>
            <el-button class="btn green">绿色按钮</el-button>
            <el-button class="btn add">添加按钮</el-button>
            <el-button class="btn cancel">取消按钮</el-button>
            <el-button class="btn submit">提交按钮</el-button>
            <el-button class="btn download" icon="el-icon-download">下载按钮</el-button>
            <el-button class="btn text">文字按钮</el-button>
            <el-button class="btn default search" icon="el-icon-search">搜索按钮</el-button>
            <el-button class="btn gray search" icon="el-icon-search">搜索按钮</el-button>
            <el-button class="btn green search" icon="el-icon-search">搜索按钮</el-button>
          </el-row>
          <el-row>
            <p>使用方法</p>
            <pre class="code">
                       &lt;el-row&gt;
                        &lt;el-button class="btn default"&gt;默认按钮 &lt;/el-button&gt;
                        &lt;el-button class="btn gray"&gt;灰色按钮 &lt;/el-button&gt;
                        &lt;el-button class="btn green"&gt;绿色按钮 &lt;/el-button&gt;
                        &lt;el-button class="btn add"&gt;添加按钮 &lt;/el-button&gt;
                        &lt;el-button class="btn default cancel"&gt;取消按钮 &lt;/el-button&gt;
                        &lt;el-button class="btn default submit"&gt;提交按钮 &lt;/el-button&gt;
                        &lt;el-button class="btn download" icon="el-icon-download"&gt;下载按钮 &lt;/el-button&gt;
                        &lt;el-button class="btn text"&gt;文字按钮 &lt;/el-button&gt;
                        &lt;el-button class="btn default search" icon="el-icon-search"&gt;搜索按钮 &lt;/el-button&gt;
                        &lt;el-button class="btn gray search" icon="el-icon-search"&gt;搜索按钮 &lt;/el-button&gt;
                        &lt;el-button class="btn green search" icon="el-icon-search"&gt;搜索按钮 &lt;/el-button&gt;
                       &lt;/el-row&gt;

                   </pre>
          </el-row>
        </div>
      </el-card>
    </el-row>
    <el-row class="mb50">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>禁用状态</span>
        </div>
        <div style="text-align: left">
          <el-row>
            <el-button class="btn default disabled" disabled>默认按钮</el-button>
            <el-button class="btn gray disabled" disabled>灰色按钮</el-button>
            <el-button class="btn green disabled" disabled>绿色按钮</el-button>
            <el-button class="btn default add disabled" disabled>添加按钮</el-button>
            <el-button class="btn gray submit disabled" disabled>提交按钮</el-button>
            <el-button class="btn text disabled" disabled>文字按钮</el-button>
            <el-button class="btn default search disabled" disabled icon="el-icon-search">搜索按钮
            </el-button>
            <el-button class="btn gray search disabled" disabled icon="el-icon-search">搜索按钮</el-button>
            <el-button class="btn green search disabled" disabled icon="el-icon-search">搜索按钮</el-button>
          </el-row>
          <el-row>
            <p>使用方法</p>
            <pre class="code">
                       &lt;el-row&gt;
                        &lt;el-button class="btn default disabled" disabled &gt;默认按钮 &lt;/el-button&gt;
                        &lt;el-button class="btn gray disabled" disabled &gt;灰色按钮 &lt;/el-button&gt;
                        &lt;el-button class="btn green disabled" disabled &gt;绿色按钮 &lt;/el-button&gt;
                        &lt;el-button class="btn add disabled" disabled &gt;添加按钮 &lt;/el-button&gt;
                        &lt;el-button class="btn submit disabled" disabled &gt;提交按钮 &lt;/el-button&gt;
                        &lt;el-button class="btn default search disabled" disabled icon="el-icon-search"&gt;搜索按钮 &lt;/el-button&gt;
                        &lt;el-button class="btn gray search disabled" disabled icon="el-icon-search"&gt;搜索按钮 &lt;/el-button&gt;
                        &lt;el-button class="btn green search disabled" disabled icon="el-icon-search"&gt;搜索按钮 &lt;/el-button&gt;
                       &lt;/el-row&gt;

                   </pre>
          </el-row>
        </div>
      </el-card>
    </el-row>


  </div>

</template>

<script>
  export default {
    name: "ycButton",
    data() {
      return {}
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  /*@import "../../assets/css/components/button";*/
  @import "../../assets/css/demo";
</style>