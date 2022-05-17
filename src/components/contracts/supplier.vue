<template>
           <div v-if="!loading" class="break-words pl-5 pr-5 flex flex-col mt-5">

<table v-if="data" class="table-fixed text-center">
  <thead>
    <tr class="text-center items-center">
      <th class="w-2/6">Company</th>
      <th class="w-1/6">Cost</th>
      <th class="w-1/6">Payment Date</th>
      <th class="w-1/6">Liquidity</th>
      <th class="w-1/6">Withdraw</th>
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
        <button @click="withdraw(upcoming.wallet, upcoming.client)" v-if="Date.parse(upcoming.epoch.substring(0,10)) < dateToday" class="bg-orange-supl p-1 rounded-md text-white">Withdraw Now</button>
        <button v-else class="bg-baby-blue p-1 rounded-md text-white cursor-not-allowed" disabled>Cannot withdraw</button>
        </div></td>
    </tr>
  </tbody>
</table>
<ul v-else class="flex justify-center">
<div class="loadingio-spinner-rolling-dd5e02hqvg9"><div class="ldio-xvobpw7hude">
<div></div>
</div></div>
</ul>
<Pagination       :totalPages="totalPages"
      :perPage="pageSize"
      :currentPage="currentPage"
      @pagechanged="updatePage" />
              </div>
<div v-else class="flex flex-col items-center pt-10 pb-10">
    <div class="lds-dual-ring"></div>
    <div>Withdrawing Payment</div>
    <div class=" text-center text-xs">This may take some time for the blockchain to update &#x1F570;</div>
</div>
</template>

<script>
import axios from 'axios'
import moralis from 'moralis'
import Pagination from '../helpers/pagination.vue'
export default {
  components: {
    Pagination
  },
data(){
  return{
    loading: false,
    data: '',
    bing: 1,
    currentPage: 0,
    totalPages: 0,
    pageSize: 5,
    visibleLogs: [],
    dateToday: 0
  }
},
async mounted(){
  this.dateToday = Date.now()
  let user = await moralis.User.current().get("ethAddress")
  const options = { chain: "ropsten", address: user, from_block: "0"};
await moralis.Web3API.account.getNativeBalance(options).then(async (res) => {
  this.bing = await res.balance/1000000000000000000
});
      await  axios.post('https://student-supply.herokuapp.com/supply', 
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
 async withdraw(contractAddress, contractClient){
        let withdraw = {
        contractAddress: '0xcEfB33651Ce065fe69801D887dB068c590c131D3',
        functionName: 'withdraw',
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
		"name": "withdraw",
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
        wallet: contractAddress,
        company: contractClient
    }
        }
    const withdrawContract = await moralis.executeFunction(withdraw)
    this.loading = true;
    await withdrawContract.wait()
    this.loading = false;
    await axios.post('https://student-supply.herokuapp.com/delete', {
        "wallet": contractAddress,
        "client": contractClient
    }).then(() => {
        window.location.reload()
    })
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

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ff9b71;
  border-color: #ff9b71 transparent #ff9b71 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>