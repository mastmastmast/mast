<template>
  <div class="">
    <div style="text-align: left" class="navbar-back">
      <navbar :data="navbar"/>
    </div>
    <div class="box mt20 log-list">
      <!--搜索-->
      <el-row class="">
        <div class="fr search-log">
          <el-input v-model="input" placeholder="请输入登录名或用户名"  class="select fl" ></el-input>
          <el-button class="btn green fr" @click="selectLogAll(1)">查询</el-button>
        </div>
      </el-row>
      <!--用户列表-->
      <el-row>
        <el-table class="yc-table default update-status"
                  id="log-list-table"
                  :data="logList"
                  border
                  style="width: 100%">
          <el-table-column
              :show-overflow-tooltip="true"
              label="序列"
              type="index"
              width="60">
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              prop="loginName"
              label="登录账号"
              width="100">
            <template slot-scope="scope">
              <span style="cursor:pointer;">{{ scope.row.loginName }}</span>
            </template>
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              prop="userName"
              label="用户名称"
              width="100">
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              prop="phone"
              label="手机"
              width="160"
          >
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              prop="operationType"
              label="操作类型"
              width="120">
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              prop="description"
              label="操作描述"
              width="220">
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              prop="requestUrl"
              label="访问服务器地址">
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              prop="clientIp"
              label="客户端IP"
              width="240">
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              prop="dateCreated"
              label="操作日期"
              width="200">
          </el-table-column>
        </el-table>
      </el-row>

      <!--分页-->
      <el-row>
        <pagination :pagination="paginationData"
                    :container="container"
                    @changePage="handlePageChange"/>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {log} from "../../api/api-setting";
  import {dialog} from "../../assets/js/dialog";
  export default {
    name: "LogList",
    data () {
      return {
        input: '',
        navbar: {
          prevs: [
            {
              name: '系统管理',
              path: ''
            }
          ],
          current: '日志列表'
        },
        paginationData: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          url: 'log/selectLogAll',
          params: {},
        },
        logList: [],
        container: null,
      }
    },
    methods: {
      handlePageChange(data) {
        this.paginationData = data.pagination;
        this.logList = data.tableData;
      },
      selectLogAll (pageNum) {
        if (pageNum) {
          this.paginationData.pageNum = pageNum
        }
        //去除空格
        if(this.input) {
          this.input = this.input.replace(/\s*/g,'')
        }
        let params={
          keyWord: this.input,
          pageNum: this.paginationData.pageNum,
          pageSize: this.paginationData.pageSize
        }
        log.selectLogAll(params).then((res)=>{
          if (res.code === '200'){
            let data = res.data;
            this.paginationData.total = data.total;
            this.paginationData.params = params;
            let logList = data.listData;
            this.logList = logList;
          } else {
            dialog.error(res.message);
          }
        })
      },
    },
    created() {
      this.selectLogAll();
    },
    mounted() {
      this.container = document.getElementById("log-list-table")
    }
  }
</script>

<style scoped lang="scss">
  .log-list {
    height: 720px;
  }
  .search-log {
    width: 326px;
    .select {
      width: 250px;
      height: 32px;
    }
    .btn {
      margin-left: 10px;
      width: 66px;
      height: 36px;
      vertical-align: top;
    }
  }
</style>
