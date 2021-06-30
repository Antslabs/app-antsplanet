export const state = () => ({
  connected: false,
  address: '',
  start: false,
  balance: '',
  endTime: 0,
  joined: false,
  connectHref: '',
  dialogMobileConnect: false
})

export const mutations = {
  switch(state, flag) {
    state.connected = flag
  },
  set_join(state, data) {
    state.joined = data
  },
  set_endTime(state, data) {
    state.endTime = data
  },
  set_connectHref(state, data) {
    state.connectHref = data
  },
  set_dialogMobileConnect(state, data) {
    state.dialogMobileConnect = data
  },
  setAddress(state, address) {
    state.address = address
  },
  startJoin(state, flag = true) {
    state.start = flag
  },
  setBalance(state, balance) {
    state.balance = balance
  }
}
