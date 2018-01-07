<template>
  <div id="main-container">
    <div id="item-container">
      <!--服务器连接状态-->
      <el-card class="box-card-outline-item">
        <div class="header">连接状态</div>
        <div class="content" v-if="commStatus" v-bind:style="{ color: 'green' }">正常</div>
        <div class="content" v-else v-bind:style="{ color: 'red' }">异常</div>
      </el-card>
      <!--服务器工作状态-->
      <el-card class="box-card-outline-item">
        <div class="header">工作状态</div>
        <div class="content" v-if="workStatus" v-bind:style="{ color: 'green' }">正常</div>
        <div class="content" v-else v-bind:style="{ color: 'red' }">异常</div>
      </el-card>
      <!--服务器延迟-->
      <el-card class="box-card-outline-item">
        <div class="header">延迟</div>
        <div class="content">待获取</div>
      </el-card>
      <!--服务器版本-->
      <el-card class="box-card-outline-item">
        <div class="header">版本</div>
        <div class="content">{{version}}</div>
      </el-card>
      <!--连接设备组数-->
      <el-card class="box-card-outline-item">
        <div class="header">设备组数</div>
        <div class="content">56</div>
      </el-card>
      <!--是否有未读的服务器消息-->
      <el-card class="box-card-outline-item">
        <div class="header">未读消息</div>
        <div class="content">0</div>
      </el-card>
    </div>
    <!--服务器信息详情-->
    <div id="server-status-content">
      <el-card class="box-card-detail-item" v-if="serverInfo">
        <div class="header">服务器信息</div>
        <table class="content-table">
          <tr>
            <td class="table-key">版本</td>
            <td class="table-value">{{serverInfo.version}}</td>
          </tr>
          <tr>
            <td class="table-key">Web端口号</td>
            <td class="table-value">{{serverInfo.webPort}}</td>
          </tr>
          <tr>
            <td class="table-key">TCP端口号</td>
            <td class="table-value">{{serverInfo.tcpPort}}</td>
          </tr>
          <tr>
            <td class="table-key">主机名</td>
            <td class="table-value">{{serverInfo.hostName}}</td>
          </tr>
          <tr v-for="(item, index) in serverInfo.ipAddress">
            <td class="table-key">IP地址「{{index + 1}}」</td>
            <td class="table-value">{{item}}</td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card-detail-item" v-if="serverSettingInfo">
        <div class="header">后端全局设置</div>
        <table class="content-table">
          <tr>
            <td class="table-key">调试模式</td>
            <td class="table-value" v-if="serverSettingInfo.debugMode" v-bind:style="{ color: 'red' }">已开启</td>
            <td class="table-value" v-else v-bind:style="{ color: 'green' }">已关闭</td>
          </tr>
          <tr>
            <td class="table-key">检错重发</td>
            <td class="table-value" v-if="serverSettingInfo.needReplyMode" v-bind:style="{ color: 'green' }">已开启</td>
            <td class="table-value" v-else v-bind:style="{ color: 'red' }">已关闭</td>
          </tr>
          <tr>
            <td class="table-key">随机数据</td>
            <td class="table-value" v-if="serverSettingInfo.randomDataMode" v-bind:style="{ color: 'red' }">已开启</td>
            <td class="table-value" v-else v-bind:style="{ color: 'green' }">已关闭</td>
          </tr>
          <tr>
            <td class="table-key">本地配置文件</td>
            <td class="table-value">{{serverSettingInfo.configFilePath}}</td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card-detail-item" v-if="sysEnvInfo">
        <div class="header">运行环境</div>
        <table class="content-table">
          <tr>
            <td class="table-key">JVM</td>
            <td class="table-value">{{sysEnvInfo.jvm}}</td>
          </tr>
          <tr>
            <td class="table-key">版本</td>
            <td class="table-value">{{sysEnvInfo.version}}</td>
          </tr>
          <tr>
            <td class="table-key">操作系统</td>
            <td class="table-value">{{sysEnvInfo.system}}</td>
          </tr>
          <tr>
            <td class="table-key">语言</td>
            <td class="table-value">{{sysEnvInfo.language}}</td>
          </tr>
          <tr>
            <td class="table-key">用户名</td>
            <td class="table-value">{{sysEnvInfo.userName}}</td>
          </tr>
          <tr>
            <td class="table-key">文件编码</td>
            <td class="table-value">{{sysEnvInfo.fileEncoding}}</td>
          </tr>
          <tr>
            <td class="table-key">系统编码</td>
            <td class="table-value">{{sysEnvInfo.sysEncoding}}</td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card-detail-item" v-if="dataBaseInfo">
        <div class="header">数据库服务器</div>
        <table class="content-table">
          <tr>
            <td class="table-key">类型</td>
            <td class="table-value">{{dataBaseInfo.type}}</td>
          </tr>
          <tr>
            <td class="table-key">端口号</td>
            <td class="table-value">{{dataBaseInfo.port}}</td>
          </tr>
          <tr>
            <td class="table-key">主机名</td>
            <td class="table-value">{{dataBaseInfo.host}}</td>
          </tr>
          <tr>
            <td class="table-key">IP地址</td>
            <td class="table-value">{{dataBaseInfo.ip}}</td>
          </tr>
          <tr>
            <td class="table-key">数据库</td>
            <td class="table-value">{{dataBaseInfo.database}}</td>
          </tr>
        </table>
      </el-card>
      <el-card id="box-card-for-outline-echarts-pie" class="box-card-detail-item">
        通信延迟
        <div id="outline-echarts-pie-container">
          <div id="device-group-outline-pie"></div>
        </div>
      </el-card>
      <el-card class="box-card-detail-item" v-if="tcpInfo">
        <div class="header">设备通信</div>
        <table class="content-table">
          <tr>
            <td class="table-key">帧发送间隔</td>
            <td class="table-value">{{tcpInfo.frameSendInterval}}</td>
          </tr>
          <tr>
            <td class="table-key">帧重发监测延时</td>
            <td class="table-value">{{tcpInfo.detectInterval}}</td>
          </tr>
          <tr>
            <td class="table-key">通信容忍延时</td>
            <td class="table-value">{{tcpInfo.commDelay}}</td>
          </tr>
          <tr>
            <td class="table-key">检错重发次数</td>
            <td class="table-value">{{tcpInfo.autoRepeatTimes}}</td>
          </tr>
          <tr>
            <td class="table-key">剩余充电次数报警</td>
            <td class="table-value">{{tcpInfo.remainChargeTimes}}</td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card-detail-item" v-if="tcpDetailInfo">
        <div class="header">通信细节</div>
        <table class="content-table">
          <tr>
            <td class="table-key">最大设备组号</td>
            <td class="table-value">{{tcpDetailInfo.maxGroupId}}</td>
          </tr>
          <tr>
            <td class="table-key">最大设备号</td>
            <td class="table-value">{{tcpDetailInfo.maxDeviceId}}</td>
          </tr>
          <tr>
            <td class="table-key">主帧帧头长度</td>
            <td class="table-value">{{tcpDetailInfo.frameHeadLength}}</td>
          </tr>
          <tr>
            <td class="table-key">数据体最大长度</td>
            <td class="table-value">{{tcpDetailInfo.maxDataLength}}</td>
          </tr>
          <tr>
            <td class="table-key">子帧帧头长度</td>
            <td class="table-value">{{tcpDetailInfo.subFrameHeadLength}}</td>
          </tr>
          <tr>
            <td class="table-key">数据发送响应时间(ms)</td>
            <td class="table-value">{{tcpDetailInfo.awakeToProcessInterval}}</td>
          </tr>
        </table>
      </el-card>

    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { serverInfoOutline } from '@/api/server'
  import { Message } from 'element-ui'

  export default {
    name: 'dashboard',
    data() {
      return {
        // ***** 概况信息 ******
        commStatus: true,
        workStatus: true,

        // ***** 细节信息 ******
        // 主服务器信息
        serverInfo: null,
        // 系统运行环境
        sysEnvInfo: null,
        // 服务器全局设置
        serverSettingInfo: null,
        // 数据库信息
        dataBaseInfo: null,
        // TCP 设置
        tcpInfo: null,
        // TCP 设置
        tcpDetailInfo: null,

        option: '待获取',
        myChartPieOutline: '待获取'
      }
    },
    computed: {
      version() {
        if (this.serverInfo) {
          return this.serverInfo.version
        }
        return '待获取'
      }
    },
    methods: {
      doky: function() {
        console.log('doky')
        const value = Math.round(Math.random() * 100)
        // if (value > 20) value = '99'
        this.option.series[0].data[0].value = value
        this.myChartPieOutline.setOption(this.option, true)
      }
    },
    mounted: function() {
      this.option = {
        series: [
          {
            name: '通信延迟图示',
            type: 'gauge',
            detail: { formatter: '{value} ms' },
            data: [{ value: 50, name: '' }],
            min: 0,
            max: 100,
            radius: '100%'
          }
        ]
      }
      this.myChartPieOutline = echarts.init(document.getElementById('device-group-outline-pie'))
      // 调取HTTP API获取数据
      serverInfoOutline().then(response => {
        Message.success('HTTP API调用成功「1」')
        const data = response.data
        this.dataBaseInfo = data.dataBaseInfo
        this.serverInfo = data.serverInfo
        this.serverSettingInfo = data.serverSettingInfo
        this.sysEnvInfo = data.sysEnvInfo
        this.tcpInfo = data.tcpInfo
        this.tcpDetailInfo = data.tcpDetailInfo
      }).catch(error => {
        Message.error('错误信息1：' + error + '稍后重新获取')
        setTimeout(this.getDeviceCount, 10000)
      })
      // this.doky()
      // setTimeout(this.doky, 2000)
    }
  }
</script>

<style scoped>
  #main-container {
    font-weight: bold;
    padding: 10px;
  }

  #item-container {
    display: flex;
    justify-content: center;
    /*flex-wrap: wrap;*/
  }

  /******** 概览 Card ***********/
  .box-card-outline-item {
    max-width: 33%;
    min-width: 120px;
    height: 100px;
    flex: 1 1 auto;
    margin: 10px;
    transition: 0.3s;
    cursor: pointer;
  }

  .box-card-outline-item:hover {
    background-color: rgba(0, 255, 153, 0.11);
    flex: 2 1 auto;
  }

  /******* 总card header *********/
  .header {
    color: rgba(0, 0, 0, 0.51);
    padding-bottom: 10px;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  /******** 概览 Card 内容 ***********/
  .box-card-outline-item .content {
    font-size: 130%;
    text-align: center;
    padding-top: 10px;
  }

  /********* 大的box-card显示服务器详情 *****/
  #server-status-content {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  /*********** box-card **************/
  .box-card-detail-item {
    max-width: 45%;
    min-width: 200px;
    height: 320px;
    flex: 1.2 0.8 auto;
    /*height: 100%;*/
    font-size: 120%;
    margin: 10px 25px;
    cursor: pointer;
    transition: 0.3s;
  }

  .box-card-detail-item:hover {
    background-color: rgba(0, 225, 255, 0.11);
    flex: 2 1 auto;
  }

  .box-card-detail-item .content-table {
    width: 100%;
    padding: 10px;
  }

  .box-card-detail-item .table-key {
    padding: 5px 10px 5px 0;
    font-weight: normal;
  }

  .box-card-detail-item .table-value {
  }

  /*********** echarts-pie ***********************/
  #box-card-for-outline-echarts-pie {
    color: rgba(0, 0, 0, 0.51);
  }

  #box-card-for-outline-echarts-pie #outline-echarts-pie-container {
    transition: 0.3s;
    height: 320px;
  }

  #box-card-for-outline-echarts-pie #outline-echarts-pie-container #device-group-outline-pie {
    margin: 0 auto;
    max-width: 320px;
    width: 320px;
    height: 100%;
  }
</style>
