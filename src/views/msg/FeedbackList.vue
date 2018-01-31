<template>
  <div>
    <el-button v-if="showclearbtn" @click="clearItems" id="clearFeedbackButton" round>处理完毕</el-button>
    <el-table id="table" :data="tableData">
      <el-table-column
        prop="id"
        label="序号"
        sortable>
      </el-table-column>
      <!--width="180"-->
      <el-table-column
        prop="currentDate"
        label="日期"
        sortable>
      </el-table-column>
      <!--width="180"-->
      <el-table-column
        prop="currentTime"
        label="时间"
        sortable>
      </el-table-column>
      <!--width="180"-->
      <el-table-column
        prop="groupId"
        label="组号"
        sortable>
      </el-table-column>
      <!--width="180"-->
      <el-table-column
        prop="deviceId"
        label="设备号"
        sortable>
      </el-table-column>
      <!--width="200"-->
      <el-table-column
        prop="type"
        label="消息类型"
        :filters="[{
          text: '消息重发次数超出限制',value: '消息重发次数超出限制'}, {
          text: '通道连接已断开', value: '通道连接已断开' }, {
          text: '设备工作状态异常', value: '设备工作状态异常'}, {
           text: '设备组无响应', value: '设备组无响应'}]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag"
            close-transition>{{scope.row.type}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="extra"
        label="描述"
        sortable>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getFeedbackItems, clearFeedbackItems } from '@/api/feedbackMsg'
  import { setTimer, touchError } from '@/utils/timer'

  export default {
    data: function() {
      return {
        showclearbtn: true,
        tableData: null
      }
    },
    name: 'MsgFeedbacklist',
    methods: {
      getData() {
        const vm = this
        getFeedbackItems().then(response => {
          vm.tableData = vm.calculateTableData(response.data)
        }).catch(error => {
          touchError(this, this.getData, error)
        })
      },
      filterTag(value, row) {
        return row.type === value
      },
      shouldRemove(desc) {
        return desc === '下井超时' || desc === '充电超时'
      },
      calculateTableData(rawItems) {
        const tableData = []
        for (let i = 0; i < rawItems.length; i++) {
          const item = rawItems[i]
          let extra = ''
          switch (item.type) {
            case 'RESEND_OUT_BOUND':
              extra = '基础消息「' + item.baseMsg.msgCodec.detail + '」'
              break
            case 'WORK_STATUS_EXCEPTION':
              if (this.shouldRemove(item.baseMsg.statusDescription)) {
                continue
              }
              extra = '异常类型「' + item.baseMsg.statusDescription + '」'
          }
          tableData.push({
            id: i + 1,
            currentDate: item.currentDate,
            currentTime: item.currentTime,
            groupId: item.groupId,
            deviceId: item.deviceId,
            type: item.description,
            extra: extra
          })
        }
        return tableData
      },
      clearItems() {
        clearFeedbackItems()
      }
    },
    mounted: function() {
      setTimer(this.getData, 3000)
      if (this.$route.query.showclearbtn === 'false') {
        this.showclearbtn = false
      }
    }
  }
</script>

<style scoped>
  #table {
    width: 90%;
    margin: auto;
  }

  #clearFeedbackButton {
    z-index: 100;
    position: fixed;
    right: 100px;
    top: 5px;

  }
</style>
