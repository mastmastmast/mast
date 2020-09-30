<template>
  <div class="header-wrapper">
    <div class="header">
      <div class="header-title">
        <!-- <div class="logo"></div> -->
        <!-- <div class="desc">后台管理系统</div> -->
      </div>
      <div class="user-info">
         <!-- v-if="!isHome" -->
        <el-autocomplete
            v-if="false"
            class="inline-input search-input"
            style="width:300px;"
            v-model="queryString"
            :fetch-suggestions="querySearch"
            placeholder="请输入企业名称或统一社会信用代码"
            @select="handleSelect">
          <i class="el-icon-search el-input__icon" @click="clickSearch" slot="suffix">
          </i>
        </el-autocomplete>
        <el-dropdown class="ml15 user-operation">
                        <span class="el-dropdown-link">
                            您好，{{username}}<i
                            class="el-icon-arrow-down el-icon--right"></i>
                         </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="showUpdatePwdBtn" @click.native="showUpdatePwdDialog=true">密码修改</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!--修改密码弹出层-->
      <el-dialog
          :append-to-body=true
          v-if="showUpdatePwdBtn && hasReload1"
          title="修改密码"
          :visible.sync="showUpdatePwdDialog"
          width="30%"
          :before-close="handleClose1">
        <el-form status-icon :model="updatePwdForm" ref="updatePwdForm" id="updatePwdForm" label-width="150px"
                 :rules="updatePwdRules">
          <el-form-item label="旧密码：" prop="oldPwd">
            <el-input type="password" v-model="updatePwdForm.oldPwd" autocomplete="off" placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="newPwd1">
            <el-input type="password" v-model="updatePwdForm.newPwd1" autocomplete="off"
                      placeholder="新密码(6-12位字母和数字)"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码：" prop="newPwd2">
            <el-input type="password" v-model="updatePwdForm.newPwd2" autocomplete="off"
                      placeholder="请再次输入新密码"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button class="btn cancel" @click="noUpdatePwd()">取 消</el-button>
          <el-button class="btn submit" @click="submitUpdatePwdForm()" :disabled="disabled1">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {home} from "../api/api";
  import {dialog} from "../assets/js/dialog";
  import {handlePassword} from "../api/api-password";
  import {authentication} from "../api/api-login";
  import {redirectToLogin} from "../assets/js/common";
  import {mapGetters} from "vuex";

  export default {
    name: "Header",
    data() {
      //检验新密码是否一致规则
      let validateNewPwd1 = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9]{6,12}$/;
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else if (!reg.test(value)) {
          callback(new Error('请输入正确密码(6-12位字母和数字)'))
        } else {
          if (this.updatePwdForm.newPwd2 !== '') {
            this.$refs.updatePwdForm.validateField('newPwd2')
          }
          callback();
        }
      };
      let validateNewPwd2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.updatePwdForm.newPwd1) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      };
      return {
        dataList: [],
        queryString: '',
        //是否刷新弹出页面
        hasReload1: true,
        //是否显示修改密码弹出层
        showUpdatePwdDialog: false,
        //修改密码表单数据
        updatePwdForm: {
          oldPwd: '',
          newPwd1: '',
          newPwd2: ''
        },
        //修改密码提交按钮是否禁用
        disabled1: false,
        //修改密码表单验证规则
        updatePwdRules: {
          oldPwd: [{required: true, message: '请输入旧密码', trigger: 'blur'}],
          newPwd1: [{required: true, validator: validateNewPwd1, trigger: 'blur'}],
          newPwd2: [{required: true, validator: validateNewPwd2, trigger: 'blur'}]
        },
        showUpdatePwdBtn:true,
        //当前页面是否是首页
        isHome:false
      }
    },
    watch:{
      '$route'(to, from) {
        const path = to.path;
        this.isHome=path.indexOf('/home') !== -1 || path === '/';
      }
    },
    computed:{
      ...mapGetters(['username']),
    },
    created() {
      let loginEntry=sessionStorage.getItem('loginEntry');
      if(loginEntry && loginEntry==='pageRedirect'){
        this.showUpdatePwdBtn=false;
      }
    },
    mounted() {
      const path = this.$route.path;
      this.isHome=path.indexOf('/home') !== -1 || path === '/';
    },
    methods: {
      querySearch(queryString, cb) {
        queryString = $.trim(queryString);
        if (queryString) {
          home.searchEnterprise(queryString).then(res => {
            if (res.code === '200') {
              this.dataList = res.data.listData;
              // 调用 callback 返回建议列表的数据
              cb(this.dataList);
            } else {
              dialog.error(res.message)
            }
          });
        } else {
          this.dataList = [];
          // 调用 callback 返回建议列表的数据
          cb(this.dataList);
        }

      },
      handleSelect(item) {
        this.$router.push('/enterprise/credit/' + item.name);
      },
      clickSearch() {
        let q = $.trim(this.queryString);
        if (!q) {
          q = 'all';
        }
        this.$router.push('/enterprise/search/' + q);
      },
      //关闭修改弹出层
      handleClose1(done) {
        this.updatePwdForm.oldPwd = '';
        this.updatePwdForm.newPwd1 = '';
        this.updatePwdForm.newPwd2 = '';
        this.hasReload1 = false;
        this.$nextTick(() => {
          this.hasReload1 = true;
        });
        done();
      },
      //取消修改密码，重置表单
      noUpdatePwd() {
        this.showUpdatePwdDialog = false;
        this.updatePwdForm.oldPwd = '';
        this.updatePwdForm.newPwd1 = '';
        this.updatePwdForm.newPwd2 = '';
        this.hasReload1 = false;
        this.$nextTick(() => {
          this.hasReload1 = true;
        })
      },
      //提交修改密码
      submitUpdatePwdForm() {
        // console.log(this.updatePwdForm);
        this.$refs['updatePwdForm'].validate((valid) => {
          if (valid) {
            this.disabled1 = true;
            let params = {
              oldPwd: this.$md5(this.updatePwdForm.oldPwd),
              newPwd: this.$md5(this.updatePwdForm.newPwd1)
            }
            // console.log(params);
            handlePassword.updatePwd(params).then((res) => {
              if (res.code === '200' && res.data === '400012') {
                this.showUpdatePwdDialog = false;
                this.disabled1 = false;
                this.updatePwdForm.oldPwd = '';
                this.updatePwdForm.newPwd1 = '';
                this.updatePwdForm.newPwd2 = '';
                this.hasReload1 = false;
                this.$nextTick(() => {
                  this.hasReload1 = true;
                })
                dialog.success('修改密码成功，2秒后将退出重新登录');
                authentication.logout().then(res => {
                  if (res.code === '200') {
                    sessionStorage.removeItem('token');
                    redirectToLogin();
                  } else {
                    dialog.error(res.message)
                  }
                }).catch(err => {
                  dialog.error('退出登录失败');
                });
              } else {
                this.showUpdatePwdDialog = true;
                this.disabled1 = false;
                dialog.error(res.message);
              }
            })
          } else {
            return false;
          }
        })
      },
      /**
       * 注销
       */
      logout() {
        dialog.confirm(this, '确定退出系统？', () => {
          authentication.logout().then(res => {
            if (res.code === '200') {
              this.$store.dispatch('changeUserName', "");
              sessionStorage.removeItem('token');
              redirectToLogin();
            } else {
              dialog.error(res.message)
            }
          }).catch(err => {
            dialog.error('退出登录失败');
          });
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .user-info {
    .el-icon-search {
      font-size: 20px;
    }
  }

  .el-icon-search {
    cursor: pointer;
  }
</style>
