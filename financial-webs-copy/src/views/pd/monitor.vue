<template>
  <div class="all">
    <div style="text-align: left" class="navbar-back">
      <navbar :data="navbar" />
    </div>
    <div class="box mt20 user-list">
      <!--头部新增、搜索-->
      <el-row class="">
        <el-button class="btn add fl" @click="dialogVisible1 = true"
          >新&nbsp;&nbsp;增</el-button
        >
        <div class="fr search-user">
          <el-input
            v-model="input"
            placeholder="请输库名搜索"
            class="select fl"
          ></el-input>
          <el-button class="btn green fr" @click="getSelectUserAll(1)"
            >搜索</el-button
          >
        </div>
      </el-row>
      <!--新增布控弹出层-->
      <el-dialog
        v-if="hasReload1"
        title="新增布控库"
        :visible.sync="dialogVisible1"
        width="30%"
        :before-close="handleClose1"
      >
        <el-form
          status-icon
          ref="addUserForm"
          label-width="100px"
          class="demo-ruleForm"
          :model="addUserForm"
          :rules="rules"
        >
          <el-form-item label="库名称：" prop="name">
            <el-input
              type="text"
              maxlength="10"
              v-model="addUserForm.name"
              autocomplete="off"
              placeholder="请输入库名(10字以内)"
            ></el-input>
          </el-form-item>
          <el-form-item label="目标类型：" prop="nameId">
            <el-select
              v-model="addUserForm.nameId"
              placeholder="不可选"
              disabled
            >
              <el-option
                v-for="item in roleArr"
                :value="item.value"
                :label="item.key"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="任务描述：">
            <el-input
              type="textarea"
              v-model="addUserForm.description"
            ></el-input>
          </el-form-item>
          <!-- 弹出框的 取消跟保存按钮 -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            class="btn cancel"
            @click="(dialogVisible1 = false), noAddUser()"
            >返 回</el-button
          >
          <el-button
            class="btn submit"
            @click="submitForm1()"
            :disabled="disabled1"
            >保 存</el-button
          >
        </span>
      </el-dialog>
      <!--布控库列表-->
      <el-row>
        <el-table
          class="yc-table default update-status"
          id="user-list-table"
          :data="monitorList"
          border
          style="width: 100%"
        >
          <el-table-column
            :show-overflow-tooltip="true"
            label="序列"
            type="index"
            width="100"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="name"
            label="布控库名称"
            width="180"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="description"
            label="布控库描述"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="nameId"
            label="布控目标类型"
            width="220"
          >
          </el-table-column>

          <el-table-column
            :show-overflow-tooltip="true"
            prop="createTime"
            label="录入时间"
            width="360"
          >
            <template slot-scope="scope">{{
              scope.row.createTime | formatDate
            }}</template>
          </el-table-column>

          <el-table-column
            :show-overflow-tooltip="true"
            label="操作"
            width="260"
          >
            <template slot-scope="scope">
              <i
                class="yc-icon yc-icon-smile mr10"
                style="font-size: 20px"
                @click="
                  dialogVisible3 = true;
                  (userId = scope.row.id), updateUserInfo(scope.row);
                "
              ></i>
              <i
                class="yc-icon yc-icon-edit mr10"
                style="font-size: 20px"
                @click="
                  dialogVisible2 = true;
                  (userId = scope.row.id), updateUserInfo(scope.row);
                "
              ></i>
              <i
                class="yc-icon yc-icon-delete mr10"
                style="font-size: 20px"
                @click="deleteUser(scope.row)"
              ></i>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <!--修改用户弹出层-->
      <el-dialog
        v-if="hasReload2"
        title="修改布控库"
        :visible.sync="dialogVisible2"
        width="30%"
        :before-close="handleClose2"
      >
        <el-form
          status-icon
          :model="updateUserForm"
          ref="updateUserForm"
          id="updateUserForm"
          label-width="100px"
          class="demo-ruleForm"
          :rules="rules"
        >
          <el-form-item label="库名称：" prop="name">
            <el-input
              type="text"
              maxlength="10"
              v-model="updateUserForm.name"
              autocomplete="off"
              placeholder="请输入库名(10字以内)"
            ></el-input>
          </el-form-item>
          <el-form-item label="目标类型：" prop="roleId">
            <el-select
              v-model="updateUserForm.roleId"
              disabled
              placeholder="不可选"
            >
              <el-option
                v-for="item in roleArr"
                :value="item.value"
                :label="item.key"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务描述：">
            <el-input
              type="textarea"
              v-model="updateUserForm.description"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            class="btn cancel"
            @click="(dialogVisible2 = false), noUpdateUser()"
            >取 消</el-button
          >
          <el-button
            class="btn submit"
            @click="submitForm2()"
            :disabled="disabled2"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 修改人员属性标签  框-->
      <el-dialog
        v-if="hasReload3"
        :visible.sync="dialogVisible3"
        width="30%"
        :before-close="handleClose3"
        title="详情操作"
      >
        <div class="demo-input-suffix" style="margin-left: 40px">
          <el-input
            placeholder="请输入名字搜索"
            suffix-icon="el-icon-search"
            v-model="input1"
            style="width: 180px"
          >
          </el-input>
          <el-select
            v-model="select1"
            slot="prepend"
            placeholder="请选择标签"
            style="margin-left: 20px"
          >
            <el-option
              v-for="item in namesAll"
              :value="item.categoryId"
              :label="item.name"
              :key="item.id"
            ></el-option>
          </el-select>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="标签类型"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>

        <!-- 底部按钮  -->
        <span slot="footer" class="dialog-footer">
          <el-button
            class="btn cancel"
            @click="(dialogVisible3 = false), noUpdateUser()"
            >取 消</el-button
          >
          <el-button
            class="btn submit"
            @click="submitForm3()"
            :disabled="disabled3"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <!--分页-->
      <el-row>
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="10"
          :total="total">
        </el-pagination>
      </el-row>
    </div>
  </div>
</template>

<script>
// 引入请求api
// import { camera } from "../../api/api-pd";
import { camera } from "../../api/api-monitor";
import { dialog } from "../../assets/js/dialog";
import { user } from "../../api/api-setting";
export default {
  name: "deploy",
  data() {
    return {
      // 实验数据
      tableData: [
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      total:0,
      monitorList: [], // 布控库列表
      namesAll: [], //人员属性标签
      roleArr: [],
      rule1: false,
      input:"",
      userId: "", //布控库id
      select1: "", //角色标签
      input1: "", //查询输入框
      select1List: [], //
      input1List: [], //
      disabled1: false, //新增确认按钮状态
      disabled2: false, //修改确认按钮状态
      disabled3: false, //人员属性确认按钮状态
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      navbar: {
        prevs: [
          {
            name: "首页",
            path: "",
          },
        ],
        current: "布控库",
      },
      // userList: [],
      container: null,
      addUserForm: {
        name: "", //布控库名称
        description: "", //布控库描述
      },
      updateUserForm: {
        name: "", //布控库名称
        description: "", //布控库描述
      },
      rules: {
        name: [
          { required: true, message: "库名不能为空", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "请输入(10字以内)",
            trigger: "blur",
          },
        ],
        description: [
          { required: true, message: "任务描述不能为空", trigger: "blur" },
        ],
      },
        pageNum: 1,
        pageSize: 10,
      //是否刷新弹出页面
      hasReload1: true,
      hasReload2: true,
      hasReload3: true,
    };
  },
  methods: {
    //新增用户表单验证
    submitForm1() {
      this.$refs["addUserForm"].validate((valid) => {
        this.rule1 = true;
        // alert("我肚了")
        if (valid) {
          //验证成功后发送ajax,ajax结束前禁用按钮
          this.disabled1 = true;
          this.addUser();
          // alert("我发送请求了")
        } else {
          //验证失败,对话框继续显示
          return false;
          // alert("我失败了")
        }
      });
    },
    //修改用户信息表单验证
    submitForm2() {
      this.$refs["updateUserForm"].validate((valid) => {
        if (valid) {
          //验证成功后发送ajax,ajax结束前禁用按钮
          this.disabled2 = true;
          this.updateUser();
          alert("我成功了");
        } else {
          //验证失败,对话框继续显示
          return false;
        }
      });
    },
    //清空对象
    objEmpty(obj) {
      for (let k of Object.keys(obj)) {
        obj[k] = "";
      }
    },
    handleClose1(done) {
      this.hasReload1 = false;
      this.$nextTick(() => {
        this.hasReload1 = true;
      });
      done();
    },
    handleClose2(done) {
      this.hasReload2 = false;
      this.$nextTick(() => {
        this.hasReload2 = true;
      });
      done();
    },
    handleClose3(done) {
      this.hasReload3 = false;
      this.$nextTick(() => {
        this.hasReload3 = true;
      });
      done();
    },
    //获取布控库列表
    getMonitorAll() {
      let params={
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
      // 发送请求
      camera.monitorList(params).then((res) => {
        if (res.code === "200") {
          this.total = res.data.total;
          this.monitorList = res.data.list;
        } else {
          dialog.error(res.message);
        }
      });
    },

    // 分页
    handleCurrentChange(e) {
      console.log(e);
      this.pageNum = e;
      this.getMonitorAll();
    },

    //新增用户
    addUser() {
      let params = {
        name: this.addUserForm.name,
        description: this.addUserForm.description,
      };
      camera.monitorAdduser(params).then((res) => {
        if (res.code === "200") {
          this.objEmpty(this.addUserForm);
          this.dialogVisible1 = false;
          this.disabled1 = false;
          dialog.success("新增用户成功");
          this.getMonitorAll();
          this.hasReload1 = false;
          this.$nextTick(() => {
            this.hasReload1 = true;
          });
        } else {
          //失败则不隐藏对话框
          this.objEmpty(this.addUserForm);
          dialog.error(res.message);
          this.dialogVisible1 = true;
          this.disabled1 = false;
          // alert("失败哦");
        }
      });
    },
    //每次取消新增,清空新增表单数据/清空表单验证
    noAddUser() {
      this.objEmpty(this.addUserForm);
      this.hasReload1 = false;
      this.$nextTick(() => {
        this.hasReload1 = true;
      });
    },
   
    //修改用户信息
    updateUser() {
      //参数 用户信息 用户id
      let params = {
        id: this.userId,
        name: this.updateUserForm.name,
        description: this.updateUserForm.description,
      };
      camera.monitorUpdateUser(params).then((res) => {
        if (res.code === "200") {
          dialog.success("用户修改成功");
          //修改成功后清空数据,隐藏对话框
          this.userId = "";
          this.objEmpty(this.updateUserForm);
          this.dialogVisible2 = false;
          this.disabled2 = false;
          // this.getSelectUserAll();
          this.getMonitorAll();
          this.hasReload2 = false;
          this.$nextTick(() => {
            this.hasReload2 = true;
          });
        } else {
          dialog.error(res.message);
          //修改失败,显示对话框
          this.dialogVisible2 = true;
          this.disabled2 = false;
        }
      });
    },
    // 失去焦点触发
    noChange() {
      if (this.input1 != "") {
        let params = {};
        params.id = this.userId;
        params.name = this.input1;
        camera.monitorSearch(params).then((res) => {
          if (res.code === "200") {
            dialog.success("搜索成功");
            this;
          } else {
            dialog.error(res.message);
          }
        });
      }
    },

    //取消修改用户信息,清空修改用户表单信息,表单验证
    noUpdateUser() {
      //清空数据
      this.objEmpty(this.updateUserForm);
      this.userId = "";
      this.input1 = "";
      this.select1 = "";
      this.hasReload2 = false;
      this.$nextTick(() => {
        this.hasReload2 = true;
      });
    },

    //删除用户
    deleteUser(row) {
      let params = {};
      params.id = row.id;
      dialog.confirm(
        this,
        "确认删除用户",
        () => {
          camera.monitorDeleteUser(params).then((res) => {
            if (res.code === "200") {
              dialog.success(res.message);
              this.getMonitorAll();
            } else {
              dialog.error(res.message);
            }
          });
        },
        () => {
          return false;
        }
      );
    },
    // 获取人员属性标签列表
    emphasisLabel() {
      // 发送请求
      camera.emphasisLabel().then((res) => {
        if (res.code === "200") {
          console.log(res.data);
          this.namesAll = res.data;
        } else {
          dialog.error(res.message);
        }
      });
    },
    handleSelectionChange(){},
  },
  created() {},
  mounted() {
    this.container = document.getElementById("user-list-table");
    //  布控库列表请求
    this.getMonitorAll();
    //  人员属性s标签请求s
    this.emphasisLabel();
  },
  filters: {
    // 时间过滤
    formatDate: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    },
  },
};
</script>
<style lang="scss" scoped>
.demo-input-suffix {
  margin-left: 20px;
}
.user-list {
  height: 720px;
}
.search-user {
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
.update-status {
  .el-switch.is-disabled {
    .el-switch__core {
      cursor: pointer;
    }
  }
  .yc-icon {
    cursor: pointer;
  }
}
.spans {
  border: 2px solid #f45411;
  border-radius: 10px;
  font-size: 20px;
  padding: 5px;
  margin-top: 100px;
}
</style>