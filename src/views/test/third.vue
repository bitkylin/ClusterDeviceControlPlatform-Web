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
        <div id="outline-echarts-pie"></div>
      </div>
    </div>
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
        myChart: 1
      }
    },
    computed: {
      itemCountAll: function() {
        return this.itemConnected + this.itemDisconnected
      },
      arr: function() {
        const res = []
        for (let i = 1; i <= 100; i++) {
          res.push(i)
        }
        return res
      }
    },
    mounted: function() {
      this.myChart = echarts.init(document.getElementById('outline-echarts-pie'))
      this.myChart.setOption({
        series: [
          {
            name: '访问来源',
            type: 'pie',
            roseType: 'angle',
            radius: '45%',
            data: [
              { value: this.itemConnected, name: '已连接' },
              { value: this.itemDisconnected, name: '未连接' }
            ]
          }
        ]
      })
    },
    updated: function() {
      console.log(arguments)
    },
    methods: {
      draw() {
        this.myChart.setOption({
          series: [
            {
              name: '访问来源',
              type: 'pie',
              roseType: 'angle',
              radius: '55%',
              data: [
                { value: this.itemConnected, name: '已连接' },
                { value: this.itemDisconnected, name: '未连接' }
              ]
            }
          ]
        })
      }
    }
  }
</script>

<style scoped>
  #main {
    width: 100%;
    height: 100%;
  }

  #main-container {
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  /*********** echarts-pie ***********************/

  #outline-echarts-pie-container {
    transition: 0.3s;
    height: 150px;
  }

  #outline-echarts-pie-container #outline-echarts-pie {
    max-width: 250px;
    width: 250px;
    height: 100%;
  }

  /*********** item-container ***********************/

  #item-container {
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
