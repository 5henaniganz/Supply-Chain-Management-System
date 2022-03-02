import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      user: {},
      balance: {},
      profit: {},
      transactions: {},
      accountNames: {}
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setBalance (state, payload) {
      state.balance = payload
    },
    setProfit (state, payload) {
      state.profit = payload
    },
    setTransactions (state, payload) {
      state.transactions = payload
    },
    setAccountNames (state, payload) {
      state.accountNames = payload
    }
  }
})

export default store