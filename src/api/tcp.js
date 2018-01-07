import request from '@/utils/request'

export function tcpOutline() {
  return request({
    url: '/tcp/outline',
    method: 'get'
  })
}
