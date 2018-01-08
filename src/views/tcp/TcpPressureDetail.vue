<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="设备组号"
      width="180"
      sortable>
    </el-table-column>
    <el-table-column
      prop="msgCount"
      label="待处理消息数(个)"
      width="180"
      sortable>
    </el-table-column>
    <el-table-column
      prop="timeCost"
      label="预计处理耗时(s)"
      width="180"
      sortable>
    </el-table-column>
    <el-table-column
      prop="process"
      label="消息发送缓存池">
      <template slot-scope="scope">
        <el-progress :percentage="scope.row.process" :status="scope.row.processStatus"></el-progress>
      </template>
    </el-table-column>
    <el-table-column
      prop="tag"
      label="工作状态"
      width="120"
      :filters="[{ text: '正常', value: '正常' }, { text: '忙碌', value: '忙碌' }, { text: '过载', value: '过载' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag"
          close-transition>{{scope.row.tagMsg}}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { tcpOutline } from '@/api/tcp'
  import { setTimer, touchError } from '@/utils/timer'

  export default {
    data: function() {
      return {
        itemCount: '待获取',
        channelItems: null,
        tableData: null
      }
    },
    name: 'tcpPressureDetail',
    methods: {
      getData() {
        const vm = this
        tcpOutline().then(response => {
          vm.itemCount = response.data.activatedCount + response.data.inactivatedCount
          vm.channelItems = response.data.channelItems
          vm.tableData = vm.calculateTableData()
        }).catch(error => {
          touchError(this, this.getData, error)
        })
      },
      filterTag(value, row) {
        return row.tagMsg === value
      },
      calculateTableData() {
        const tableData = []
        for (let i = 0; i < this.itemCount; i++) {
          const item = this.channelItems[i]
          const msgCount = item.count
          const timeCost = Math.round(msgCount * 0.3)
          let process = Math.round(msgCount * 100 / 500)
          process = process > 100 ? 100 : process
          if (msgCount < 100) {
            tableData.push({
              id: item.id,
              msgCount: msgCount,
              timeCost: timeCost,
              tag: '',
              tagMsg: '正常',
              process: process,
              processStatus: ''
            })
          } else if (msgCount > 500) {
            tableData.push({
              id: item.id,
              msgCount: msgCount,
              timeCost: timeCost,
              tag: 'danger',
              tagMsg: '过载',
              process: process,
              processStatus: 'exception'
            })
          } else {
            tableData.push({
              id: item.id,
              msgCount: msgCount,
              timeCost: timeCost,
              tag: 'warning',
              tagMsg: '忙碌',
              process: process,
              processStatus: ''
            })
          }
        }
        return tableData
      }
    },
    mounted: function() {
      setTimer(this.getData, 5000)
    }
  }
</script>

<style scoped>
  #main-container el-table {
    width: 100%;
  }
</style>
