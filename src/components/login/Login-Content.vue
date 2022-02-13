<template>
<div v-if="isAuthenticated === false" class="flex flex-col w-72 justify-center items-center gap-y-2 bg-white pb-5 rounded-lg shadow-2xl">
<div class="text-center bg-baby-blue bg-opacity-50 w-full rounded-t-lg pb-2">
    <h1 class="mt-2 text-2xl font-normal text-black opacity-100">Login</h1>
</div>

  <div @click="login" class="flex bg-baby-blue hover:bg-opacity-50 cursor-pointer text-black text-2xl pl-5 pr-5 pt-1 pb-1 rounded-md w-48">
    <img src="../../assets/metamask-fox.svg" alt="metamask-fox" class="w-9 h-10"><h1 class="mt-1 ml-1">MetaMask</h1>
    </div>

  <div><h1 class="text-2xl text-center">or</h1></div>

    <div class="flex bg-baby-blue hover:bg-opacity-50 cursor-pointer text-black text-2xl pl-5 pr-5 pt-1 pb-1 rounded-md w-52">
    <img src="../../assets/walletconnect.svg" alt="wallet-connect" class="w-9 h-10"><h1 class="mt-1 ml-1">Wallet Con</h1>
    </div>
</div>

<div v-if="isAuthenticated === true" class="flex flex-col w-72 justify-center items-center gap-y-2 bg-white pb-5 rounded-lg shadow-2xl">
<div class="text-center bg-baby-blue bg-opacity-50 w-full rounded-t-lg pb-2">
    <h1 class="mt-2 text-2xl font-normal text-black opacity-100">Login</h1>
</div>

  <div @click="login" class="flex bg-baby-blue text-black text-2xl pl-5 pr-5 pt-1 pb-1 rounded-md w-48">
    <img src="../../assets/metamask-fox.svg" alt="metamask-fox" class="w-9 h-10"><h1 class="mt-1 ml-1">Logged In</h1>
    </div>
</div>
</template>

<script>
import { ref, onMounted, inject, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const $moralis = inject('$moralis')
    var transaction = ref(false);
    
    const setUser = (payload) => store.commit('setUser', payload)
    const setBalance = (payload) => store.commit('setBalance', payload)
    
    const login = async () => {
      const user = await $moralis.Web3.authenticate({ signingMessage: "Log in" })
      const rinkBalance = await $moralis.Web3API.account.getNativeBalance({chain: "ropsten", address: user.get("ethAddress")});
      setBalance(rinkBalance.balance)
      setUser(user)
      window.location = "/dashboard";
    }

var sendEth = async () => {
  await $moralis.enableWeb3()
 try {
   const options = {type: "native", amount: $moralis.Units.ETH("0.5"), receiver: "0xca31D9A09c3A446E2658693eAC1C30E185321580"}
await $moralis.transfer(options)
 } catch (error) {
   transaction.value = !transaction.value
   console.log("Unable to complete transaction: " + error.message)
 }

}
    var getBalanceRinkleby = async () => {
      const user = $moralis.User.current()
      
        const rinkBalance = await $moralis.Web3API.account.getNativeBalance({chain: "ropsten", address: user.get("ethAddress")});
        setBalance(rinkBalance.balance)

    }

    const handleCurrentUser = async () => {
      const user = $moralis.User.current()
      if (user) {
        setUser(user)
        getBalanceRinkleby
        window.location = "/dashboard";
      }
    }

    onMounted(() => {
      handleCurrentUser()
      getBalanceRinkleby()
    })

    return {
      login,
      sendEth,
      transaction,
      isAuthenticated: computed(() => Object.keys(store.state.user).length > 0),
      user: computed(() => store.state.user),
      balance: computed(() => store.state.balance / 1000000000000000000)
    }
  }
}
</script>

<style>

</style>