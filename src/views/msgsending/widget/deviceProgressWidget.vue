<template>
  <div id="widget-container">
    <el-card :body-style="{ padding: '0' }" class="box-card-item">
      <div class="header">{{item.deviceId}} 号</div>
      <div class="content">
        <el-progress class="progress" type="circle" :percentage=item.dataProcess></el-progress>
      </div>
      <div class="footer">
        <div>总: {{item.msgCount}}</div>
        <div>剩: {{item.msgSendingCount}}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'groupProgressWidget',
    props: ['item'],
    data() {
      return {}
    },
    watch: {},
    methods: {},
    mounted: function() {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /****************** item **********************/
  #widget-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;

    .box-card-item {
      max-width: 150px;
      width: 150px;
      flex: 1 1 auto;
      margin: 10px 0 5px 10px;
      transition: 0.3s;
      cursor: pointer;
      background-color: rgba(0, 227, 255, 0.07);

      &:hover {
        background-color: rgba(255, 255, 255, 0.07);
      }

      .header {
        color: rgba(0, 0, 0, 0.66);
        padding: 5px;
        text-align: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      }

      .content {
        text-align: center;
        padding: 5px 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        .progress {
          height: 10%;
          size: 10px;
        }
      }
      .footer {
        color: rgba(0, 0, 0, 0.5);
        padding: 5px 10px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
