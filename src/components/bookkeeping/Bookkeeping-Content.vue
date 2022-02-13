<template>
<div class="h-screen">
<div class="flex justify-center text-center flex-col items-center break-words">

  <div class="flex justify-center items-center flex-col text-sm lg:text-normal">
   <div class="bg-white shadow-2xl rounded-2xl p-10 w-96 lg:w-auto">   
      <h1 class="text-center mb-5 text-xl">Accounts Payable</h1>
      <table class="table-fixed w-80 lg:w-auto">
  <thead >
    <tr>
    <th class="w-2/6">Date</th>
      <th class="w-1/6">Supplier</th>
      <th class="w-1/6">Cost</th>
      <th class="w-1/6">Description</th>
      <th class="w-1/6">Blockchain Explorer</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="payable in accountsObject.payable" :key="payable">
      <td>{{payable.block_timestamp.substring(0,10).split("-").reverse().join("-")}}</td>
      <td>{{payable.from_address}}</td>
      <td>-{{payable.value/1000000000000000000}} Eth</td>
      <td>Placeholder Description</td>
      <td><a :href="'https://ropsten.etherscan.io/tx/' + payable.hash">View</a></td>
    </tr>
  </tbody>
</table>
</div>

<div class="bg-white shadow-2xl rounded-2xl p-10 mt-4 break-words w-96 lg:w-auto">
      <h1 class="text-center mb-5 text-xl">Accounts Recievable</h1>
      <table class="table-fixed w-72 lg:w-auto">
  <thead>
    <tr>
    <th class="w-2/6">Date</th>
      <th class="w-1/6">Supplier</th>
      <th class="w-1/6">Cost</th>
      <th class="w-1/6">Description</th>
      <th class="w-1/6">Blockchain Explorer</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="recieve in accountsObject.recieve" :key="recieve">
      <td>{{recieve.block_timestamp.substring(0,10).split("-").reverse().join("-")}}</td>
      <td>{{recieve.from_address}}</td>
      <td>+{{recieve.value/1000000000000000000}} Eth</td>
      <td>Placeholder Description</td>
      <td><a :href="'https://ropsten.etherscan.io/tx/' + recieve.hash">View</a></td>
    </tr>
  </tbody>
</table>
</div>
<div @click="convertToCSV" class="flex mt-3 bg-white p-1 border rounded-lg shadow-2xl place-self-end hover:bg-gray-100 cursor-pointer">
    <h1 class="text-lg mr-1">Download CSV</h1>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
</svg></div>
  </div>
</div>
</div>
</template>

<script>
import {inject} from 'vue'
import { useStore } from 'vuex'
export default {
setup (){
    const store = useStore()
    let fullTransactionList = store.state.transactions;
    let accountsObject = {'payable': [], 'recieve': []}
    const $moralis = inject('$moralis')
    const user = $moralis.User.current()
    const currentEthAddress = user.get("ethAddress");

for(let i = 0; i < fullTransactionList.length; ++i){
    if(fullTransactionList[i].from_address === currentEthAddress){
       accountsObject.payable.push(fullTransactionList[i]) 
    }else{
        accountsObject.recieve.push(fullTransactionList[i]) 
    }
}

function convertToCSV () {
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

const items = fullTransactionList
const replacer = (key, value) => value === null ? '' : value
const header = Object.keys(items[0])
const csv = [
  header.join(','),
  ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
].join('\r\n')


        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", csv]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = today + ".csv";  //Name the file here
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
}

return {accountsObject, convertToCSV}
}
}
</script>

<style>

</style>