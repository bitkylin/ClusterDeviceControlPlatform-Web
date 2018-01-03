<template>
  <div id="main-container">
    <!--<div id="outline-echarts-pie1"></div>-->
    <div id="outline-container">
      <el-card class="box-card-outline">
        <div class="card-header">设备总数</div>
        <div class="content">100</div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="card-header">未充电</div>
        <div class="content">30</div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="card-header">充电中</div>
        <div class="content">20</div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="card-header">已充满</div>
        <div class="content">50</div>
      </el-card>
      <div id="outline-echarts-pie-container">
        <div id="outline-echarts-pie"></div>
      </div>
    </div>
    <div class="block">
      <el-slider
        v-model="value8"
        show-input>
      </el-slider>
    </div>
    <div id="item-container">
      <!--服务器连接状态-->
      <el-card :key="item.no" v-for="item in arr"
               v-bind:class="[item.work<=1 ? 'work-status-great' : item.work>3? 'work-status-error':'work-status-warn']"
               :body-style="{ padding: '10px' }" class="box-card-item">
        <div class="card-header">{{item.no}}</div>
        <div class="content">
          <i v-if="item.charge == 0" class="iconfont icon-kongxianzhong"></i>
          <i v-else-if="item.charge == 1" class="iconfont icon-laodonggaizao"></i>
          <i v-else-if="item.charge == 2" class="iconfont icon-Ankerwebicon-"></i>
          <i v-else-if="item.charge == 3" class="iconfont icon-icon311"></i>
          <i v-else class="iconfont icon-cuowu"></i>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'forth',
    data() {
      return {
        value8: 0,
        option: 1,
        myChart: 1
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
        let value = (Math.random() * 100).toFixed(0) - 0
        if (value > 20) value = '99'
        this.option.series[0].data[0].value = value
        this.myChart.setOption(this.option, true)
      }
    },
    mounted: function() {
      this.option = {
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            detail: { formatter: '{value}个' },
            data: [{ value: 50, name: '' }],
            min: 0,
            max: 100,
            radius: '140%'
          }
        ]
      }
      this.myChart = echarts.init(document.getElementById('outline-echarts-pie'))
      setInterval(this.doky, 2000)
    }
  }
</script>

<style scoped>
  i {
    color: rgba(0, 0, 0, 0.75);
  }

  i.icon-laodonggaizao {
    color: rgba(0, 1, 137, 0.76);
  }

  i.icon-Ankerwebicon- {
    color: rgba(153, 174, 0, 0.76);
  }

  i.icon-icon311 {
    color: rgba(0, 128, 0, 0.75);
  }

  i.icon-cuowu {
    color: rgba(255, 0, 0, 0.75);
  }

  .work-status-great {
    background-color: rgba(0, 255, 255, 0.08);
  }

  .work-status-error {
    background-color: rgba(255, 0, 0, 0.09);
  }

  .work-status-warn {
    background-color: rgba(255, 255, 0, 0.09);
  }

  #main-container {
    font-weight: bold;
    padding: 0px 10px;
  }

  /****************** outline item **********************/
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
    background-color: rgba(180, 255, 0, 0.1);
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

  /****************** item **********************/
  #item-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
  }

  #item-container .box-card-item {
    max-width: 150px;
    width: 150px;
    flex: 1 1 auto;
    margin: 10px 0px 5px 10px;
    transition: 0.3s;
    cursor: pointer;
    /*background-color: rgba(0, 227, 255, 0.07);*/
  }

  #item-container .box-card-item:hover {
    background-color: rgba(255, 255, 255, 0.07);
  }

  #item-container .box-card-item .card-header {
    color: rgba(0, 0, 0, 0.51);
    padding-bottom: 10px;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  #item-container .box-card-item .content {
    text-align: center;
    padding-top: 10px;
  }

  #item-container .box-card-item .content .iconfont {
    font-size: 200%
  }
</style>
