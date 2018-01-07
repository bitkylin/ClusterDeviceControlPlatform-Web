<template>
  <div id="login-widget" v-loading="loading">
    <div id="login-container">
      <h3 id="title">智能充电柜服务平台</h3>
      <el-form id="login-form" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <el-form-item prop="username">
          <el-input name="username" type="text" v-model="loginForm.username" placeholder="用户名"
                    @keyup.enter.native="handleLogin">
            <i slot="prefix" class="iconfont icon-yonghuming"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" :type="pwdType" v-model="loginForm.password" placeholder="密码"
                    @keyup.enter.native="handleLogin">
            <i slot="prefix" class="iconfont icon-mima"></i>
            <i slot="suffix" class="iconfont icon-yincangmima" @click="showPwd" v-if="pwdType === 'password'"></i>
            <i slot="suffix" class="iconfont icon-xianshimima" @click="showPwd" v-else></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
        <div id="tips">
          <span>服务器状态：正常</span>
          <span>延迟：20ms</span>
        </div>
      </el-form>
    </div>
  </div>
</template>


<script>
  import { isvalidUsernameOrPassword } from '@/utils/validate'

  export default {
    name: 'loginWidget',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsernameOrPassword(value)) {
          callback(new Error('只能输入字母和数字，且长度在 1 - 20 个字符之间'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!isvalidUsernameOrPassword(value)) {
          callback(new Error('只能输入字母和数字，且长度在 1 - 20 个字符之间'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: 'admin',
          password: 'admin'
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        loading: false,
        pwdType: 'password'
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  #login-widget {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 100;
    color: #fff;
  }

  #login-form {
    max-width: 350px;
    margin: 0 auto;
  }

  #title {
    min-width: 550px;
    font-size: 56px;
    text-align: center;
    font-weight: bold;
  }

  #tips {
    display: flex;
    justify-content: space-between;
  }

  i {
    color: grey;
  }
</style>
