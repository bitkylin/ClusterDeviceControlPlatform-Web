<template>
  <!--<div id="main-container">-->
    <div id="device-group-outline-pie"></div>
  <!--</div>-->
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'first',
    data: function() {
      return {
        myChartPie: 1,
        option: 1
      }
    },
    mounted: function() {
      const xAxisData = []
      const data1 = []
      const data2 = []
      const data3 = []

      for (let i = 0; i < 100; i++) {
        xAxisData.push(i + '组')
        data1.push(Math.random() * 2).toFixed(2)
        data2.push(Math.random().toFixed(2))
        data3.push(Math.random() * 5).toFixed(2)
      }

      this.option = {
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
      this.myChartPie = echarts.init(document.getElementById('device-group-outline-pie'))
      this.myChartPie.setOption(this.option)
    }
  }
</script>
<style scoped>
  #main-container {
    width: 100%;
    height: 100%;
  }

  #device-group-outline-pie {
    width: 100%;
    height: 400px;
    padding: 10px;
  }
</style>
