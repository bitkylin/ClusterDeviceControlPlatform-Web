<template>
  <div id="main-container">
    <!--<div id="outline-echarts-pie1"></div>-->
    <div id="outline-container">
      <el-card class="box-card-outline">
        <div class="header">设备总数</div>
        <div class="content">{{deviceCount}}</div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="header">使用中</div>
        <div class="content">{{usingCount}}</div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="header">充电中</div>
        <div class="content">{{chargingCount}}</div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="header">已充满</div>
        <div class="content">{{fullCount}}</div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="header">未初始化</div>
        <div class="content">{{uninitCount}}</div>
      </el-card>
      <div id="outline-echarts-pie-container">
        <div id="device-group-outline-pie"></div>
      </div>
    </div>
    <div class="group-id-selecter">
      <el-slider
        v-model="selectedGroupId"
        show-input>
      </el-slider>
    </div>
    <div id="item-container" v-if="deviceItems">
      <!--服务器连接状态-->
      <el-card :key="item.id" v-for="item in deviceItems"
               v-bind:class="item.workStatus === 1 ? 'work-status-great' : 'work-status-error'"
               :body-style="{ padding: '0' }" class="box-card-outline-item">
        <div class="header">{{item.id}}号</div>
        <div class="content" v-if="statusItems[item.id-1]==='show'" v-on:click="itemCardClicked(item.id)">
          <i v-if="item.chargeStatus === 0" class="iconfont icon-kongxianzhong"></i>
          <i v-else-if="item.chargeStatus=== 1" class="iconfont icon-laodonggaizao"></i>
          <i v-else-if="item.chargeStatus === 2" class="iconfont icon-icon311"></i>
          <i v-else-if="item.chargeStatus === 3" class="iconfont icon-Ankerwebicon-"></i>
          <i v-else class="iconfont icon-cuowu"></i>
        </div>
        <div class="content" v-else-if="statusItems[item.id-1]==='hover'" v-on:click="itemCardClicked(item.id)">
          <div>{{item.chargeStatusDescription}}</div>
          <div>{{item.workStatusDescription}}</div>
        </div>
        <div class="content" v-else>
          <div>待获取</div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { singleGroupDeviceData, singleGroupDeviceCount } from '@/api/data'
  import { setTimer, touchError } from '@/utils/timer'
  import { saveGroupId, getGroupId } from '@/utils/kyUtil'

  export default {
    name: 'singleDeviceOutline',
    data() {
      return {
        // 当前设备组号
        selectedGroupId: getGroupId(),
        // 单组中的设备数量
        deviceCount: 0,
        usingCount: 0,
        chargingCount: 0,
        fullCount: 0,
        uninitCount: 0,
        // 待处理消息数量
        msgCount: 0,
        // card item 的当前状态，用户操作卡片时，状态改变
        statusItems: [],
        // 「HTTP获取」设备 items 详细信息集合
        deviceItems: [],
        option: '待获取',
        myChartPieOutline: '待获取'
      }
    },
    watch: {
      // 将被选中的 GroupId 存入 Store
      selectedGroupId: function(val, oldVal) {
        saveGroupId(val)
      }
    },
    methods: {
      // 卡片点击回调
      itemCardClicked(id) {
        console.log('itemCardClicked')
        const status = this.statusItems[id - 1]
        if (status === 'show') {
          this.$set(this.statusItems, id - 1, 'hover')
        } else {
          this.$set(this.statusItems, id - 1, 'show')
        }
      },
      // 更新显示用 items
      initCardStatus() {
        if (this.statusItems.length === 0) {
          for (let i = 0; i < this.deviceCount; i++) {
            this.statusItems.push('show')
          }
        }
      },
      // 获取 Item 的背景颜色
      obtainItemBackround(id) {
        return id === 1 ? 'work-status-great' : 'work-status-error'
      },

      // 「HTTP」获取设备数量
      getDeviceCount() {
        // 调取HTTP API获取数据
        singleGroupDeviceCount().then(response => {
          this.deviceCount = response.data
          this.getDeviceDetail()
        }).catch(error => {
          touchError(this, this.getDeviceCount, error)
        })
      },
      // 「HTTP」获取设备详细信息
      getDeviceDetail() {
        // 调取HTTP API获取数据
        singleGroupDeviceData(this.selectedGroupId).then(response => {
          const deviceGroupItems = response.data.deviceGroupItems[0]
          this.deviceCount = deviceGroupItems.deviceCount
          this.usingCount = deviceGroupItems.usingCount
          this.chargingCount = deviceGroupItems.chargingCount
          this.fullCount = deviceGroupItems.fullCount
          this.uninitCount = deviceGroupItems.uninitCount
          this.msgCount = deviceGroupItems.msgCount
          this.deviceItems = deviceGroupItems.items
          this.option.series[0].data[0].value = this.msgCount
          this.myChartPieOutline.setOption(this.option)
          // 激活设备items卡片的数据显示
          this.initCardStatus()
        }).catch(error => {
          touchError(this, this.getDeviceDetail, error)
        })
      }
    },
    mounted: function() {
      this.getDeviceCount()
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
      this.myChartPieOutline = echarts.init(document.getElementById('device-group-outline-pie'))
      setTimer(this.getDeviceDetail, 2000)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  #main-container {
    font-weight: bold;
    padding: 0px 10px;
  }

  /****************** outline item **********************/
  #outline-container {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);

    .box-card-outline {
      max-width: 250px;
      height: 100px;
      flex: 2 1 auto;
      margin: 20px 10px;
      transition: 0.3s;
      cursor: pointer;
      background-color: rgba(0, 227, 230, 0.07);

      &:hover {
        background-color: rgba(255, 255, 255, 0.07);
      }

      .content {
        font-size: 130%;
        text-align: center;
        padding-top: 10px;
      }

      .header {
        color: rgba(0, 0, 0, 0.51);
        padding-bottom: 10px;
        text-align: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      }
    }
  }

  /*********** echarts-pie ***********************/

  #outline-echarts-pie-container {
    transition: 0.3s;
    height: 150px;

    #device-group-outline-pie {
      max-width: 250px;
      width: 250px;
      height: 100%;
    }
  }

  /****************** item **********************/
  #item-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;

    .box-card-outline-item {
      max-width: 150px;
      width: 150px;
      flex: 1 1 auto;
      margin: 10px 0px 5px 10px;
      transition: 0.3s;
      cursor: pointer;
      /*background-color: rgba(0, 227, 255, 0.07);*/

      &:hover {
        background-color: rgba(255, 255, 255, 0.07);
      }

      .header {
        color: rgba(0, 0, 0, 0.51);
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      }

      .content {
        color: rgba(0, 0, 0, 0.65);
        text-align: center;
        padding-top: 10px;
        min-height: 50px;

        .iconfont {
          font-size: 200%
        }
      }
    }
  }

  /********* card item 的相关资源颜色设置 **********/

  /*item 图标的颜色*/
  i {
    color: rgba(0, 127, 130, 0.76);
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

  /*card item 的背景颜色*/

  .work-status-init {
    background-color: rgba(0, 255, 255, 0.08);

  }

  .work-status-great {
    background-color: rgba(0, 255, 30, 0.09);
  }

  .work-status-error {
    background-color: rgba(255, 0, 0, 0.09);
  }

</style>
