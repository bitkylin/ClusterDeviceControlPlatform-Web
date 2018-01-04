<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <div class="text-jumbo">Oops!</div>
        <div class="text-problem">服务器无法连接</div>
        请联系网络管理员解决该问题
        <div class="button-container">
          <el-button id="pan-back-btn" type="primary" @click="back">返回</el-button>
          <el-popover
            ref="popover4"
            placement="top"
            title="服务器信息"
            trigger="hover">
            <div>地址：{{host}}</div>
            <div>端口：80</div>
            <el-button id="show-btn" slot="reference" plain>显示</el-button>
          </el-popover>
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

  export default {
    name: 'page401',
    data() {
      return {
        errGif: errGif + '?' + +new Date(),
        host: process.env.BASE_API
      }
    },
    methods: {
      back() {
        if (this.$route.query.noGoBack) {
          this.$router.push({ path: '/dashboard' })
        } else {
          this.$router.go(-1)
        }
      }
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
      color: #484848;
    }

    .text-problem {
      font-size: 40px;
      padding: 35px 0;
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
  }
</style>
