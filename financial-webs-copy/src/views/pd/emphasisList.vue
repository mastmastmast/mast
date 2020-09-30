<template>
  <div class="all">
    <div style="text-align: left" class="navbar-back">
      <navbar :data="navbar" />
    </div>
    <div class="box mt20 user-list">
      <!--头部新增、搜索-->
      <el-row class="">
        <el-button class="btn add fl" @click="dialogVisible1 = true"
          >新增人员</el-button
        >
        <el-button class="btn add fl">删除人员</el-button>
        <div class="fr search-user">
          <el-input
            v-model="input"
            placeholder="请输名字搜索"
            class="select fl"
          ></el-input>
          <el-button class="btn green fr" @click="getEmphasisAll(1)"
            >搜索</el-button
          >
        </div>
      </el-row>
      <!--}新增人员弹出层-->
      <el-dialog
        v-if="hasReload1"
        title="新增人员"
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
          <el-form-item label="人员名称：" prop="name">
            <el-input
              type="text"
              maxlength="10"
              v-model="addUserForm.name"
              autocomplete="off"
              placeholder="请输入真实姓名(10字以内)"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="card">
            <el-input
              type="text"
              maxlength="20"
              v-model.number="addUserForm.card"
              placeholder="有效位数(17-18位数字、字母)"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" prop="phoneName">
            <el-input
              type="text"
              maxlength="11"
              v-model.number="addUserForm.phoneName"
              placeholder="请输手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="人员标签：" prop="nameId">
            <el-select v-model="addUserForm.nameId" placeholder="请选择标签">
              <el-option
                v-for="item in namesAll"
                :value="item.id"
                :label="item.name"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人员描述：" prop="description">
            <el-input
              type="textarea"
              maxlength="200"
              v-model.number="addUserForm.description"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <!-- 上传图片  -->
          <el-form-item label="人员标签：" prop="nameId">
            <div>
              <div v-for="(item,index) in fileLists" :key="index">
                <img :src="item">
                <span @click="removeimg(index)">删除</span>
              </div>
            </div>
            <el-upload
              action="financial/bk/member/uploadPic"
              list-type="picture-card"
              name="file"
              :on-preview="handlePictureCardPreview"
              :show-file-list="listfalse"
              :on-success="imgsuccess"
              :on-error="imgerror"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
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

      <!-- 标签 -->
      <!-- 按钮  循环实现-->
      <el-row v-if="namesAll != ''">
        <el-button size="small" plain disabled class="super"
          >标签管理</el-button
        >
        <el-button
          size="small"
          type="primary"
          v-for="(item, i) in namesAll"
          :key="i"
          @click="showList(item.id)"
          >{{ item.name }}</el-button
        >
      </el-row>

      <!--用户列表-->
      <el-row>
        <el-table
          class="yc-table default update-status"
          id="user-list-table"
          :data="dataList"
          border
          style="width: 100%"
        >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
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
            label="姓名"
            width="180"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="card"
            label="身份证号"
            width="280"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="titleName"
            label="人员标签"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="createTime"
            label="录入时间"
            width="280"
          >
            <template slot-scope="scope">{{
              scope.row.createTime | formatDate
            }}</template>
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="filePath"
            label="特征图片"
            width="360"
          >

            <template scope="scope">
              　<img
                :src="scope.row.filePath"
                width="40"
                height="40"
              />
            </template>
          </el-table-column>

          <el-table-column
            :show-overflow-tooltip="true"
            label="操作"
            width="150"
          >
            <template slot-scope="scope">
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
        title="修改人员信息"
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
          <el-form-item label="人员名称：" prop="name">
            <el-input
              type="text"
              maxlength="10"
              v-model="updateUserForm.name"
              autocomplete="off"
              placeholder="请输入真实姓名(10字以内)"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="card">
            <el-input
              type="text"
              maxlength="20"
              v-model="updateUserForm.card"
              autocomplete="off"
              placeholder="有效位数(17-18位数字、字母)"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" prop="phoneName">
            <el-input
              type="text"
              maxlength="11"
              v-model.number="updateUserForm.phoneName"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>

          <el-form-item label="人员标签：" prop="nameId">
            <el-select v-model="updateUserForm.nameId" placeholder="请选择标签">
              <el-option
                v-for="item in namesAll"
                :value="item.id"
                :label="item.name"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="人员描述：" prop="description">
            <el-input
              type="textarea"
              maxlength="200"
              v-model="updateUserForm.description"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>

        </el-form>
         <!-- 修改图片 -->
 

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
import { Form } from "element-ui";
// 引入请求api
import { camera } from "../../api/api-pd";
import { dialog } from "../../assets/js/dialog";
import { user } from "../../api/api-setting";
export default {
  name: "emphasisList",
  data() {
    return {
      dialogImageUrl:[],
      dialogVisible: false,
      listfalse:false,
      fileLists: [],//图片
      input:"",//搜索
      userId:"",//人员的唯一id号码
      dataList: [], // 人员列表
      namesAll: [], //标签列表
      rule1: false,
      total:0,
      disabled1: false, //新增确认按钮状态
      disabled2: false, //修改确认按钮状态
      dialogVisible1: false,
      dialogVisible2: false,
      navbar: {
        prevs: [
          {
            name: "首页",
            path: "",
          },
        ],
        current: "重点人员管控",
      },
      // userList: [],
      container: null,
      addUserForm: {
        name: "", //名字
        card: "", //身份号码
        phoneName: "", //电话号码
        nameId: "", //人员标签
        description: "", //人员描述
        filePath: "hgtojj", //图片
      },
      updateUserForm: {
        name: "", //名字
        card: "", //身份号码
        phoneName: "", //电话号码
        nameId: "", //人员标签
        description: "", //人员描述
        filePath: "", //图片
      },
      rules: {
        name: [
          { required: true, message: "真实姓名不能为空", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "请输入真实姓名(10字以内)",
            trigger: "blur",
          },
        ],
        card: [
          { required: true, message: "身份证号码不能为空", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              let reg = /^[a-zA-Z0-9]{17,18}$/;
              if (!reg.test(value)) {
                callback(new Error("请输入有效数字、字母"));
              } else {
                callback();
              }
            },
          },
        ],
        nameId: [{ required: true, message: "标签不能为空", trigger: "blur" }],
        phoneName: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              let reg = /^1[0-9]{10}$/;
              if (!reg.test(value)) {
                callback(new Error("请输入11位手机号！"));
              } else {
                callback();
              }
            },
          },
        ],
      },
      pageNum: 1,
      pageSize: 10,
      //是否刷新弹出页面
      hasReload1: true,
      hasReload2: true,
    };
  },
  methods: {
    // 点击标签查找
       showList(id){
         let params = {};
         params.id=id;
         camera.showList(params).then((res)=>{
           if(res.code === "200"){
             this.getEmphasisAll=res.data;
             console.log(this.getEmphasisAll);
           }else{
          dialog.error(res.message);
           }
         })

       },

    // 获取标签列表
    emphasisLabel() {
      // 发送请求
      camera.emphasisLabel().then((res) => {
        if (res.code === "200") {
          this.emphasisLabel = res.data;
          // console.log(res.data);
          this.namesAll=res.data;
        } else {
          dialog.error(res.message);
        }
      });
    },

    //新增人员表单验证
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

    // 移除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log('11');
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传成功
    imgsuccess(file, fileList) {
      var list = [];
      this.fileLists.push(file.data);
      console.log(this.fileLists);
    },
    // 删除图片
    removeimg(index) {
     this.fileLists.splice(index,1);
    },
    //上传失败
    imgerror(file, fileList) {
      console.log(file);
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
    //清空对象
    objEmpty(obj) {
      for (let k of Object.keys(obj)) {
        obj[k] = "";
      }
    },
     handleClose1(done) {
      this.objEmpty(this.addUserForm);
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
    //获取管控人员列表
    getEmphasisAll() {
      let params={
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
      // 发送请求
      camera.emphasisList(params).then((res) => {
        if (res.code === "200") {
          this.total = res.data.total;
          this.dataList = res.data.list;
        } else {
          dialog.error(res.message);
        }
      });
    },
    // 分页事件
    handleCurrentChange(e) {
      // console.log(e);
      this.pageNum = e;
      this.getEmphasisAll();
    },
    //新增用户
    addUser() {
      let params = {
        name: this.addUserForm.name,
        card: this.addUserForm.card,
        phoneName: this.addUserForm.phoneName,
        categoryId: this.addUserForm.nameId,
        description: this.addUserForm.description,
        filePath: this.addUserForm.filePath,
      };
      camera.emphasisAdduser(params).then((res)=>{
        if(res.code==='200') {
            this.objEmpty(this.addUserForm);
          dialog.success('新增人员成功');
          this.getEmphasisAll();
          this.dialogVisible1=false;
          this.hasReload1=false;
          this.disabled1 = false;
          this.$nextTick(()=>{
            this.hasReload1=true;
            // alert("我执行了")
          });
        } else {
          //失败则不隐藏对话框
          // this.objEmpty(this.addUserForm);
          dialog.error(res.message);
          this.dialogVisible1 =true;
          this.disabled1 = false;
            // alert("我执行了")
        }
      })
    },
    //每次取消新增,清空新增表单数据/清空表单验证
    noAddUser() {
      this.objEmpty(this.addUserForm);
      this.hasReload1 = false;
      this.$nextTick(() => {
        this.hasReload1 = true;
      });
    },
    //修改用户信息数据处理,修改表单记录当前用户的信息
    updateUserInfo(row) {
      this.selectDropDown();
      this.updateUserForm.name = row.name;
      this.updateUserForm.card = row.card;
      this.updateUserForm.phoneName = row.phoneName;
      this.updateUserForm.categoryId = row.categoryId;
      this.updateUserForm.description = row.description;
      this.updateUserForm.filePath = row.filePath;
    },
    //修改用户信息
    updateUser() {
      //参数 用户信息 用户id
      let params = {
        name: this.updateUserForm.name,
        card: this.updateUserForm.card,
        phone: this.updateUserForm.phone,
        createBy: this.updateUserForm.createBy,
        phoneName: this.updateUserForm.phoneName,
        description:this.updateUserForm.description,
        id: this.userId,//人员的唯一id
        filePath:this.updateUserForm.filePath,//图片路径
      };
      camera.emphasisUpdateUser(params).then((res) => {
        if (res.code === "200") {
          dialog.success("修改信息成功");
          //修改成功后清空数据,隐藏对话框
          this.userId = "";
          this.objEmpty(this.updateUserForm);
          this.dialogVisible2 = false;
          this.disabled2 = false;
          this.getEmphasisAll()();
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
      // alert('我删除了')
      let params = {};
      params.id = row.id;
      dialog.confirm(
        this,
        "确认删除人员",
        () => {
          camera.emphasisDeleteUser(params).then((res) => {
            if (res.code === "200") {
              dialog.success(res.message);
              this.getEmphasisAll();
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
    
    //根据标签查找
    showLis(id){
      
    }, 


  },
  created() {
    // this.getSelectUserAll();
    // this.selectDropDown();
     this.getEmphasisAll(); //人员列表
    this.emphasisLabel(); //标签
  },
  mounted() {
    this.container = document.getElementById("user-list-table");
    //  人员列表请求
    // this.getEmphasisAll(); //人员列表
    // this.emphasisLabel(); //标签

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
  }
};
</script>

<style lang="scss" scoped>


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
// 按钮组件 修改样式用的
.el-button--primary {
  color: #fff !important;
  border-radius: 10px !important;
  background-color: #494949 !important;
  border: 1px solid #494949 !important;
}
.el-button--primary:hover {
  background-color: #f45411 !important;
  border-color: #f45411 !important;
}
.el-button--primary:focus {
  background-color: #f45411 !important;
  border-color: #f45411 !important;
}
.super {
  color: #f45411 !important;
  border: 1px solid #f45411 !important;
  border-radius: 10px !important;
}
// 引入 css 文件
// @import "../../assets/css/emphasisList";
</style>