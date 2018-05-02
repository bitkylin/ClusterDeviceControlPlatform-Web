<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <div class="text-jumbo">Oops!</div>
        <div class="text-problem">服务器无法连接</div>
        <div id="elegant-sentences">
          {{getElegantSentences}}
        </div>
        <div class="button-container">
          <el-button id="pan-back-btn" type="primary" @click="back">返回</el-button>
          <el-popover
            ref="popover4"
            placement="top"
            title="HTTP API服务器"
            trigger="hover">
            <div>地址：{{host}}</div>
            <div v-bind:style="{color:'#9c9c9c',fontSize: '12px',paddingTop:'3px'}">请联系网络管理员解决该问题</div>
            <el-button id="show-btn" slot="reference" plain @click="serverAttachTest">尝试重连</el-button>
          </el-popover>
        </div>
        <div class="show-btn-click-content" v-if="connected==='connecting'"
             v-bind:style="{color:'#0055ff',size:'12px','font-weight':'bold'}">正在连接服务器...
        </div>
        <div class="show-btn-click-content" v-else-if="connected===true"
             v-bind:style="{color:'green','font-weight':'bold'}">服务器连接成功
        </div>
        <div class="show-btn-click-content" v-else-if="connected===false"
             v-bind:style="{color:'red','font-weight':'bold'}">服务器连接失败
        </div>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import errGif from '@/assets/401_images/401.gif'
  import { serverAttach } from '@/api/server'
  import { chooseElegantSentences404 } from '@/utils/chooseElegantSentences'

  export default {
    name: 'page401',
    data() {
      return {
        errGif: errGif + '?' + +new Date(),
        host: process.env.BASE_API,
        connected: null,
        elegantSentences: null
      }
    },
    computed: {
      getElegantSentences() {
        if (this.elegantSentences) {
          return this.elegantSentences
        } else {
          return ' '
        }
      }
    },
    methods: {
      back() {
        if (this.$route.query.noGoBack) {
          this.$router.push({ path: '/dashboard' })
        } else {
          this.$router.go(-1)
        }
      },
      serverAttachTest() {
        this.connected = 'connecting'
        this.dataBeforeTime = new Date().getMilliseconds()
        // 调取HTTP API获取数据
        serverAttach().then(response => {
          this.connected = response.data === 'success'
        }).catch(error => {
          console.log('error', error)
          this.connected = false
        })
      }
    },
    mounted: function() {
      this.elegantSentences = chooseElegantSentences404()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .errPage-container {
    width: 800px;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;

    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #cd0000;
    }

    .text-problem {
      font-size: 40px;
      padding: 35px 0;
    }
    #elegant-sentences {
      max-width: 400px;
    }
    .button-container {
      margin-top: 120px;
    }

    #pan-back-btn {
      font-size: 18px;
      margin-right: 30px;
    }
    #show-btn {
      font-size: 18px;
    }
    .show-btn-click-content {
      padding: 10px;
      margin-left: 100px;
    }
  }
</style>
