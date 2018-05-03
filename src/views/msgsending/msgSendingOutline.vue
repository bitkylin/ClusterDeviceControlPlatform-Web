<template>
  <div id="main-container">
    <div id="outline-container">
      <el-card class="box-card-outline">
        <div class="header">发送中组数</div>
        <div class="content">{{groupCount}}</div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="header">消息总数</div>
        <div class="content">{{msgCount}}</div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="header">发送中消息数</div>
        <div class="content">{{msgSendingCount}}</div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="header">扁平化</div>
        <div class="content">
          <el-switch
            v-model="itemIsFlat">
          </el-switch>
        </div>
      </el-card>
      <el-card class="box-card-outline">
        <div class="header">功能</div>
        <div class="content">
          <el-button @click="clearMsgSendingOutline" type="primary" size="mini" plain>清空</el-button>
        </div>
      </el-card>
      <div class="box-card-progress">
        <el-progress type="circle"
                     :percentage='mainPercentage'></el-progress>
      </div>
    </div>
    <div id="item-container-flated" v-if="itemIsFlat">
      <msgSendingWidget :item='item' :key="deviceFlag(item.groupId, item.deviceId, item.detail)"
                        v-for="item in msgSendingItems"></msgSendingWidget>
    </div>
    <div id="item-container-grouped" v-else>
      <groupProgressWidget :item='item' :key="item.groupId"
                           v-for="item in deviceGroupedItems"
                           @click.native="routerToSelectedSingleGroup(item.groupId)"></groupProgressWidget>
    </div>
  </div>
</template>

<script>
  import groupProgressWidget from './widget/groupProgressWidget'
  import msgSendingWidget from './widget/msgSendingWidget'

  import { getMsgSendingOutline, clearMsgSendingOutline } from '@/api/msgsending'
  import { floatToFixed, countMsgSum, createDeviceFlag } from '@/utils/kyUtil'
  import {
    saveItemIsFlat,
    getItemIsFlat,
    saveOutlineMsgCount,
    getOutlineMsgCount,
    saveGroupMsgCount,
    getGroupMsgCount,
    saveGroupId
  } from '@/utils/storeUtil'
  import { setTimer, touchError } from '@/utils/timer'

  export default {
    name: 'msgSendingOutline',
    components: { groupProgressWidget, msgSendingWidget },
    data() {
      return {
        routerSingle: '/msgsending/singlegroup',
        itemIsFlat: getItemIsFlat(),
        msgCount: 0,
        msgSendingCount: 0,
        groupCount: 0,
        deviceGroupedItems: [],
        msgSendingItems: []
      }
    },
    computed: {
      mainPercentage: function() {
        return floatToFixed(this.msgSendingCount, this.msgCount)
      }
    },
    watch: {
      // 将被选中的 GroupId 存入 Store
      itemIsFlat: function(val, oldVal) {
        console.log('扁平化显示转换', oldVal + '->' + val)
        saveItemIsFlat(val)
        setTimer(this.getMsgSendingOutline, 2000)
      }
    },
    methods: {
      // 「HTTP」获取TCP通道待发送的消息统计概览
      getMsgSendingOutline() {
        getMsgSendingOutline(this.itemIsFlat).then(response => {
          const webData = response.data
          this.msgCount = countMsgSum(getOutlineMsgCount(), webData.msgCount)
          saveOutlineMsgCount(this.msgCount)
          this.msgSendingCount = webData.msgSendingCount
          this.groupCount = webData.groupCount
          const msgSendings = webData.msgSendings
          const deviceGroupedItems = webData.deviceGroupedItems
          this.dataProcess(msgSendings, deviceGroupedItems)
        }).catch(error => {
          touchError(this, null, error)
        })
      },
      // 「HTTP」获取TCP通道待发送的消息统计概览
      clearMsgSendingOutline() {
        clearMsgSendingOutline()
      },
      dataProcess(msgSendings, deviceGroupedItems) {
        if (!this.itemIsFlat) {
          for (const item of deviceGroupedItems) {
            saveGroupMsgCount(item.groupId, countMsgSum(getGroupMsgCount(item.groupId), item.msgCount))
            item['msgCount'] = getGroupMsgCount(item.groupId)
            item['dataProcess'] = floatToFixed(item.msgSendingCount, item.msgCount)
          }
        }
        this.msgSendingItems = msgSendings
        this.deviceGroupedItems = deviceGroupedItems
      },
      deviceFlag(groupId, deviceId, detail) {
        return createDeviceFlag(groupId, deviceId, detail)
      },
      routerToSelectedSingleGroup(id) {
        saveGroupId(id)
        this.$router.push({ path: this.routerSingle })
      }
    },
    mounted: function() {
      setTimer(this.getMsgSendingOutline, 2000)
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
