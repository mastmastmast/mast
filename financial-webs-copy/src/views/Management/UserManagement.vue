<template>
  <div>
    <div style="text-align: left" class="navbar-back">
      <navbar :data="navbar"/>
    </div>
    <div class="box mt20 user-list">
      <!--头部新增、搜索-->
      <el-row class="">
        <el-button class="btn add fl" @click="dialogVisible1=true,selectDropDown()">新增用户</el-button>
        <div class="fr search-user">
          <el-input v-model="input" placeholder="请输入用户名或电话"  class="select fl" ></el-input>
          <el-button class="btn green fr" @click="getSelectUserAll(1)">查询</el-button>
        </div>
      </el-row>
      <!--新增用户弹出层-->
      <el-dialog
          v-if="hasReload1"
          title="新增用户"
          :visible.sync="dialogVisible1"
          width="30%"
          :before-close="handleClose1">
        <el-form  status-icon
                  ref="addUserForm"
                  label-width="100px"
                  class="demo-ruleForm"
                  :model="addUserForm"
                  :rules="rules">
          <el-form-item label="真实姓名：" prop="userName">
            <el-input type="text" maxlength="15" v-model="addUserForm.userName" autocomplete="off" placeholder="请输入真实姓名(15字以内)"></el-input>
          </el-form-item>
          <el-form-item label="登录名称：" prop="loginName">
            <el-input type="text" v-model="addUserForm.loginName" autocomplete="off" placeholder="登录名(6-12位字母、数字和下划线)"></el-input>
          </el-form-item>
          <el-form-item label="初始密码：" prop="password">
            <el-input type="password" v-model="addUserForm.password" autocomplete="off" placeholder="密码(6-12位字母和数字)"></el-input>
          </el-form-item>
          <el-form-item label="电话：" prop="phone">
            <el-input type="text" maxlength="11" v-model.number="addUserForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="角色：" prop="roleId">
            <el-select v-model="addUserForm.roleId" placeholder="请选择角色">
              <el-option v-for="item in roleArr" :value="item.value" :label="item.key" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button class="btn cancel" @click="dialogVisible1 = false,noAddUser()">取 消</el-button>
          <el-button class="btn submit" @click="submitForm1()" :disabled="disabled1">确 定</el-button>
        </span>
      </el-dialog>

      <!--用户列表-->
      <el-row>
        <el-table class="yc-table default update-status"
                  id="user-list-table"
                  :data="userList"
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
              prop="userName"
              label="用户名称"
              width="120">
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              prop="loginName"
              label="登录名称"
              width="120">
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              prop="phone"
              label="电话"
          >
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              prop="roleName"
              label="角色"
              width="120">
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              prop="createBy"
              label="创建人"
              width="120">
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              prop="dateCreated"
              label="创建时间"
              width="200">
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              prop="updateBy"
              label="更改人"
              width="120">
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              prop="dateUpdated"
              label="更改时间"
              width="200">
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              prop="isUsable"
              label="是否可用"
              width="100">
            <template slot-scope="scope">
              <el-switch
                  v-model="scope.row.disableEnable"
                  @click.native="updateUserStatus(scope.row)"
                  active-color="#e95906">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              label="操作"
              width="150">
            <template slot-scope="scope">
              <i class="yc-icon yc-icon-edit mr10" style="font-size: 20px" @click="dialogVisible2=true;userId=scope.row.id,updateUserInfo(scope.row)"></i>
              <i class="yc-icon yc-icon-delete mr10" style="font-size: 20px" @click="deleteUser(scope.row)"></i>
              <i class="yc-icon yc-icon-rest-pwd" style="font-size: 20px" @click="resetPassword(scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <!--修改用户弹出层-->
      <el-dialog
          v-if="hasReload2"
          title="修改用户信息"
          :visible.sync="dialogVisible2"
          width="30%"
          :before-close="handleClose2">
        <el-form  status-icon
                  :model="updateUserForm"
                  ref="updateUserForm"
                  id="updateUserForm"
                  label-width="100px"
                  class="demo-ruleForm"
                  :rules="rules">
          <el-form-item label="真实姓名：" prop="userName">
            <el-input type="text" maxlength="15" v-model="updateUserForm.userName" autocomplete="off" placeholder="请输入真实姓名(15字以内)"></el-input>
          </el-form-item>
          <el-form-item label="登录名称：" prop="loginName">
            <el-input type="text" v-model="updateUserForm.loginName" autocomplete="off" placeholder="登录名(6-12位字母、数字和下划线)"></el-input>
          </el-form-item>
          <el-form-item label="电话：" prop="phone">
            <el-input type="text" maxlength="11" v-model.number="updateUserForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="角色：" prop="roleId">
            <el-select v-model="updateUserForm.roleId" placeholder="请选择角色">
              <el-option v-for="item in roleArr" :value="item.value" :label="item.key" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button class="btn cancel" @click="dialogVisible2 = false,noUpdateUser()">取 消</el-button>
          <el-button class="btn submit" @click="submitForm2()" :disabled="disabled2">确 定</el-button>
        </span>
      </el-dialog>
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
  import {user} from "../../api/api-setting";
  import {dialog} from "../../assets/js/dialog";
  export default {
    name: "UserManagement",
    data () {
      return {
        roleArr: [],
        rule1: false,
        userId:'',//角色id
        input: '',//查询输入框
        disabled1: false,//新增确认按钮状态
        disabled2: false,//修改确认按钮状态
        dialogVisible1:false,
        dialogVisible2:false,
        navbar: {
          prevs: [
            {
              name: '系统管理',
              path: ''
            }
          ],
          current: '用户管理'
        },
        userList: [],
        container: null,
        addUserForm: {
          userName: '',
          loginName: '',
          password: '123456',
          phone: '',
          createBy:'',
          roleId:''
        },
        updateUserForm: {
          userName: '',
          loginName: '',
          phone: '',
          createBy:'',
          roleId: ''
        },
        rules: {
          userName: [{required: true, message: '真实姓名不能为空', trigger: 'blur'},
            {min: 1, max: 15, message: '请输入真实姓名(15字以内)', trigger: 'blur' }],
          loginName: [{required: true, message: '登录名不能为空', trigger: 'blur'},
            {
              validator: function (rule, value, callback) {
                let reg = /^[a-zA-Z0-9_]{6,12}$/;
                if (!reg.test(value)) {
                  callback(new Error('请输入正确登录名(6-12位字母、数字和下划线)'))
                } else {
                  callback();
                }
              }
            }],
          password: [{required: true, message: '密码不能为空', trigger: 'blur'},{
            validator: function (rule, value, callback) {
              let reg = /^[a-zA-Z0-9]{6,12}$/;
              if (!reg.test(value)) {
                callback(new Error('请输入正确密码(6-12位字母和数字)'))
              } else {
                callback();
              }
            }
          }],
          phone: [{required: true, message: '手机号不能为空', trigger: 'blur'},
            {
              validator: function (rule, value, callback) {
                let reg = /^1[0-9]{10}$/;
                if (!reg.test(value)) {
                  callback(new Error('请输入11位手机号！'))
                } else {
                  callback();
                }
              }
            }]
        },
        paginationData: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          url: 'user/selectUserAll',
          params: {}
        },
        //是否刷新弹出页面
        hasReload1:true,
        hasReload2:true
      }
    },
    methods: {
      //新增用户表单验证
      submitForm1() {
        this.$refs['addUserForm'].validate((valid) => {
          this.rule1 = true;
          if (valid) {
            //验证成功后发送ajax,ajax结束前禁用按钮
            this.disabled1 = true;
            this.addUser();
          } else {
            //验证失败,对话框继续显示
            return false;
          }
        })
      },
      //修改用户信息表单验证
      submitForm2() {
        this.$refs['updateUserForm'].validate((valid) => {
          if (valid) {
            //验证成功后发送ajax,ajax结束前禁用按钮
            this.disabled2 = true;
            this.updateUser();
          } else {
            //验证失败,对话框继续显示
            return false;
          }
        })
      },
      //清空对象
      objEmpty(obj) {
        for (let k of Object.keys(obj)) {
          obj[k] = '';
        }
      },
      handleClose1(done) {
        this.objEmpty(this.addUserForm);
        //初始密码
        this.addUserForm.password= '123456';
        this.hasReload1=false;
        this.$nextTick(()=>{
          this.hasReload1=true;
        });
        done();
      },
      handleClose2(done) {
        this.hasReload2=false;
        this.$nextTick(()=>{
          this.hasReload2=true;
        });
        done();
      },
      //获取用户列表
      getSelectUserAll (pageNum) {
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
        user.getUserAll(params).then((res)=>{
          if (res.code === '200'){
            let data = res.data;
            this.paginationData.total = data.total;
            this.paginationData.params = params;
            let userList = data.listData;
            userList.map((item)=>{
              if (!item.roleName) {
                item.roleName = '无';
              }
              if (!item.createBy) {
                item.createBy = '无';
              }
              if (!item.updateBy) {
                item.updateBy = '无';
              }
              if (!item.phone) {
                item.phone = '无';
              }
              item.disableEnable=item.disableEnable==='1';
            })
            this.userList = userList;
            console.log(userList);
          } else {
            dialog.error(res.message);
          }
        })
      },
      //新增用户
      addUser () {
        let params = {
          userName: this.addUserForm.userName,
          loginName: this.addUserForm.loginName,
          password: this.$md5(this.addUserForm.password),
          phone: this.addUserForm.phone,
          // createBy: this.addUserForm.createBy,
          roleId: this.addUserForm.roleId
        };
        user.addUser(params).then((res)=>{
          if(res.code==='200') {
            this.objEmpty(this.addUserForm);
            this.addUserForm.password= '123456';
            this.dialogVisible1=false;
            this.disabled1 = false;
            dialog.success('新增用户成功');
            this.getSelectUserAll();
            this.hasReload1=false;
            this.$nextTick(()=>{
              this.hasReload1=true;
            });
          } else {
            //失败则不隐藏对话框
            // this.objEmpty(this.addUserForm);
            dialog.error(res.message);
            this.dialogVisible1 =true;
            this.disabled1 = false;
          }
        })
      },
      //每次取消新增,清空新增表单数据/清空表单验证
      noAddUser () {
        this.objEmpty(this.addUserForm);
        this.addUserForm.password = '123456';
        this.hasReload1=false;
        this.$nextTick(()=>{
          this.hasReload1=true;
        });
      },
      //分页事件
      handlePageChange(data) {
        this.paginationData = data.pagination;
        data.tableData.map((item)=>{
          if (!item.roleName) {
            item.roleName = '无';
          }
          if (!item.createBy) {
            item.createBy = '无';
          }
          if (!item.updateBy) {
            item.updateBy = '无';
          }
          if (!item.phone) {
            item.phone = '无';
          }
          item.disableEnable=item.disableEnable==='1';
        })
        this.userList = data.tableData;
      },
      //修改用户信息数据处理,修改表单记录当前用户的信息
      updateUserInfo(row) {
        this.selectDropDown()
        this.updateUserForm.userName = row.userName;
        this.updateUserForm.loginName = row.loginName;
        this.updateUserForm.password = row.password;
        this.updateUserForm.phone = row.phone;
        this.updateUserForm.roleId = row.roleId;
      },
      //修改用户信息
      updateUser(){
        //参数 用户信息 用户id
        let params = {
          userName: this.updateUserForm.userName,
          loginName: this.updateUserForm.loginName,
          phone: this.updateUserForm.phone,
          // createBy: this.updateUserForm.createBy,
          roleId: this.updateUserForm.roleId,
          id: this.userId
        }
        user.updateUser(params).then((res)=>{
          if(res.code==='200') {
            dialog.success('用户修改成功')
            //修改成功后清空数据,隐藏对话框
            this.userId = '';
            this.objEmpty(this.updateUserForm);
            this.dialogVisible2=false;
            this.disabled2 = false;
            this.getSelectUserAll();
            this.hasReload2=false;
            this.$nextTick(()=>{
              this.hasReload2=true;
            });
          } else {
            dialog.error(res.message);
            //修改失败,显示对话框
            this.dialogVisible2 =true;
            this.disabled2 = false;
          }
        })
      },
      //取消修改用户信息,清空修改用户表单信息,表单验证
      noUpdateUser () {
        //清空数据
        this.objEmpty(this.updateUserForm);
        this.userId = '';
        this.hasReload2=false;
        this.$nextTick(()=>{
          this.hasReload2=true;
        });
      },
      //更改用户启用和禁用信息
      updateUserStatus (row) {
        let params = {};
        if (row.disableEnable) {
          params.disableEnable = '1';
        } else {
          params.disableEnable = '0';
        }
        params.id = row.id;
        user.updateUserStatus(params).then((res)=>{
          if(res.code==='200') {
            dialog.success('状态更改成功');
            this.getSelectUserAll();
          } else {
            dialog.error(res.message);
          }
        })
      },
      //查看用户详情
      selectUserById (row) {
        let params = {}
        params.id = row.id;
        user.selectUserById(params).then((res)=>{
          if (res.code==='200') {
          } else {
            dialog.error(res.message)
          }
        })
      },
      //删除用户
      deleteUser (row) {
        let params = {}
        params.id = row.id;
        dialog.confirm(this,'确认删除用户',()=>{
          user.deleteUser(params).then((res)=>{
            if(res.code==='200') {
              dialog.success(res.message);
              this.getSelectUserAll();
            } else {
              dialog.error(res.message);
            }
          })
        },()=>{
          return false;
        })
      },
      //查询角色下拉选择
      selectDropDown() {
        let params = {
        }
        user.selectDropDown(params).then((res)=>{
          if(res.code==='200') {
            let data = res.data;
            this.roleArr = [...data];
          } else {
            dialog.error(res.message);
          }
        })
      },
      //重置密码
      resetPassword(row) {
        let params = {
          id: row.id,
          password: this.$md5('123456')
        };
        dialog.confirm(this,'是否要重置该用户密码',()=>{
          user.resetPassword(params).then((res)=>{
            if (res.code==='200') {
              dialog.success(res.message)
              this.getSelectUserAll();
            } else {
              dialog.error(res.message)
            }
          }),()=>{
            return false;
          }
        })
      }
    },
    created() {
      this.getSelectUserAll();
      // this.selectDropDown();
    },
    mounted() {
      this.container = document.getElementById("user-list-table")
    }

  }

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
</style>
