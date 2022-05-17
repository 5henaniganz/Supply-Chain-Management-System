<template>
    <div class="flex flex-col lg:flex-row gap-10 justify-center items-center">
      <div class="bg-white shadow-2xl rounded-lg p-5 pb-7 w-custom-width">
          <button id="conBtn" @click="purchaseBtn" class="mr-3 bg-orange-supl hover:bg-orange-supl text-white p-2 rounded-md">My Purchase Orders</button>
          <button id="suppBtn" @click="supplyBtn" class=" bg-baby-blue hover:bg-orange-supl text-white p-2 rounded-md">Supply Contracts</button>
           <div v-if="tables" class="break-words pl-5 pr-5 flex flex-col mt-5">

<table v-if="data && !loading" class="table-fixed text-center">
  <thead>
    <tr class="text-center items-center">
      <th class="w-2/6">Company</th>
      <th class="w-1/6">Cost</th>
      <th class="w-1/6">Payment Date</th>
      <th class="w-1/6">Liquidity</th>
      <th class="w-1/6">Cancel Contract</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="upcoming in visibleLogs" v-bind:visibleLogs="visibleLogs" v-bind:currentPage="currentPage" :key="upcoming">
      <td>{{upcoming.client}}</td>
      <td>{{upcoming.amount}} Eth</td>
      <td>{{upcoming.date}}</td>
      <td v-if="upcoming.amount <= bing" class="bg-green-100">Able to Honor</td>
      <td v-else class="bg-red-300 animate-pulse">Unable to Honor</td>
      <td class="flex flex-col items-center"><div>
        <svg @click="deleteContract(upcoming.wallet, upcoming.client)" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
</svg></div></td>
    </tr>
  </tbody>
</table>


<div v-else class="flex flex-col items-center pt-10 pb-10">
    <div class="lds-dual-ring"></div>
    <div>Cancelling Payment</div>
    <div class=" text-center text-xs">This may take some time for the blockchain to update &#x1F570;</div>
</div>
<Pagination       :totalPages="totalPages"
      :perPage="pageSize"
      :currentPage="currentPage"
      @pagechanged="updatePage" />
              </div>
              <div v-else>
<Supply />
</div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import moralis from 'moralis'
import Supply from './supplier.vue'
import Pagination from '../helpers/pagination.vue'
export default {
components: {
    Supply,
    Pagination
},
data(){
  return{
    loading: false,
    data: '',
    bing: 1,
    tables: true,
    currentPage: 0,
    totalPages: 0,
    pageSize:5,
    visibleLogs: []
  }
},
async mounted(){
  
  let user = await moralis.User.current().get("ethAddress")
  const options = { chain: "ropsten", address: user, from_block: "0"};
await moralis.Web3API.account.getNativeBalance(options).then(async (res) => {
  this.bing = await res.balance/1000000000000000000
});
      await  axios.post('https://student-supply.herokuapp.com/active', 
{
    "wallet": user
}).then(async (res) =>{
  this.data = await res.data
})

this.updateLogs();
this.totalPages = this.data.length/this.visibleLogs.length
},
methods: {
  updatePage(pageNo){
    this.currentPage = pageNo
    this.updateLogs()
  },
  updateLogs(){
    this.visibleLogs = this.data.slice(this.currentPage*this.pageSize, this.currentPage*this.pageSize + this.pageSize)
    if(this.visibleLogs.length == 0 && this.currentPage > 0){
      this.updatePage(this.currentPage - 1)
    }
  },
    deleteContract: async function(thing, client){
        let user = await moralis.User.current().get("ethAddress")
        let options = {contractAddress: '0xcEfB33651Ce065fe69801D887dB068c590c131D3',
        functionName: 'cancelContract',
        abi: [
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "_wallet",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_company",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_release",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_withdraw",
				"type": "bool"
			}
		],
		"name": "addPayee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "wallet",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "company",
				"type": "string"
			}
		],
		"name": "cancelContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "company",
				"type": "string"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "payees",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "contractOwner",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "walletAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "companyName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "releaseTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "canWithdraw",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
],
    params: {
        wallet: user,
        company: client
    }}

        const createdContract = await moralis.executeFunction(options)
        this.loading = true
        await createdContract.wait()
        this.loading = false
        await axios.post('https://student-supply.herokuapp.com/delete', {
            "wallet": thing,
            "client": client
        }).then(() => {
            window.location.reload()
        })
    },

    purchaseBtn: function() {
        this.tables = true;
      let supplyBtnId = document.getElementById('suppBtn');
      let conBtnId = document.getElementById('conBtn');
      //bg-baby-blue hover:bg-orange-supl
      conBtnId.classList.add("bg-orange-supl");
      conBtnId.classList.remove("bg-baby-blue");

      supplyBtnId.classList.add("bg-baby-blue");
      supplyBtnId.classList.remove("bg-orange-supl");
    },

    supplyBtn: function() {
      this.tables = false;
      let supplyBtnId = document.getElementById('suppBtn');
      let conBtnId = document.getElementById('conBtn');
      //bg-baby-blue hover:bg-orange-supl
      supplyBtnId.classList.add("bg-orange-supl");
      supplyBtnId.classList.remove("bg-baby-blue");

      conBtnId.classList.add("bg-baby-blue");
      conBtnId.classList.remove("bg-orange-supl");
    }
}
}
</script>

<style>
.custom-height{
  height: 27rem;
}
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
/* generated by https://loading.io/ */
</style>