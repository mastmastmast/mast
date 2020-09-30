<template>
  <div class>
    <div style="text-align: left" class="navbar-back">
      <navbar :data="navbar" />
    </div>
    <div class="box mt20 log-list">
      <!--搜索-->
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button class="btn add fl" @click="updateGrid()">更新网格数据</el-button>
        </el-col>
        <el-col :span="2">
          <el-button class="btn add fl" @click="batchSetting()">选中批量设置</el-button>
        </el-col>
        <el-col :span="2">
          <el-button class="btn add fl" @click="selectStart()">选中开始运行</el-button>
        </el-col>
        <el-col :span="2">
          <el-button class="btn add fl" @click="selectStop()">选中停止运行</el-button>
        </el-col>
        <el-col :span="12">
          <el-upload
            class="upload-demo"
            action="financial/pd/import_excel.do"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            style="right:200px;position:absolute;"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传Excel文件</div>
          </el-upload>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple"></div>
          <el-input v-model="deviceIdCard" placeholder="监控点编号" class="select f1"></el-input>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <el-input v-model="deviceName" placeholder="监控点名称" class="select f2"></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-select v-model="status" placeholder="开启状态">
              <el-option
                v-for="item in onoff"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <!-- <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <el-select v-model="grid" placeholder="所属网格">
              <el-option
                v-for="item in grids"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>-->
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <el-button class="btn green fr" @click="findCameraList()">查询</el-button>
          </div>
        </el-col>
      </el-row>
      <!--列表-->
      <el-row>
        <el-table
          class="yc-table default update-status"
          id="camera-list-table"
          :data="cameraList"
          :cell-style="cellStyle"
          :header-cell-style="rowClass"
          border
          style="width: 100%"
        >
          <el-table-column
            :show-overflow-tooltip="true"
            prop="deviceName"
            label="监控点名称"
            width="450"
          ></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="deviceIdCard" label="监控点编号"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="areaName" label="所属区域" width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="streetName" label="所属街道" width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="communName" label="所属社区" width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="gridName" label="所属网格" width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="type" label="接入算法" width="180"></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            :formatter="formatKqzt"
            label="状态"
            width="80"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="data">
              <el-button @click="handleClick(data.row,2)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <!--分页-->
      <el-row>
        <pagination
          :pagination="paginationData"
          :container="container"
          @changePage="handlePageChange"
        />
      </el-row>
    </div>
  </div>
</template>

<script>
import { camera } from "../../api/api-pd";
import { dialog } from "../../assets/js/dialog";
export default {
  name: "cameraList",
  data() {
    return {
      input: "",
      navbar: {
        prevs: [
          {
            name: "相机列表",
            path: "",
          },
        ],
        current: "",
      },
      onoff: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "ON",
          label: "开启",
        },
        {
          value: "OFF",
          label: "关闭",
        },
      ],
      grids: [],
      kqzt: "",
      grid: "",
      deviceIdCard: "",
      deviceName: "",
      status: "",
      grid: "",
      paginationData: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        url: "pd/findCameraList",
        params: {},
      },
      cameraList: [],
      container: null,
      fileList: [],
    };
  },
  methods: {
    handlePageChange(data) {
      this.paginationData = data.pagination;
      this.cameraList = data.tableData;
    },
    findCameraList(pageNum) {
      if (pageNum) {
        this.paginationData.pageNum = pageNum;
      }
      //去除空格
      if (this.input) {
        this.input = this.input.replace(/\s*/g, "");
      }
      let params = {
        deviceIdCard: this.deviceIdCard,
        deviceName: this.deviceName,
        status: this.status,
        grid: this.grid,
        pageNum: this.paginationData.pageNum,
        pageSize: this.paginationData.pageSize,
      };
      camera.findCameraList(params).then((res) => {
        if (res.code === "200") {
          let data = res.data;
          this.paginationData.total = data.total;
          this.paginationData.params = params;
          let cameraList = data.listData;
          this.cameraList = cameraList;
        } else {
          dialog.error(res.message);
        }
      });
    }, //  行内容剧中
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "text-align:center;";
    },
    //  表头居中
    rowClass({ row, rowIndex }) {
      return "text-align:center";
    },
    formatKqzt(row, column) {
      if (row.status == null) {
        return "未知";
      }
      if (row.status.toLowerCase() == "on") {
        return "开启";
      } else if (row.status.toLowerCase() == "off") {
        return "关闭";
      } else {
        return "未知";
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
  created() {
    this.findCameraList();
  },
  mounted() {
    this.container = document.getElementById("camera-list-table");
  },
};
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
