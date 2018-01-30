import request from '@/utils/request'

export function getFeedbackItems() {
  return request({
    url: '/feedback/items',
    method: 'get'
  })
}

export function clearFeedbackItems() {
  return request({
    url: '/feedback/items/clear',
    method: 'get'
  })
}
