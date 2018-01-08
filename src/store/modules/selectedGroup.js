const selectedGroup = {
  state: {
    selectedGroupId: 0
  },

  mutations: {
    saveGroupId(state, id) {
      state.selectedGroupId = id
    }
  }
}

export default selectedGroup
