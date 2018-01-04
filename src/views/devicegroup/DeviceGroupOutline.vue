<template>
  <div id="main-container">
    <div id="outline-container">
      <el-card class="box-card-outline">
        <div class="card-header">设备组总数</div>
        <div class="content">100</div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="card-header">已连接数</div>
        <div class="content">{{itemConnected}}</div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="card-header">未连接数</div>
        <div class="content">{{itemDisconnected}}</div>
      </el-card>
      <div id="outline-echarts-pie-container">
        <div id="device-group-outline-pie"></div>
      </div>
    </div>
    <div id="device-group-outline-bar"></div>
    <div id="item-container">
      <!--服务器连接状态-->
      <el-card :key="kyItem" v-for="kyItem in arr" class="box-card-item">
        <div class="content">{{kyItem}}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'third',
    watch: { itemConnected: 'draw' },
    data: function() {
      return {
        itemConnected: 96,
        itemDisconnected: 4,
        myChartPie: 1,
        myChartBar: 1
      }
    },
    computed: {
      itemCountAll: function() {
        return this.itemConnected + this.itemDisconnected
      },
      // 模拟生成100个设备
      arr: function() {
        const res = []
        for (let i = 1; i <= 100; i++) {
          res.push(i)
        }
        return res
      }
    },
    mounted: function() {
      // 初始化并挂载饼图
      this.myChartPie = echarts.init(document.getElementById('device-group-outline-pie'))
      this.myChartPie.setOption(this.initPie())
      // 初始化并挂载柱状图
      this.myChartBar = echarts.init(document.getElementById('device-group-outline-bar'))
      this.myChartBar.setOption(this.initbar())
    },
    methods: {
      // 初始化饼图的模拟数据
      initPie() {
        return {
          tooltip: {
            trigger: 'item'
            // axisPointer: { // 坐标轴指示器，坐标轴触发有效
            //   type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            // }
          },
          series: [
            {
              name: '连接状况',
              type: 'pie',
              roseType: 'angle',
              radius: '45%',
              data: [
                { value: this.itemDisconnected, name: '未连接' },
                { value: this.itemConnected, name: '已连接' }
              ]
            }
          ]
        }
      },
      // 初始化柱状图的模拟数据
      initbar() {
        const xAxisData = []
        const data1 = []
        const data2 = []
        const data3 = []

        for (let i = 0; i < 100; i++) {
          xAxisData.push(i + '组')
          data1.push((Math.random() * 2).toFixed(0))
          data2.push(Math.random().toFixed(0))
          data3.push((Math.random() * 5).toFixed(0))
        }
        return {
          // this.optionBar = {
          // backgroundColor: '#eee',
          title: {
            text: '设备组概览柱状图',
            align: 'center'
          },
          legend: {
            data: ['未充电', '充电中', '已充满'],
            align: 'left',
            right: '100'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          xAxis: {
            data: xAxisData,
            // name: '设备组号',
            axisLine: { onZero: true },
            splitLine: { show: false },
            splitArea: { show: false }
          },
          yAxis: {
            splitArea: { show: false }
          },
          grid: {
            left: 100
          },

          series: [
            {
              name: '未充电',
              type: 'bar',
              stack: 'one',
              data: data1
            },
            {
              name: '充电中',
              type: 'bar',
              stack: 'one',
              data: data2
            },
            {
              name: '已充满',
              type: 'bar',
              stack: 'one',
              data: data3
            }
          ]
        }
      }
    }
  }
</script>

<style scoped>
  #main-container {
    /*display: flex;*/
    font-weight: bold;
    padding: 0 10px;
  }

  /*********** outline ***********************/
  #outline-container {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);;
  }

  #outline-container .box-card-outline {
    max-width: 250px;
    height: 100px;
    flex: 2 1 auto;
    margin: 20px 10px;
    transition: 0.3s;
    cursor: pointer;
  }

  #outline-container .box-card-outline:hover {
    background-color: rgba(0, 255, 255, 0.11);
  }

  #outline-container .box-card-outline .content {
    font-size: 130%;
    text-align: center;
    padding-top: 10px;
  }

  #outline-container .box-card-outline .card-header {
    color: rgba(0, 0, 0, 0.51);
    padding-bottom: 10px;
    text-align: center;
  }

  /*********** echarts-pie ***********************/
  #outline-echarts-pie-container {
    transition: 0.3s;
    height: 150px;
  }

  #outline-echarts-pie-container #device-group-outline-pie {
    max-width: 250px;
    width: 250px;
    height: 100%;
  }

  /*********** echarts-bar ***********************/
  #device-group-outline-bar {
    width: 100%;
    height: 400px;
    padding-top: 15px;
  }

  /*********** item-container ***********************/

  #item-container {
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
  }

  #item-container .box-card-item {
    max-width: 80px;
    width: 80px;
    flex: 1 1 auto;
    margin: 10px 10px;
    transition: 0.3s;
    cursor: pointer;
  }

  #item-container .box-card-item:hover {
    background-color: rgba(0, 255, 255, 0.11);
  }

  #item-container .box-card-item .content {
    text-align: center;
    width: 40px;
  }
</style>
