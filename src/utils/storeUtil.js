import store from '../store'

// 保存被选中的 GroupId
export function saveGroupId(id) {
  store.commit('saveGroupId', id)
}

// 保存被选中的 DeviceId
export function saveDeviceId(id) {
  store.commit('saveDeviceId', id)
}

// 保存是否扁平化显示所有消息对象
export function saveItemIsFlat(itemIsFlat) {
  store.commit('saveItemIsFlat', itemIsFlat)
}

// 从 Store 中读取 GroupId
export function getGroupId() {
  return store.state.selectedDevice.selectedGroupId
}

// 从 Store 中读取 DeviceId
export function getDeviceId() {
  return store.state.selectedDevice.selectedDeviceId
}

// 从 Store 中读取「是否扁平化显示所有消息对象」
export function getItemIsFlat() {
  return store.state.selectedDevice.itemIsFlat
}

// 保存单个设备的发送消息总数
export function saveDeviceMsgCount(groupId, deviceId, msgCount) {
  store.commit('saveDeviceMsgCount', { groupId: groupId, deviceId: deviceId, msgCount: msgCount })
}

// 保存单组的发送消息总数
export function saveGroupMsgCount(groupId, msgCount) {
  store.commit('saveGroupMsgCount', { groupId: groupId, msgCount: msgCount })
}

// 保存整体的发送消息总数
export function saveOutlineMsgCount(msgCount) {
  store.commit('saveOutlineMsgCount', msgCount)
}

//  从 Store 中读取:单个设备的发送消息总数
export function getDeviceMsgCount(groupId, deviceId) {
  const groupItem = store.state.selectedDevice.deviceMsgCount[groupId]
  if (groupItem) {
    return groupItem[deviceId]
  }
}

//  从 Store 中读取:单个组的发送消息总数
export function getGroupMsgCount(groupId) {
  return store.state.selectedDevice.groupMsgCount[groupId]
}

//  从 Store 中读取:整体的发送消息总数
export function getOutlineMsgCount() {
  return store.state.selectedDevice.outlineMsgCount
}
