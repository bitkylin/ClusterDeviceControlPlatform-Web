<template>
  <div id="main-container">
    <div id="tcp-traffic-outline-bar"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'second',
    data() {
      return {
        myChartBar: null
      }
    },
    mounted() {
      this.initChart()
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById('tcp-traffic-outline-bar'))
        const xData = [] // 横坐标内容
        const msgCountData = [] // 消息计数
        const timeCostsData = [] // 消息处理的时间成本
        for (let i = 1; i < 100; i++) {
          xData.push(i + '组')
          const value = (Math.random() * 500).toFixed(0)
          msgCountData.push(value)
          timeCostsData.push((value * 0.3).toFixed(2))
        }

        this.chart.setOption({
          title: {
            text: 'TCP接口模块压力概览',
            x: '100'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {}
          },
          legend: {
            align: 'left',
            right: '100',
            data: ['待处理(个)', '预计耗时(s)']
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            data: xData
          }],
          yAxis: [{
            type: 'value',
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            splitArea: {
              show: false
            }
          }],
          dataZoom: [{
            show: true,
            height: 30,
            xAxisIndex: [
              0
            ],
            bottom: 30,
            start: 0,
            end: 50
          }],
          series: [{
            name: '待处理(个)',
            type: 'bar',
            stack: 'total',
            barMaxWidth: 50,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter(p) {
                    return p.value + '个'
                  }
                }
              }
            },
            data: msgCountData
          }, {
            name: '预计耗时(s)',
            type: 'line',
            stack: 'total',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  formatter(p) {
                    return p.value + ' s'
                  }
                }
              }
            },
            data: timeCostsData
          }]
        })
      }
    }
  }
</script>

<style scoped>
  #tcp-traffic-outline-bar {
    padding-top: 20px;
    width: 100%;
    height: 90vh;
  }
</style>
first.vue
