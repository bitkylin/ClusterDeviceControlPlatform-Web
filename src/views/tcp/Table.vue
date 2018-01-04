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
      :filters="[{ text: '正常', value: '正常' }, { text: '忙碌', value: '忙碌' }, { text: '极限', value: '极限' }]"
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
  export default {
    computed: {
      tableData() {
        const tableData = []
        for (let i = 1; i <= 100; i++) {
          const msgCount = (Math.random() * 800).toFixed(0)
          const timeCost = (msgCount * 0.3).toFixed(2)
          const process = (msgCount * 100 / 500).toFixed(0)
          if (msgCount < 100) {
            tableData.push({
              id: i,
              msgCount: msgCount,
              timeCost: timeCost,
              tag: '',
              tagMsg: '正常',
              process: process,
              processStatus: ''
            })
          } else if (msgCount > 500) {
            tableData.push({
              id: i,
              msgCount: msgCount,
              timeCost: timeCost,
              tag: 'danger',
              tagMsg: '极限',
              process: process,
              processStatus: 'exception'
            })
          } else {
            tableData.push({
              id: i,
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
    methods: {
      filterTag(value, row) {
        return row.tagMsg === value
      }
    }
  }
</script>

<style scoped>
  #main-container el-table {
    width: 100%;
  }
</style>
