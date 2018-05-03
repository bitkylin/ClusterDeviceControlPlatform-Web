import request from '@/utils/request'

export function getMsgSendingByCoordinate(groupId, deviceId, isFlat) {
  return request({
    url: '/tcp/msg/sending/' + groupId + '/' + deviceId + '?msgflat=' + isFlat + '&msglimit=500',
    method: 'get'
  })
}

export function getMsgSendingGrouped(groupId, isFlat) {
  return request({
    url: '/tcp/msg/sending/' + groupId + '/255?msgflat=' + isFlat + '&msglimit=500',
    method: 'get'
  })
}

export function getMsgSendingOutline(isFlat) {
  return request({
    url: '/tcp/msg/sending/255/255?msgflat=' + isFlat + '&msglimit=500',
    method: 'get'
  })
}

export function clearMsgSendingOutline() {
  return request({
    url: '/tcp/msg/sending/clear',
    method: 'get'
  })
}
