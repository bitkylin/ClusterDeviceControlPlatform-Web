import store from '../store'

// 设置定时器，经过指定的时间time循环执行call函数
export function setTimer(call, time) {
  store.dispatch('setTimer', {
    call: call,
    time: time
  })
}

// 停止定时器
export function stopTimer() {
  store.dispatch('stopTimer')
}

// 通信或发生其他异常，设定10秒后再试
export function touchError(vm, call, error) {
  // console.log(store.state.timer.canToastError)
  // if (store.state.timer.canToastError) {
  //   Message.error('错误信息：' + error + '\n请检查网络连接')
  // }
  // store.commit('enableMsgToast')
  stopTimer()
  vm.$router.push({ path: '/disconnect' })
}
