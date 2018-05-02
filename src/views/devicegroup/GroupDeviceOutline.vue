<template>
  <div id="main-container">
    <div id="device-group-outline-bar"></div>

    <div id="outline-echarts-pie-description">设备组细节饼状图</div>
    <div id="outline-echarts-pie-container">
      <div :key="item.id" v-for="item in pieItems" :id="'device-group-outline-pie-no'+item.id"
           class="device-group-outline-pie" @click="routerToSelectedSingleGroup(item.id)"></div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { deviceGroupDataOutline, deviceGroupCount } from '@/api/data'
  import { setTimer, touchError } from '@/utils/timer'
  import { saveGroupId } from '@/utils/storeUtil'

  export default {
    name: 'groupDeviceOutline',
    data: function() {
      return {
        routerSingle: '/devicegroup/single',
        // 「服务器获取」设备组数量
        deviceGroupCount: 0,
        // 「服务器获取」设置报警的限定:负载的限定
        normalLimit: null,
        exceptionLimit: null,
        // 概况柱状图
        myChartBar: '待获取',
        // 细节 Item 饼图的集合
        myChartPieOutline: []
      }
    },
    computed: {
      // 前端数据随机产生
      pieItems: function() {
        const arr = []
        for (let i = 1; i <= this.deviceGroupCount; i++) {
          arr.push({ id: i })
        }
        return arr
      }
    },
    mounted: function() {
      // 初始化并挂载柱状图
      this.myChartBar = echarts.init(document.getElementById('device-group-outline-bar'))
      window.onresize = () => this.myChartBar.resize()
      // 调取HTTP API获取数据
      this.getdeviceGroupCount()
      if (this.$route.path === '/solo/devicegroup/outline') {
        this.routerSingle = '/solo/devicegroup/single'
      }
    },
    methods: {
      routerToSelectedSingleGroup(id) {
        saveGroupId(id)
        this.$router.push({ path: this.routerSingle })
      },
      // 「HTTP」获取设备组数量
      getdeviceGroupCount() {
        deviceGroupCount().then(response => {
          this.deviceGroupCount = response.data
          this.myChartBar.setOption(this.updateBar('init'))
          setTimeout(() => setTimer(this.queryDeviceGroupOutline, 5000), 500)
        }).catch(error => {
          touchError(this, this.getdeviceGroupCount, error)
        })
      },
      // 设置定时任务，从服务器轮询数据
      queryDeviceGroupOutline() {
        const vm = this
        deviceGroupDataOutline().then(response => {
          const data = response.data
          vm.deviceGroupCount = data.deviceGroupCount
          vm.normalLimit = data.normalLimit
          vm.exceptionLimit = data.exceptionLimit
          // 对柱状图赋值
          vm.myChartBar.setOption(vm.updateBar('response', data.deviceGroupItems))
          // 对所有饼图赋值，未初始化时即初始化并挂载
          vm.refreshDeviceGroupItems(data.deviceGroupItems)
        }).catch(error => {
          touchError(this, this.getdeviceGroupCount, error)
        })
      },
      // 将HTTP获取的信息更新至柱状图，未初始化时进行初始化
      updateBar(type, response) {
        const xAxisData = []
        const dataUsing = []
        const dataCharging = []
        const dataFull = []
        const dataUnInit = []
        if (type === 'init') {
          for (let i = 1; i <= this.deviceGroupCount; i++) {
            xAxisData.push(i + '组')
            dataUsing.push(5)
            dataCharging.push(5)
            dataFull.push(5)
            dataUnInit.push(5)
          }
        } else {
          for (let i = 0; i < response.length; i++) {
            const item = response[i]
            xAxisData.push(item.id + '组')
            dataUsing.push(item.usingCount)
            dataCharging.push(item.chargingCount)
            dataFull.push(item.fullCount)
            dataUnInit.push(item.uninitCount)
          }
        }
        return {
          title: {
            text: '设备组概览柱状图',
            textStyle: {
              color: 'black'
            }
          },
          legend: {
            data: ['充电中', '未初始化', '已充满', '使用中'],
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
              name: '充电中',
              type: 'bar',
              stack: 'one',
              data: dataCharging
            },
            {
              name: '未初始化',
              type: 'bar',
              stack: 'one',
              data: dataUnInit
            },
            {
              name: '已充满',
              type: 'bar',
              stack: 'one',
              data: dataFull
            },
            {
              name: '使用中',
              type: 'bar',
              stack: 'one',
              data: dataUsing
            }
          ]
        }
      },
      // 将HTTP获取的信息更新至饼图
      refreshDeviceGroupItems(deviceGroupItems) {
        for (let i = 0; i < this.deviceGroupCount; i++) {
          const item = deviceGroupItems[i]
          if (!this.myChartPieOutline[item.id]) {
            this.myChartPieOutline[item.id] = echarts.init(document.getElementById('device-group-outline-pie-no' + item.id))
            console.log('初始化')
          }
          this.myChartPieOutline[item.id].setOption(this.updatePie(item.id, item.usingCount, item.chargingCount, item.fullCount, item.uninitCount))
        }
      },
      // 更新饼图
      updatePie(id, usingCount, chargingCount, fullCount, unInitCount) {
        return {
          title: {
            text: '第' + id + '组',
            x: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              name: '单组状态',
              type: 'pie',
              // roseType: 'angle',
              radius: '55%',
              label: {
                normal: { show: false }
              },
              data: [
                { value: unInitCount, name: '未初始化' },
                { value: chargingCount, name: '充电中' },
                { value: fullCount, name: '已充满' },
                { value: usingCount, name: '使用中' }
              ]
            }
          ]
        }
      }
    }
  }
</script>

<style scoped>

  /*********** echarts-bar ***********************/
  #device-group-outline-bar {
    width: 100%;
    height: 400px;
    padding-top: 15px;
  }

  /*********** echarts-pie ***********************/
  #outline-echarts-pie-description {
    font-size: 19px;
    font-weight: bold;
    padding-top: 10px;
    padding-bottom: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }

  /*********** echarts-pie ***********************/
  #outline-echarts-pie-container {
    display: flex;
    flex-flow: wrap;
    justify-content: left;
    transition: 0.3s;
  }

  #outline-echarts-pie-container .device-group-outline-pie {
    max-width: 160px;
    width: 160px;
    height: 160px;
  }
</style>
