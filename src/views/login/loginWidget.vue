<template>
  <div id="login-container" v-loading="loading">
    <div class="hold-space-div"></div>
    <h3 id="title">集群设备管理云平台</h3>
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
        <span v-if="IsNormal==='待获取'">服务器状态：<span v-bind:style="{'font-weight':'bold'}">待获取</span></span>
        <span v-else-if="IsNormal">服务器状态：<span v-bind:style="{color:'#00ff00', 'font-weight':'bold'}">正常</span></span>
        <span v-else>服务器状态：<span v-bind:style="{color:'#ff0000', 'font-weight':'bold'}">异常</span></span>
        <span>延迟：<span v-bind:style="{'font-weight':'bold'}">{{getCommDelay}}</span></span>
      </div>
    </el-form>
    <div class="hold-space-div"></div>
    <div v-if="elegantSentences" id="elegant-sentences">
      <div id="elegant-sentences-content">
        {{elegantSentences.content}}
      </div>
      <div id="elegant-sentences-inscribe">
        —— {{elegantSentences.name}}
      </div>
    </div>
  </div>
</template>


<script>
  import { isvalidUsernameOrPassword } from '@/utils/validate'
  import { setTimer, touchError } from '@/utils/timer'
  import { chooseElegantSentencesLogin } from '@/utils/kyUtil'
  import { serverAttach } from '@/api/server'

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
        elegantSentences: null,
        commDelay: '待获取',
        dataBeforeTime: 0,
        IsNormal: '待获取',
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
    computed: {
      getCommDelay() {
        if (this.commDelay === '待获取') {
          return this.commDelay
        } else {
          return this.commDelay + 'ms'
        }
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
      },
      // 服务器可接入测试
      serverAttachTest() {
        this.dataBeforeTime = new Date().getTime()
        // 调取HTTP API获取数据
        serverAttach().then(response => {
          const data = response.data
          this.IsNormal = data === 'success'
          this.commDelay = new Date().getTime() - this.dataBeforeTime
        }).catch(error => {
          touchError(this, this.serverAttachTest, error)
        })
      }
    },
    mounted: function() {
      this.elegantSentences = chooseElegantSentencesLogin()
      setTimer(this.serverAttachTest, 500)
    }
  }
</script>

<style scoped>
  #login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 100;
    color: #fff;
  }

  #title {
    min-width: 580px;
    font-size: 56px;
    text-align: center;
    font-weight: bold;
  }

  #login-form {
    max-width: 350px;
    min-width: 250px;
    margin: 0 auto;
    width: 25%;
  }

  #tips {
    display: flex;
    justify-content: space-between;
  }

  i {
    color: grey;
  }

  .hold-space-div {
    flex: 1
  }

  #elegant-sentences {
    padding-top: 25px;
    margin: 0 auto;
    max-width: 660px;
    min-width: 30%;
  }

  #elegant-sentences-content {
    width: 100%;
  }

  #elegant-sentences-inscribe {
    margin-top: 15px;
    width: 100%;
    text-align: right;
  }
</style>
