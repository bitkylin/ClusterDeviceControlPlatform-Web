const timer = {
  state: {
    timerInterval: null,
    errorToastTime: 0,
    canToastError: true
  },

  mutations: {
    setTimerCommit(state, save) {
      state.timerInterval = save
    },
    stopTimerCommit(state) {
      if (state.timerInterval != null) {
        clearInterval(state.timerInterval)
      }
    }
  },

  actions: {
    // 设置轮询定时器，整个应用仅维护一个轮询定时器，设置新的定时器时，旧的定时器即被取代
    setTimer: ({ commit, state }, timer) => {
      if (state.timerInterval != null) {
        clearInterval(state.timerInterval)
      }
      timer.call()
      const save = setInterval(timer.call, timer.time)
      commit('setTimerCommit', save)
    },
    stopTimer({ commit, state }) {
      if (state.timerInterval != null) {
        clearInterval(state.timerInterval)
      }
    }
  }
}

export default timer
