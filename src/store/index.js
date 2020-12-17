import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //  auth
    account: {},
    jwt: '',
    //  reservations
    reservations: [],
    resViewStart: dayjs().format('YYYY-MM-DD'),
    resViewEnd: dayjs().add(1, 'month').format('YYYY-MM-DD'),
    selectGroups: {},
    spaces: [],
    spaceTypes: {},
    windowHeight: 100
  },
  mutations: {
    //  Auth
    setAccount (state, account) {
      state.account = account
      localStorage.setItem('account', JSON.stringify(account))
    },
    setAccountToGuest (state) {
      state.account = {
        id: '0',
        username: 'Guest',
        permission: '0',
        roles: []
      }
      localStorage.setItem('account', JSON.stringify(state.account))
    },
    setJwt (state, jwt) {
      state.jwt = jwt
      localStorage.setItem('jwt', jwt)
    },
    setReservations (state, reservations) {
      state.reservations = reservations
    },
    setSelectGroups (state, selectGroups) {
      state.selectGroups = selectGroups
    },
    setSpaces (state, spaces) {
      state.spaces = spaces
    },
    setSpaceTypes (state, spaceTypes) {
      state.spaceTypes = spaceTypes
    },
    setWindowHeight (state, windowHeight) {
      state.windowHeight = windowHeight
    }
  },
  actions: {
  },
  modules: {
  }
})
