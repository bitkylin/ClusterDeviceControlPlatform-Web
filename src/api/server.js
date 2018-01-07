import request from '@/utils/request'

export function serverInfoOutline() {
  return request({
    url: '/inner/outline',
    method: 'get'
  })
}
