<template>
  <div>
    <el-button @click="clearItems" id="clearFeedbackButton" round>处理完毕</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        sortable>
      </el-table-column>
      <el-table-column
        prop="currentDate"
        label="日期"
        width="180"
        sortable>
      </el-table-column>
      <el-table-column
        prop="currentTime"
        label="时间"
        width="180"
        sortable>
      </el-table-column>
      <el-table-column
        prop="groupId"
        label="组号"
        width="180"
        sortable>
      </el-table-column>
      <el-table-column
        prop="deviceId"
        label="设备号"
        width="180"
        sortable>
      </el-table-column>
      <el-table-column
        prop="type"
        label="消息类型"
        width="200"
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
    </el-table>
  </div>
</template>

<script>
  import { getFeedbackItems, clearFeedbackItems } from '@/api/feedbackMsg'
  import { setTimer, touchError } from '@/utils/timer'

  export default {
    data: function() {
      return {
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
      calculateTableData(rawItems) {
        const tableData = []
        for (let i = 0; i < rawItems.length; i++) {
          const item = rawItems[i]
          tableData.push({
            id: i + 1,
            currentDate: item.currentDate,
            currentTime: item.currentTime,
            groupId: item.groupId,
            deviceId: item.deviceId,
            type: item.description
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
    }
  }
</script>

<style scoped>
  #main-container el-table {
    width: 100%;
  }

  #clearFeedbackButton {
    z-index: 100;
    position: fixed;
    right: 100px;
    top: 5px;

  }
</style>
