<template>
  <div id="main-container">
    <div id="outline-container">
      <el-card class="box-card-outline">
        <div class="header">当前组</div>
        <div class="content">{{currentGroupId}}</div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="header">当前设备</div>
        <div class="content">{{currentDeviceId}}</div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="header">消息总数</div>
        <div class="content">{{msgCount}}</div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="header">发送中消息数</div>
        <div class="content">{{msgSendingCount}}</div>
      </el-card>
      <div class="box-card-progress">
        <el-progress type="circle"
                     :percentage='mainPercentage'></el-progress>
      </div>
    </div>
    <div id="item-container-flated">
      <msgSendingWidget :item='item' :key="deviceFlag(item.groupId, item.deviceId, item.detail)"
                        v-for="item in msgSendingItems"></msgSendingWidget>
    </div>
  </div>
</template>

<script>
  import deviceProgressWidget from './widget/deviceProgressWidget'
  import msgSendingWidget from './widget/msgSendingWidget'

  import { getMsgSendingByCoordinate } from '@/api/msgsending'
  import { floatToFixed, countMsgSum, createDeviceFlag } from '@/utils/kyUtil'
  import { getDeviceId, getGroupId, saveDeviceMsgCount, getDeviceMsgCount } from '@/utils/storeUtil'
  import { setTimer, touchError } from '@/utils/timer'

  export default {
    name: 'msgSendingOutline',
    components: { deviceProgressWidget, msgSendingWidget },
    data() {
      return {
        currentGroupId: 0,
        currentDeviceId: 0,
        msgCount: 0,
        msgSendingCount: 0,
        msgSendingItems: []
      }
    },
    computed: {
      mainPercentage: function() {
        return floatToFixed(this.msgSendingCount, this.msgCount)
      }
    },
    watch: {},
    methods: {
      // 「HTTP」获取TCP通道待发送的消息统计概览
      getMsgSendingDevice() {
        getMsgSendingByCoordinate(this.currentGroupId, this.currentDeviceId, true).then(response => {
          const webData = response.data
          this.msgCount = countMsgSum(getDeviceMsgCount(this.currentGroupId, this.currentDeviceId), webData.msgCount)
          saveDeviceMsgCount(this.currentGroupId, this.currentDeviceId, this.msgCount)
          this.msgSendingCount = webData.msgSendingCount
          this.msgSendingItems = webData.msgSendings
        }).catch(error => {
          touchError(this, null, error)
        })
      },
      deviceFlag(groupId, deviceId, detail) {
        return createDeviceFlag(groupId, deviceId, detail)
      }
    },
    mounted: function() {
      this.currentGroupId = getGroupId()
      this.currentDeviceId = getDeviceId()
      setTimer(this.getMsgSendingDevice, 2000)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  #main-container {
    font-weight: bold;
    padding: 0 10px;
  }

  /****************** outline item **********************/
  #outline-container {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    align-items: center;
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
      .content-function {
        text-align: center;
        padding-top: 5px;
      }

      .header {
        color: rgba(0, 0, 0, 0.51);
        padding-bottom: 10px;
        text-align: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      }
    }
    .box-card-progress {
      margin: 0 25px;
    }
  }

  #item-container-grouped {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
  }

  #item-container-flated {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
  }

</style>
