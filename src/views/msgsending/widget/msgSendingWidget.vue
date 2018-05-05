<template>
  <div id="widget-container">
    <el-card :body-style="{ padding: '0' }" class="box-card-item"
             v-bind:class="type">
      <div class="header">
        <div>{{item.groupId}}组</div>
        <div>{{item.deviceId}}号</div>
      </div>
      <div class="content">
        <i class="iconfont" v-bind:class="photoType"></i>
      </div>
      <div class="footer">{{item.detail}}</div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'groupProgressWidget',
    props: ['item'],
    computed: {
      type: function() {
        return this.item.type === 'portrait' ? 'msg-sending-type-portrait' : 'msg-sending-type-normal'
      },
      photoType: function() {
        return this.item.type === 'portrait' ? 'icon-tupian-' : 'icon-shenfenxinxi'
      }
    },
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
      width: 130px;
      flex: 1 1 auto;
      margin: 10px;
      transition: 0.3s;
      cursor: pointer;

      &:hover {
        background-color: rgba(255, 255, 255, 0.07);
      }

      .header {
        color: rgba(0, 0, 0, 0.66);
        padding: 5px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      }

      .content {
        text-align: center;
        padding: 5px 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        .iconfont {
          font-size: 200%
        }
      }
      .footer {
        color: rgba(0, 0, 0, 0.5);
        padding: 5px 0;
        text-align: center;
        font-size: 50%;
        overflow: hidden;
        white-space: nowrap;
      }
    }

    .msg-sending-type-normal {
      background-color: rgba(0, 255, 0, 0.08);
    }
    .msg-sending-type-portrait {
      background-color: rgba(255, 0, 0, 0.06);
    }

    i.icon-shenfenxinxi {
      color: rgba(0, 200, 104, 0.45);
    }
    i.icon-tupian- {
      color: rgba(255, 0, 217, 0.22);
    }
  }
</style>
