import request from '@/utils/request'

export function getFeedbackItemsException() {
  return request({
    url: '/feedback/items/exception',
    method: 'get'
  })
}

export function getFeedbackItemsTimeout() {
  return request({
    url: '/feedback/items/timeout',
    method: 'get'
  })
}

export function clearFeedbackItems() {
  return request({
    url: '/feedback/items/clear',
    method: 'get'
  })
}
