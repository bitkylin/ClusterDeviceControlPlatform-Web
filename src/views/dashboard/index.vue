<template>
  <div id="main-container">
    <div id="item-container">
      <!--服务器连接状态-->
      <el-card class="box-card-item">
        <div class="card-header">连接状态</div>
        <div class="content">正常</div>
      </el-card>
      <!--服务器工作状态-->
      <el-card class="box-card-item">
        <div class="card-header">工作状态</div>
        <div class="content">正常</div>
      </el-card>
      <!--服务器延迟-->
      <el-card class="box-card-item">
        <div class="card-header">延迟</div>
        <div class="content">10 ms</div>
      </el-card>
      <!--连接设备组数-->
      <el-card class="box-card-item">
        <div class="card-header">设备组数</div>
        <div class="content">56</div>
      </el-card>
      <!--是否有未读的服务器消息-->
      <el-card class="box-card-item">
        <div class="card-header">未读消息</div>
        <div class="content">0</div>
      </el-card>
    </div>
    <!--服务器信息详情-->
    <div id="server-status-content">
      <el-card class="box-card-content">
        <div class="card-header">主服务器</div>
        <table class="content-table">
          <tr>
            <td class="content-key">调试模式</td>
            <td class="content-value">已开启</td>
          </tr>
          <tr>
            <td class="content-key">服务器地址：</td>
            <td class="content-value">http://localhost</td>
          </tr>
          <tr>
            <td class="content-key">Web端口号</td>
            <td class="content-value">8080</td>
          </tr>

          <tr>
            <td class="content-key">版本</td>
            <td class="content-value">1.0.3</td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card-content">
        <div class="card-header">数据库服务器</div>
        <table class="content-table">
          <tr>
            <td class="content-key">状态</td>
            <td class="content-value">正常</td>
          </tr>
          <tr>
            <td class="content-key">主机名或IP</td>
            <td class="content-value">lml-desktop</td>
          </tr>
          <tr>
            <td class="content-key">端口号</td>
            <td class="content-value">27017</td>
          </tr>
          <tr>
            <td class="content-key">数据库</td>
            <td class="content-value">bitkyTest</td>
          </tr>
        </table>
      </el-card>
      <el-card id="box-card-for-outline-echarts-pie" class="box-card-content">
        通信延迟
        <div id="outline-echarts-pie-container">
          <div id="device-group-outline-pie"></div>
        </div>
      </el-card>
      <el-card class="box-card-content">
        <div class="card-header">设备通信</div>
        <table class="content-table">
          <tr>
            <td class="content-key">TCP端口号</td>
            <td class="content-value">30232</td>
          </tr>
          <tr>
            <td class="content-key">检错重发</td>
            <td class="content-value">已开启</td>
          </tr>
          <tr>
            <td class="content-key">帧发送间隔</td>
            <td class="content-value">300ms</td>
          </tr>
          <tr>
            <td class="content-key">帧重发监测延时</td>
            <td class="content-value">5s</td>
          </tr>
          <tr>
            <td class="content-key">通信最大容忍延时</td>
            <td class="content-value">5s</td>
          </tr>
          <tr>
            <td class="content-key">剩余充电次数报警</td>
            <td class="content-value">20次</td>
          </tr>
        </table>
      </el-card>

      <el-card class="box-card-content">
        <div class="card-header">通信细节</div>
        <table class="content-table">
          <tr>
            <td class="content-key">最大设备组号</td>
            <td class="content-value">100</td>
          </tr>
          <tr>
            <td class="content-key">最大设备号</td>
            <td class="content-value">100</td>
          </tr>
          <tr>
            <td class="content-key">发送消息处理延时</td>
            <td class="content-value">5ms</td>
          </tr>
          <tr>
            <td class="content-key">主帧数据体最大长度</td>
            <td class="content-value">1400Byte</td>
          </tr>
          <tr>
            <td class="content-key">通信最大容忍延时</td>
            <td class="content-value">5s</td>
          </tr>
          <tr>
            <td class="content-key">剩余充电次数报警</td>
            <td class="content-value">20次</td>
          </tr>
        </table>
      </el-card>

    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'second',
    data() {
      return {
        option: 1,
        myChartPie: 1
      }
    },
    computed: {
      arr: function() {
        const res = []
        for (let i = 1; i <= 100; i++) {
          const charge = (Math.random() * 4).toFixed(0)
          const work = (Math.random() * 4).toFixed(0)
          const r = { 'no': i, 'charge': charge, 'work': work }
          console.log(r)
          res.push(r)
        }
        return res
      }
    },
    methods: {
      doky: function() {
        const value = (Math.random() * 100).toFixed(0) - 0
        // if (value > 20) value = '99'
        this.option.series[0].data[0].value = value
        this.myChartPie.setOption(this.option, true)
      }
    },
    mounted: function() {
      this.option = {
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            detail: { formatter: '{value} ms' },
            data: [{ value: 50, name: '' }],
            min: 0,
            max: 100,
            radius: '100%'
          }
        ]
      }
      this.myChartPie = echarts.init(document.getElementById('device-group-outline-pie'))
      setInterval(this.doky, 2000)
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
    flex-wrap: wrap;
  }

  /******** 概览 Card ***********/
  .box-card-item {
    max-width: 33%;
    min-width: 120px;
    height: 100px;
    flex: 1 1 auto;
    margin: 10px 25px;
    transition: 0.3s;
    cursor: pointer;
  }

  .box-card-item:hover {
    background-color: rgba(0, 255, 153, 0.11);
    flex: 2 1 auto;
  }

  /******* 总card header *********/
  .card-header {
    color: rgba(0, 0, 0, 0.51);
    padding-bottom: 10px;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  /******** 概览 Card 内容 ***********/
  .box-card-item .content {
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
  .box-card-content {
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

  .box-card-content:hover {
    background-color: rgba(0, 225, 255, 0.11);
    flex: 2 1 auto;
  }

  .box-card-content .content-table {
    width: 100%;
    padding: 20px;
  }

  .box-card-content .content-key {
    padding: 5px 20px;
    font-weight: normal;
  }

  .box-card-content .content-value {
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
