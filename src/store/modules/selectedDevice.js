const selectedDevice = {
  state: {
    selectedGroupId: 1,
    selectedDeviceId: 1,
    itemIsFlat: false,
    deviceMsgCount: [],
    groupMsgCount: [],
    outlineMsgCount: 0
  },

  mutations: {
    saveGroupId(state, id) {
      state.selectedGroupId = id
    },

    saveDeviceId(state, id) {
      state.selectedDeviceId = id
    },

    saveItemIsFlat(state, itemIsFlat) {
      state.itemIsFlat = itemIsFlat
    },
    saveDeviceMsgCount(state, item) {
      const groupItem = state.deviceMsgCount[item.groupId]
      if (!groupItem) state.deviceMsgCount[item.groupId] = []
      state.deviceMsgCount[item.groupId][item.deviceId] = item.msgCount
    },
    saveGroupMsgCount(state, item) {
      state.groupMsgCount[item.groupId] = item.msgCount
    },
    saveOutlineMsgCount(state, msgCount) {
      state.outlineMsgCount = msgCount
    }
  }
}

export default selectedDevice
