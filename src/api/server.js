import request from '@/utils/request'

export function serverInfoOutline() {
  return request({
    url: '/inner/outline',
    method: 'get'
  })
}

export function serverAttach() {
  return request({
    url: '/inner/attach',
    method: 'get'
  })
}
