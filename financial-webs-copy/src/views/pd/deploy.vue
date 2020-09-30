<template>
  <div class="all">
    <div style="text-align: left" class="navbar-back">
      <navbar :data="navbar" />
    </div>
    <div class="box mt20 user-list">
      <!--头部新增、搜索-->
      <el-row class="">
        <el-button class="btn add fl" @click="dialogVisible1 = true"
          >新增任务</el-button
        >
        <div class="fr search-user">
          <el-input
            v-model="input"
            placeholder="请输名字搜索"
            class="select fl"
          ></el-input>
          <el-button class="btn green fr" @click="getCamerasAll()"
            >搜索</el-button
          >
        </div>
      </el-row>
      <!--新增人员弹出层-->
      <el-dialog
        v-if="hasReload1"
        title="新增布控任务"
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
          <el-form-item label="任务名称：" prop="name">
            <el-input
              type="text"
              maxlength="20"
              v-model="addUserForm.name"
              autocomplete="off"
              placeholder="请输入任务名(20字以内)"
            ></el-input>
          </el-form-item>
          <el-form-item label="布控阈值："  prop="sto">
            <el-input
              type="text"
              maxlength="2"
              disabled
              v-model.number="addUserForm.phoneName"
              placeholder="禁用"
            ></el-input>
          </el-form-item>

          <el-form-item label="布控库：" prop="nameId">
            <el-select v-model="addUserForm.nameId" placeholder="请选择库">
              <el-option
                v-for="item in monitorListAll"
                :value="item.id"
                :label="item.name"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务描述：">
    <el-input type="textarea" v-model="addUserForm.description"></el-input>
  </el-form-item>
          <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog> -->
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
      <!--用户列表-->
      <el-row>
        <el-table
          class="yc-table default update-status"
          id="user-list-table"
          :data="deployList"
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
            prop="taskName"
            label="任务名称"
            width="180"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="description"
            label="任务描述"
            width="220"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="bkName"
            label="布控库名称"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="createTime"
            label="布控阈值"
            width="280"
          >
          </el-table-column>

          <el-table-column
            :show-overflow-tooltip="true"
            prop="status"
            label="布控任务状态"
            width="220"
          >
          <template slot-scope="scope">
            <i v-if="scope.row.status">已布控</i>
            <i v-else>未布控</i>
          </template>

          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="createTime"
            label="录入时间"
            width="260"
          >
          <template slot-scope="scope">{{
              scope.row.createTime | formatDate
            }}</template>
          </el-table-column>

          <el-table-column
            :show-overflow-tooltip="true"
            label="操作"
            width="180"
          >
            <template slot-scope="scope">
              <el-switch
                  v-model="scope.row.status"
                  @click.native="updateUserStatus(scope.row)"
                  active-color="#e95906">
              </el-switch>
              <i
                class="yc-icon yc-icon-smile mr10"
                style="font-size: 20px"
                @click="
                  dialogVisible3 = true;
                  (userId = scope.row.id), updateUserCamera(scope.row);
                "
              ></i>
              <i
                class="yc-icon yc-icon-edit mr10"
                style="font-size: 20px"
                @click="
                  dialogVisible2 = true;
                  (userId = scope.row.id);
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
        title="修改布控任务信息"
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
          <el-form-item label="任务名称：" prop="name">
            <el-input
              type="text"
              maxlength="12"
              v-model="updateUserForm.name"
              autocomplete="off"
              placeholder="请输入任务名(20字以内)"
            ></el-input>
          </el-form-item>
          <el-form-item label="布控阈值：" prop="phoneName">
            <el-input
              type="text"
              maxlength="2"
              v-model="updateUserForm.phoneName"
              placeholder="请输有效数字"
            ></el-input>
          </el-form-item>
        
          <el-form-item label="布控库：" prop="nameId">
            <el-select v-model="updateUserForm.nameId" placeholder="请选择库">
              <el-option
                v-for="item in monitorListAll"
                :value="item.id"
                :label="item.name"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务描述：">
    <el-input type="textarea" v-model="updateUserForm.description"></el-input>
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

      <!-- 部署布控任务页面 -->
      <el-dialog
        v-if="hasReload3"
        title="布控部署任务"
        :visible.sync="dialogVisible3"
        width="40%"
        :before-close="handleClose3"
      >
      <!-- 搜索框 -->
       <div class="demo-input-suffix" style="margin-left: 40px">
          <el-input
            placeholder="请输入名字搜索"
            suffix-icon="el-icon-search"
            v-model="input1"
            @change="search1()"
            style="width: 180px"
          >
          </el-input>
          <el-select
            v-model="select1"
            slot="prepend"
            placeholder="请选择标签"
            style="margin-left: 20px"
          >
          <!-- 三级联动搜索框 -->
            <el-option
              v-for="item in canera1"
              :value="item.categoryId"
              :label="item.name"
              :key="item.id"
            ></el-option>
          </el-select>
        </div>
         
       <!-- <el-checkbox-group v-model="checkbox" @change="getcheckList">
         <el-checkbox  v-for="(item,index) in cameraAll" :label="item.deviceName" :key="index"></el-checkbox>
         </el-checkbox-group>  -->
         <div>
          <el-table
    ref="multipleTable"
    :data="cameraAll"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="deviceName"
      label="摄像机名称"
      >
    </el-table-column>
   
  </el-table>
         </div>
         

        <span slot="footer" class="dialog-footer">
           <!-- 相机列表的分页 -->
           <el-row>
       
          </el-row>

          <el-button class="btn cancel"
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
import { camera } from "../../api/api-deploy";
import { dialog } from "../../assets/js/dialog";
import { user } from "../../api/api-setting";
export default {
  name: "deploy",
  data() {
    return {
      total:0,
      total1:0,
      canera1:[],
      checkList: [],
      input1:"",
      select1:"",
      input:"",
      deployList:[],// 布控任务列表
      monitorListAll:[],// 获取所有布控库的名称
      checkbox:[],
      cameraAll:[
        {"name":"佳1","id":"1"},
        {"name":"佳2","id":"2"},
        {"name":"佳3","id":"3"},
        {"name":"佳4","id":"4"},
      ],//所有相机列表
      roleArr: [],
      rule1: false,
      name: "", //角色id
      card: "", //查询输入框
      disabled1: false, //新增确认按钮状态
      disabled2: false, //修改确认按钮状态
      disabled3: false, //修改确认按钮状态
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
        current: "布控任务",
      },
      // userList: [],
      container: null,
      container1: null,
      addUserForm: {
        taskName: "", //名字
        bkName: "", //库名
        description: "", //描述
        status: "", //是否开启状态
      },
      updateUserForm: {
       taskName: "", //名字
        bkName: "", //库名
        description: "", //描述
        status: "", //是否开启状态
      },
      rules: {
        name: [
          { required: true, message: "任务名不能为空", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "请输入任务名(20字以内)",
            trigger: "blur",
          },
        ],
      },
        pageNum: 1,
        pageSize: 10,
      // 相机列表的分页
        pageNum1: 1,
        pageSize1: 10,
       
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
        if (valid) {
          //验证成功后发送ajax,ajax结束前禁用按钮
          this.disabled1 = true;
          this.addUser();
        } else {
          //验证失败,对话框继续显示
          return false;
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
        } else {
          //验证失败,对话框继续显示
          return false;
        }
      });
    },
    // 部署摄像头详细页面
    submitForm3() {
      this.$refs["updateUserForm"].validate((valid) => {
        if (valid) {
          //验证成功后发送ajax,ajax结束前禁用按钮
          this.disabled3 = true;
          this.updateUser();
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
        this.objEmpty(this.addUserForm);
        //初始密码
        this.hasReload1=false;
        this.$nextTick(()=>{
          this.hasReload1=true;
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
    //获取布控任务列表
    getDeployAll() {
      let params={
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      // 发送请求
      camera.deployList(params).then((res) => {
        if (res.code === "200") {
          this.total = res.data.total;
          res.data.list.forEach((item,index) => {
            if(item.status==1){
            item.status = true;
            }else{
            item.status = false;
            }
          })
          // console.log(res.data.list);
          this.deployList = res.data.list;
          // console.log('this.deployList');
        } else {
          dialog.error(res.message);
        }
      });
    },
     // 获取布控库名称列表
    deployListAll(){
      camera.deployListAll().then((res) => {
        if (res.code === "200") {
          this.monitorListAll = res.data;
          console.log(res.data);
        } else {
          dialog.error(res.message);
        }
      });
    },
    
    //新增用户
    addUser() {
      // console.log(this.addUserForm.nameId);
      let params = {
       taskName: this.addUserForm.name,
        description: this.addUserForm.description,
       bkId: this.addUserForm.nameId,
       threshold:1//布控的阈值
      };
      camera.deployAdd(params).then((res)=>{
        if(res.code==='200') {
          this.objEmpty(this.addUserForm);
          dialog.success('新增任务成功');
          this.getDeployAll();
          this.hasReload1=false;
          this.disabled1 = false;
          this.dialogVisible1 =false;
          this.$nextTick(()=>{
            this.hasReload1=true;
            // alert("我执行了")
          });
        } else {
          //失败则不隐藏对话框
          this.objEmpty(this.addUserForm);
          dialog.error(res.message);
          this.dialogVisible1 =true;
          this.disabled1 = false;
            // alert("我失败了")
        }
      })
      
    },
    //每次取消新增,清空新增表单数据/清空表单验证
    noAddUser() {
      this.objEmpty(this.addUserForm);
      this.addUserForm.password = "";
      this.hasReload1 = false;
      this.$nextTick(() => {
        this.hasReload1 = true;
      });
    },
    //分页事件
    handleCurrentChange(e) {
      console.log(e);
      this.pageNum = e;
      this.getDeployAll();
    },
     // 相机列表的分页事件
    handlePageChange1(a) {
      console.log(e);
      this.pageNum = e;
      this.getCamerasAll();
    },
    
    //修改用户信息
    updateUser() {
      //参数 用户信息 用户id
      let params = {
        taskName: this.addUserForm.name,
        description: this.addUserForm.description,
       bkId: this.addUserForm.nameId,
       threshold:1//布控的阈值
      };
      camera.Update(params).then((res) => {
        if (res.code === "200") {
          dialog.success("用户修改成功");
          //修改成功后清空数据,隐藏对话框
          this.objEmpty(this.updateUserForm);
          this.dialogVisible2 = false;
          this.disabled2 = false;
          this.getDeployAll();
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
    //取消修改用户信息,清空修改用户表单信息,表单验证
    noUpdateUser() {
      //清空数据
      this.objEmpty(this.updateUserForm);
      this.userId = "";
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
          camera.deleteUser(params).then((res) => {
            if (res.code === "200") {
              dialog.success(res.message);
              this.getDeployAll();
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
  // 获取所有相机列表
   getCamerasAll(){
      // 发送请求
      let params={
          // keyWord: this.input,
          pageNum: this.pageNum1,
          pageSize: this.pageSize1,
        }
     camera.cameraAll(params).then((res) => {
        if(res.code === "200") {
          this.cameraAll = res.data;
          let data = res.data;
            this.total1 = data.total;
            this.cameraAll=res.data.list;  
          // console.log(res.data.list);
        } else {
          dialog.error(res.message);
        }
      });
    // alert("getCamerasAll")
   },

    //更改用户启用和禁用信息
      updateUserStatus (row) {
        let params = {};
        params.id = row.id;
        if (row.status) {
          camera.updateUserStatus(params).then((res)=>{
          if(res.code==='200') {
            dialog.success('状态更改成功');
            this.getDeployAll();
          } else {
            dialog.error(res.message);
          }
        })
     } else {
          camera.updateUserStop(params).then((res)=>{
          if(res.code==='200') {
            dialog.success('状态更改成功');
            this.getDeployAll();
          } else {
            dialog.error(res.message);
          }
        })
        }
        
       
      },
    // 
      getcheckList(val){
        console.log(val);
        console.log(this.checkbox);
     },

},
  created() { 
 //  人员列表请求
   this.getDeployAll();
  //  获取所有布控库列表
   this.deployListAll();
  //  获取所有相机列表
   this.getCamerasAll();
  },
  mounted() {
    this.container = document.getElementById("user-list-table");
  //  this.getCameraAll();
   
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

.el-checkbox-group{
  display: block !important;
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