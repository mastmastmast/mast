<template>
  <div class="login">
    <div class="login-container">
      <!--头部-->
      <div class="login-header">
        <div class="header-title">
          <!-- <div class="logo"> -->
          <!-- </div> -->
          <div class="desc">后台管理系统</div>
        </div>
      </div>
      <!--表单-->
      <div class="login-content">
        <div class="content-login">
          <div class="login-form">
            <div class="form-title">用户登录</div>
            <div class="form-content">
              <el-form ref="loginForm" :model="loginForm" id="loginForm" :rules="loginRule">
                <el-form-item prop="username">
                  <el-input v-model="loginForm.username"
                            placeholder="请输入用户名"
                            prefix-icon="yc-icon yc-icon-user"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                  <el-input type="password"
                            v-model="loginForm.password"
                            placeholder="请输入密码"
                            prefix-icon="yc-icon yc-icon-lock"
                  ></el-input>
                  <div class="validate-img" v-show="showImgValidator">
                    <img-validator :showImgValidator="showImgValidator" @close="showImgValidator=false"
                                   @success="handleValidateSuccess" @error="handleValidateError"/>
                    <div class="arrow"></div>
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-button class="btn default captcha-btn" @click="showImgValidator=true">点击按钮进行验证</el-button>
                  <img src="#" alt="" v-if='false' class="captcha-pic">
                </el-form-item>
              </el-form>
              <!--<div class="operation">-->
              <!--<el-checkbox >记住账号</el-checkbox>-->
              <!--<span class="forget-pwd">忘记密码？</span>-->
              <!--</div>-->
              <el-button class="btn default submit login-btn" :class="{disabled:disableSubmitBtn}"
                         :disabled="disableSubmitBtn" @click="login()">登录
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <!--底部-->
      <div class="login-footer">
        <div class="footer-content">
          <div class="footer-left">
            <!-- <div class="footer-logo"></div> -->
            <div class="footer-my">
              <a href="" target="_blank">关于我们</a>
              <a href="" target="_blank">新闻咨询</a>
            </div>
          </div>
          <div class="footer-right">
            <p></p>
            <p></p>
            <p><span></span><span></span></p>
          </div>
        </div>

      </div>
    </div>
    <form id="submit-form" action="index.html" method="get">

    </form>
  </div>
</template>

<script>
  import imgValidator from '../../components/imgValidator';
  import {authentication} from "../../api/api-login";
  import {dialog} from "../../assets/js/dialog";
  import * as qs from 'qs'
  import {arrayFunc} from "../../assets/js/common";
  import {mapGetters} from "vuex";

  export default {
    name: "Login",
    data() {
      return {
        showImgValidator: false,
        //是否禁用登录按钮
        disableSubmitBtn: true,
        loginForm: {
          username: '',
          password: ''
        },
        loginRule: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        }
      }
    },
    components: {imgValidator},
    computed: {
      ...mapGetters(['username']),
      rightName() {
        return this.loginForm.name
      },
      pwdError() {
        return false
      }
    },
    methods: {
      login() {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            this.$store.dispatch('changeUserName', "");
            let params = {
              username: this.loginForm.username,
              password: this.$md5(this.loginForm.password)
            };
            // return false;
            authentication.login(qs.stringify(params)).then(res => {
              if (res.code === 200) {
                sessionStorage.setItem('token', res.data.token);
                sessionStorage.setItem('username', res.data.userInfo.username);
                let authorities = [];
                if (!arrayFunc.isEmpty(res.data.powerList)) {
                  res.data.powerList.forEach((item, index) => {
                    authorities.push(
                        {
                          code: item.menuCode,
                          name: item.name
                        }
                    );
                  });
                }
                sessionStorage.setItem('authorities', JSON.stringify(authorities));
                this.$store.dispatch('changeUserName', res.data.userInfo.username);
                $('#submit-form').submit();
              } else {
                dialog.error(res.message);
                this.disableSubmitBtn = true;
              }
            });
            this.$refs['loginForm'].clearValidate();
          }
        })
      },
      handleValidateSuccess() {
        this.disableSubmitBtn = false;
        setTimeout(() => {
          this.showImgValidator = false;
        }, 500)
      },
      handleValidateError() {
        this.disableSubmitBtn = true;
      }
    },
    mounted() {
    },
    created() {
      let query = this.$route.query;
      let username = query.username;
      if (username) {
        let params = {
          username: username,
          password: '4a7d1ed414474e4033ac29ccb8653d9b'
        };
        authentication.login(qs.stringify(params)).then(res => {
          if (res.code === 200) {
            sessionStorage.setItem('token', res.data.token);
            sessionStorage.setItem('username', res.data.userInfo.username);
            let authorities = [];
            if (!arrayFunc.isEmpty(res.data.powerList)) {
              res.data.powerList.forEach((item, index) => {
                authorities.push(
                    {
                      code: item.menuCode,
                      name: item.name
                    }
                );
              });
            }
            sessionStorage.setItem('authorities', JSON.stringify(authorities));
            sessionStorage.setItem('loginEntry', 'pageRedirect');
            $('#submit-form').submit();
          } else {
            dialog.error(res.message);
            this.disableSubmitBtn = true;
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/login";
</style>
