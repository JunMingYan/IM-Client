
const state = {
  isLogin: JSON.parse(window.sessionStorage.getItem('isLogin') || "false"),
  userInfo: JSON.parse(window.localStorage.getItem('userInfo') || '{}'),
  friendGroups: JSON.parse(window.localStorage.getItem('friendGroups') || '{}'),
  friendNotes: JSON.parse(window.localStorage.getItem('friendNotes') || '{}'),
}

const mutations = {
  login(state, data) {
    state.isLogin = true
    state.userInfo = data
    let dataString = JSON.stringify(data)
    // console.log("存放在store的用户信息为：", dataString)
    window.localStorage.setItem('userInfo', dataString)
    window.sessionStorage.setItem('isLogin', true)
  },
  groups(state, data) {
    state.friendGroups = data
    let groupsString = JSON.stringify(data)
    window.localStorage.setItem('friendGroups', groupsString)
  },
  notes(state, data) {
    const notes = {}

    state.friendNotes = data
    let notesString = JSON.stringify(data)
    window.localStorage.setItem('friendNotes', notesString)
  },
  logout(state) {
    state.isLogin = false
    state.userInfo = ''
    state.friendGroups = ''
    state.friendNotes = ''
    window.localStorage.setItem('userInfo', '')
    window.localStorage.setItem('friendGroups', '')
    window.localStorage.setItem('friendNotes', '')
    window.localStorage.setItem('friends', '')
    window.localStorage.setItem('groups', '')
    // window.localStorage.setItem('coMessager-recentConversation-friend', '')
    // window.localStorage.setItem('coMessager-recentConversation-group', '')
    window.sessionStorage.setItem('isLogin', false)
  }
}

const actions = {
  LOGIN({commit}, data) {
    commit('login', data)
  },
  GROUPS({commit}, data) {
    commit('groups', data)
  },
  NOTES({commit}, data) {
    commit('notes', data)
  },
  LOGOUT({commit}, data) {
    commit('logout', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
