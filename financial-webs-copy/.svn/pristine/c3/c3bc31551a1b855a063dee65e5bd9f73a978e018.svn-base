<template>
  <div>
    <el-row class="mb50">
      <el-card class="box-card">
        <div style="text-align: left">
          contentBox内容块样式组件的scss文件位于 src/assets/css/components/content-box.scss
        </div>
      </el-card>
    </el-row>
    <el-row class="mb50">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基础用法</span>
        </div>
        <div style="text-align: left">
          <div class="content-box">
            <div class="content-box-title"><span class="title-content">这里是标题</span></div>
            <div class="content-box-body">
              这里是body内容
            </div>
          </div>
          <el-row class="mt50">
            <p>使用方法</p>
            <pre class="code">
                        &lt;div class="content-box"&gt;
                        &lt;div class="content-box-title"&gt;&lt;span class="title-content"&gt;这里是标题&lt;/span&gt;&lt;/div&gt;
                        &lt;div class="content-box-body"&gt;
                        这里是body内容
                        &lt;/div&gt;
                        &lt;/div&gt;
                    </pre>
          </el-row>
        </div>
      </el-card>
    </el-row>
    <el-row class="mb50">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>标题中带描述信息</span>
        </div>
        <div style="text-align: left">
          <div class="content-box">
            <div class="content-box-title">
              <span class="title-content">这里是标题</span>
              <span class="desc fr" style="margin-right:15px;">我是描述信息<em>强调</em></span>
            </div>
            <div class="content-box-body">
              这里是body内容
            </div>
          </div>
          <el-row class="mt50">
            <p>使用方法</p>
            <pre class="code">
                        &lt;div class="content-box"&gt;
                        &lt;div class="content-box-title"&gt;
                            &lt;span class="title-content"&gt;这里是标题&lt;/span&gt;
                            &lt;span class="desc fr " style="margin-right:15px;"&gt;我是描述信息&lt;em&gt;强调&lt;/em&gt;&lt;/span&gt;
                            &lt;/div&gt;
                        &lt;div class="content-box-body"&gt;
                        这里是body内容
                        &lt;/div&gt;
                        &lt;/div&gt;
                    </pre>
          </el-row>
        </div>
      </el-card>
    </el-row>
    <el-row class="mb50">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>标题中带操作</span>
        </div>
        <div style="text-align: left">
          <div class="content-box">
            <div class="content-box-title">
              <span class="title-content">这里是标题</span>
              <div class="operation">
                <el-button class="fr btn default">按钮</el-button>
                <el-select class="fl" style="width:150px">
                  <el-option value="">下拉</el-option>
                </el-select>
              </div>
            </div>
            <div class="content-box-body">
              这里是body内容
            </div>
          </div>
          <el-row class="mt50">
            <p>使用方法</p>
            <pre class="code">
                        &lt;div class="content-box"&gt;
                        &lt;div class="content-box-title"&gt;
                            &lt;span class="title-content"&gt;这里是标题&lt;/span&gt;
                            &lt;div class="operation"&gt;
                                &lt;el-button class="fr">按钮&lt;/el-button&gt;
                                &lt;el-select class="fl" style="width:150px"&gt;
                                    &lt;el-option value=""&gt;下拉&lt;/el-option&gt;
                                &lt;/el-select&gt;
                            &lt;/div&gt;
                            &lt;/div&gt;
                        &lt;div class="content-box-body"&gt;
                        这里是body内容
                        &lt;/div&gt;
                        &lt;/div&gt;
                    </pre>
          </el-row>
        </div>
      </el-card>
    </el-row>
    <el-row class="mb50">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>头部有背景</span>
        </div>
        <div style="text-align: left">
          <div class="content-box gray-head">
            <div class="content-box-title">
              <span class="title-content">这里是标题<em class="ml10">强调内容</em></span>

            </div>
            <div class="content-box-body">
              这里是body内容
            </div>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row class="mb50">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>嵌套的content-box</span>
        </div>
        <div>
          <div class="content-box">
            <div class="content-box-body">
              <div class="sub-content-box-1">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="content-box">
                      <div class="content-box-title">
                        <div class="title-content">嵌套的content-box</div>
                      </div>
                      <div class="content-box-body">
                        嵌套的content-box的内容
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="content-box">
                      <div class="content-box-title">
                        <div class="title-content">嵌套的content-box</div>
                      </div>
                      <div class="content-box-body">
                        嵌套的content-box的内容
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="sub-content-box-2">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="content-box gray-head">
                      <div class="content-box-title">
                        <div class="title-content">嵌套的content-box</div>
                      </div>
                      <div class="content-box-body">
                        嵌套的content-box的内容
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="content-box gray-head">
                      <div class="content-box-title">
                        <div class="title-content">嵌套的content-box</div>
                      </div>
                      <div class="content-box-body">
                        嵌套的content-box的内容
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row class="mb50">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>头部为tab的内容模块</span>
        </div>
        <div style="text-align: left">
          <div class="content-box tab">
            <ul class="tablist">
              <li v-for="(item,index) in tabItems" :key="'tab_'+index" :class="{active:activeTabIndex===index}"
                  @click="activeTabIndex=index">
                {{item.name}}
              </li>
            </ul>
            <div class="content-box-body">
              <div class="tab-content" :class="{active:activeTabIndex===index}" v-for="(item,index) in tabItems"
                   :key="'tab-content_'+index">{{item.name}} 的内容
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "contentBox",
    data() {
      return {
        tabItems: [
          {
            index: 0,
            name: '标签页一'
          },
          {
            index: 1,
            name: '标签页二'
          },
          {
            index: 2,
            name: '标签页三'
          },
        ],
        activeTabIndex: 0
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