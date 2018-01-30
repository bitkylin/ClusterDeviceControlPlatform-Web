import request from '@/utils/request'

// 服务器数据处理模块
export function deviceGroupDataOutline() {
  return request({
    url: '/dataprocess/devicegroup/outline',
    method: 'get'
  })
}

export function deviceGroupCount() {
  return request({
    url: '/dataprocess/devicegroup/maxgroupcount',
    method: 'get'
  })
}

export function singleGroupDeviceCount() {
  return request({
    url: '/dataprocess/devicegroup/maxdevicecount',
    method: 'get'
  })
}

export function singleGroupDeviceData(groupId) {
  return request({
    url: '/dataprocess/devicegroup/detail/' + groupId,
    method: 'get'
  })
}

export function dataProcessOutline() {
  return request({
    url: '/dataprocess/devicegroup/pressure',
    method: 'get'
  })
}
