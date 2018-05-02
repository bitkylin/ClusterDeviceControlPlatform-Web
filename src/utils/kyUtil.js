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
