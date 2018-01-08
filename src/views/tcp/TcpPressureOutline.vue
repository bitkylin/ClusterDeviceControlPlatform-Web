<template>
  <div id="main-container">
    <div id="outline-container">
      <el-card class="box-card-outline">
        <div class="header">设备组容量</div>
        <div class="content">{{itemCount}}</div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="header">已接入通道数</div>
        <div class="content">{{itemConnected}}</div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="header">未接入通道数</div>
        <div class="content">{{itemDisconnected}}</div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="header">待接入通道池</div>
        <div class="content">{{itemWaiting}}</div>
      </el-card>
      <div id="outline-echarts-pie-container">
        <div id="device-group-outline-pie"></div>
      </div>
    </div>

    <div id="tcp-traffic-outline-bar"></div>

    <div id="item-container">
      <!--服务器连接状态-->
      <el-popover :key="kyItem.id" v-if="channelItems" v-for="kyItem in channelItems"
                  class="box-card-outline-item"
                  placement="top"
                  title="信息"
                  trigger="hover">
        <div>缓存消息：{{kyItem.count}}个</div>
        <div>工作状态：{{buttonItem(kyItem.enabled,kyItem.count).detail}}</div>
        <div v-if="!kyItem.enabled" :style="{color: 'red'}">该设备未接入</div>
        <el-button slot="reference" :style="{width: '100%', height: '100%' }"
                   v-bind:type="buttonItem(kyItem.enabled,kyItem.count).btnType">{{kyItem.id}}
        </el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { tcpOutline } from '@/api/tcp'
  import { setTimer, touchError } from '@/utils/timer'

  export default {
    name: 'tcpPressureOutline',
    // watch: { itemConnected: 'draw' },
    data: function() {
      return {
        // 定时器管理
        timer: [],
        itemCount: '待获取',
        itemConnected: '待获取',
        itemDisconnected: '待获取',
        itemWaiting: '待获取',
        channelItems: null,
        // 「服务器获取」设置报警的限定:负载的限定
        normalLimit: null,
        exceptionLimit: null,
        // 两个Chart的引用
        myChartPieOutline: '待获取',
        myChartBarDetail: '待获取',
        barDataZoomStart: 0,
        barDataZoomEnd: 50
      }
    },
    computed: {},
    mounted: function() {
      // 初始化并挂载饼图
      this.myChartPieOutline = echarts.init(document.getElementById('device-group-outline-pie'))
      this.myChartPieOutline.setOption(this.updatePie(0, 0))
      // 初始化柱状图的模拟数据
      this.myChartBarDetail = echarts.init(document.getElementById('tcp-traffic-outline-bar'))
      this.myChartBarDetail.setOption(this.initBarDetail('random'))
      window.onresize = () => this.myChartBarDetail.resize()
      setTimer(this.getData, 5000)
    },
    beforeDestroy() {
      if (this.timer.length > 0) {
        for (let i = 0; i < this.timer.length; i++) {
          clearInterval(this.timer[i])
        }
      }
    },
    methods: {
      // HTTP API 获取数据
      getData() {
        const vm = this
        tcpOutline().then(response => {
          vm.processRemoteData(response.data)
        }).catch(error => {
          touchError(this, this.getData, error)
        })
      },
      // 展示 Items 的样式动态设定
      buttonItem: function(enabled, count) {
        let btnType
        let detail
        if (count < this.normalLimit) {
          btnType = 'success'
          detail = '正常'
        } else if (count >= this.exceptionLimit) {
          btnType = 'danger'
          detail = '过载'
        } else {
          btnType = 'warning'
          detail = '繁忙'
        }
        if (!enabled) {
          btnType = 'info'
        }
        return { btnType: btnType, detail: detail }
      },
      // 根据缓存的消息数量，获取描述
      itemDescribe(count) {
        if (count < this.normalLimit) {
          return '正常'
        } else if (count >= this.exceptionLimit) {
          return '过载'
        } else {
          return '繁忙'
        }
      },
      // 处理从服务器获取的数据
      processRemoteData(response) {
        this.itemConnected = Number.parseInt(response.activatedCount)
        this.itemDisconnected = Number.parseInt(response.inactivatedCount)
        this.itemWaiting = Number.parseInt(response.waitToActivateCount)
        this.itemCount = this.itemConnected + this.itemDisconnected
        this.normalLimit = Number.parseInt(response.normalLimit)
        this.exceptionLimit = Number.parseInt(response.exceptionLimit)
        this.channelItems = response.channelItems

        this.myChartPieOutline.setOption(this.updatePie(this.itemConnected, this.itemDisconnected))
        this.myChartBarDetail.setOption(this.initBarDetail('response', response.channelItems))
      },
      // 初始化饼图的模拟数据
      updatePie(itemConnected, itemDisconnected) {
        return {
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              name: '连接状况',
              type: 'pie',
              roseType: 'angle',
              radius: '45%',
              data: [
                { value: itemDisconnected, name: '未连接' },
                { value: itemConnected, name: '已连接' }
              ]
            }
          ]
        }
      },
      // 初始化柱状图的模拟数据
      initBarDetail(type, channelItems) {
        let length = 10
        const xData = [] // 横坐标内容
        const msgCountData = [] // 消息计数
        const timeCostsData = [] // 消息处理的时间成本
        if (type === 'response') {
          length = channelItems.length
          for (let i = 0; i < length; i++) {
            const item = channelItems[i]
            xData.push(item.id + '组')
            msgCountData.push(item.count)
            timeCostsData.push(Math.round(item.count * 0.05))
          }
        } else {
          for (let i = 0; i < length; i++) {
            xData.push(i + 1 + '组')
            const value = Math.round(Math.random() * 500)
            msgCountData.push(value)
            timeCostsData.push(Math.round(value * 0.05))
          }
        }
        return {
          title: {
            text: 'TCP接口压力图示',
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
            bottom: 0,
            start: this.barDataZoomStart,
            end: this.barDataZoomEnd
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
    /*flex-flow: wrap;*/
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
    background-color: rgba(0, 227, 230, 0.07);
  }

  #outline-container .box-card-outline:hover {
    background-color: rgba(255, 255, 255, 0.07);
  }

  #outline-container .box-card-outline .content {
    font-size: 130%;
    text-align: center;
    padding-top: 10px;
  }

  #outline-container .box-card-outline .header {
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

  /*********** echarts-bar-detail ***********************/
  #tcp-traffic-outline-bar {
    padding-top: 20px;
    width: 100%;
    height: 70vh;
  }

  /*********** item-container ***********************/

  #item-container {
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
  }

  #item-container .box-card-outline-item {
    max-width: 80px;
    width: 80px;
    flex: 1 1 auto;
    margin: 10px 10px;
    transition: 0.3s;
    cursor: pointer;
  }
</style>
