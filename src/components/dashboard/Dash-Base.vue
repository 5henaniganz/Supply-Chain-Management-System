<template>
<div class="h-full w-full">
<div class="flex justify-center mb-5 flex-row">
<h1 class="text-center bg-white w-96 shadow-2xl rounded-md text-xl">Welcome back: {{user.username}} </h1>
  </div>
  <div class="flex justify-center flex-wrap lg:flex-nowrap">
<div class="flex flex-col lg:flex-row"><ChartDash /><Transactions class="mt-4 lg:mt-0" /></div>
  </div>
  <div class="mt-2 flex justify-center"><Recent /></div>
     </div> 
</template>

<script>
import {inject} from 'vue';
import ChartDash from './Chart.vue'
import Transactions from './Upcoming.vue'
import Recent from './Recent.vue'
import { useStore } from 'vuex'

export default ({
  name: 'Dash-Base',
  components: { ChartDash, Transactions, Recent },
  setup() {
const $moralis = inject('$moralis')
   var configTransactions = async () => {
     
    const user = $moralis.User.current()
     var recievedTransactions = 0;
      var sentTransactions = 0;
        if(await user){
            const currentEthAddress = await user.get("ethAddress");
            const transactions =  await $moralis.Web3API.account.getTransactions({chain: "ropsten", address: currentEthAddress});

        for(var i = 0; i <  await transactions.result.length; ++i){
            if( await transactions.result[i].from_address === currentEthAddress){
                sentTransactions += parseInt( await transactions.result[i].value)
            }else{
                recievedTransactions += parseInt( await transactions.result[i].value)
            }
        }
            return [recievedTransactions, sentTransactions]
        }
    }

    const store = useStore()
    const setProfit = (payload) => store.commit('setProfit', payload)
    configTransactions().then(value => {setProfit(value)})

        return {
          user: $moralis.User.current().attributes,}
  },
}

);
</script>

<style>

</style>