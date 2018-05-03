export function floatToFixed(msgSendingCount, msgCount) {
  if (msgCount === 0) {
    return 100
  } else {
    return Math.round((msgCount - msgSendingCount) * 10000 / msgCount) / 100
  }
}

export function countMsgSum(msgCountOld, msgCount) {
  if (!msgCountOld) return msgCount
  if (msgCount === 0) return 0
  if (msgCount > msgCountOld) {
    return msgCount
  } else {
    return msgCountOld
  }
}

// 根据设备号和设备组号生成独立的ID
export function createDeviceFlag(groupId, deviceId, detail) {
  return groupId * 1000 + deviceId + detail
}
