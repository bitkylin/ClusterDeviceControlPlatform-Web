<template>
  <div id="main">
    <div id="outline-echarts-pie">

    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'first',
    mounted: () => {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('outline-echarts-pie'))
      // 绘制图表
      myChart.setOption({
        series: [
          {
            name: '访问来源',
            type: 'pie',
            roseType: 'angle',
            radius: '55%',
            data: [
              { value: 235, name: '视频广告' },
              { value: 274, name: '联盟广告' },
              { value: 310, name: '邮件营销' },
              { value: 335, name: '直接访问' },
              { value: 400, name: '搜索引擎' }
            ]
          }
        ]
      })
    }
  }
</script>

<style scoped>
  #main {
    width: 100%;
    height: 100%;
  }

  #outline-echarts-pie {
    width: 100%;
    height: 100vh;
  }
</style>
