<template>
      <div class="bg-white shadow-2xl rounded-2xl p-10 mt-4 lg:w-recent-width w-96 lg:h-custom-height break-words">
        <h1 class="text-center mb-5 text-2xl">Recent Purchase Orders</h1>
        <div class="flex justify-center">
        <ul v-if="transactionsOne[1]" class="flex justify-center">
            <div class="loadingio-spinner-rolling-dd5e02hqvg9"><div class="ldio-xvobpw7hude">
            <div></div>
            </div></div>
        </ul>
        <table v-else class="table-fixed w-80 lg:w-auto text-center">
  <thead>
    <tr>
      <th class="lg:w-2/6">Company Name</th>
      <th class="lg:w-1/6">Amount</th>
      <th class="lg:w-2/6">Wallet Address</th>
      <th class="lg:w-2/6">Date</th>
      <th class="lg:w-1/6">Blockchain History</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{{transactionsOne[2][0].username}}</td>
      <td>{{transactionsOne[0][0].value/1000000000000000000}}</td>
      <td>{{transactionsOne[0][0].to_address}}</td>
      <td>{{transactionsOne[0][0].block_timestamp.substring(0,10).split("-").reverse().join("/")}}</td>
      <td> <a :href="'https://ropsten.etherscan.io/tx/' + transactionsOne[0][0].hash">View</a></td>
    </tr>
        <tr>
      <td>{{transactionsOne[2][1].username}}</td>
      <td>{{transactionsOne[0][1].value/1000000000000000000}}</td>
      <td>{{transactionsOne[0][1].to_address}}</td>
      <td>{{transactionsOne[0][1].block_timestamp.substring(0,10).split("-").reverse().join("/")}}</td>
      <td> <a :href="'https://ropsten.etherscan.io/tx/' + transactionsOne[0][1].hash">View</a></td>
    </tr>
        <tr>
      <td>{{transactionsOne[2][2].username}}</td>
      <td>{{transactionsOne[0][2].value/1000000000000000000}}</td>
      <td>{{transactionsOne[0][2].to_address}}</td>
      <td>{{transactionsOne[0][2].block_timestamp.substring(0,10).split("-").reverse().join("/")}}</td>
      <td> <a :href="'https://ropsten.etherscan.io/tx/' + transactionsOne[0][2].hash">View</a></td>
    </tr>
            <tr>
      <td>{{transactionsOne[2][3].username}}</td>
      <td>{{transactionsOne[0][3].value/1000000000000000000}}</td>
      <td>{{transactionsOne[0][3].to_address}}</td>
      <td>{{transactionsOne[0][3].block_timestamp.substring(0,10).split("-").reverse().join("/")}}</td>
      <td> <a :href="'https://ropsten.etherscan.io/tx/' + transactionsOne[0][2].hash">View</a></td>
    </tr>
  </tbody>
</table>



        </div>
    </div>
</template>

<script>
import {computed, inject, onMounted} from 'vue';
import { useStore } from 'vuex'
export default {
setup (){
  const store = useStore()
const $moralis = inject('$moralis')
var transactionList = async () => {
const $moralis = inject('$moralis')
const user = await $moralis.User.current()
const currentEthAddress = await user.get("ethAddress");
const transactions = await $moralis.Web3API.account.getTransactions({chain: "ropsten", address: currentEthAddress});
return transactions
}

    const setTransactions = (payload) => store.commit('setTransactions', payload)
    transactionList().then(value => {setTransactions(value.result)})
var transactionsOne = computed(() => {
    var loading = true;
    var test = [];
    if(store.state.transactions[0]){
        for(let i = 0; i < store.state.transactions.length; i++){ 
    for(let x = 0; x < store.state.accountNames.length; x ++){
      if(store.state.transactions[i].to_address === store.state.accountNames[x].ethAddress){
        test.push(store.state.accountNames[x])
      }
    }
  }
    loading = false
    return [store.state.transactions, loading, test]
}else{ return ['', loading]}})


console.log(transactionsOne.value)
return {transactionsOne}
}
}
</script>

<style>
@keyframes ldio-xvobpw7hude {
  0% { transform: translate(-50%,-50%) rotate(0deg); }
  100% { transform: translate(-50%,-50%) rotate(360deg); }
}
.ldio-xvobpw7hude div {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 5px solid #ff9b71;
  border-top-color: transparent;
  border-radius: 50%;
}
.ldio-xvobpw7hude div {
  animation: ldio-xvobpw7hude 1s linear infinite;
  top: 100px;
  left: 100px
}
.loadingio-spinner-rolling-dd5e02hqvg9 {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: none;
}
.ldio-xvobpw7hude {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
}
.ldio-xvobpw7hude div { box-sizing: content-box; }
</style>