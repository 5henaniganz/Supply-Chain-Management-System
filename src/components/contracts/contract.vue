<template>
  <div class="flex justify-center mb-5 flex-row shadow-2xl">
      <h1 class="text-center bg-white w-96 rounded-md text-xl">Contracts</h1>
  </div>

    <div class="flex flex-col lg:flex-row gap-10 justify-center items-center">
      <div class="bg-white shadow-2xl rounded-lg p-5 pb-7 w-96">
      <div><h1 class="mt-2 text-2xl font-normal text-black text-center">Create Supplier Contract</h1></div>
<div v-if="!loading" class="flex flex-col items-center">
    <h1 class="" id="status">{{contractStatus}}</h1>
      <label class="block mb-1 mt-4" for="org-wallet">Wallet Address</label>
  <input class="disabled:opacity-50  w-4/5  h-8 px-3 text-base placeholder-gray-600 placeholder-opacity-40 border rounded-lg focus:shadow-outline" type="text" placeholder="enter wallet address" v-model="contractAddress" @keyup="matchUserContract" id="org-wallet" />
  <label class="block mb-1 mt-4" for="org-name">Payee</label>
  <input class=" w-4/5  h-8 px-3 text-base placeholder-gray-600 placeholder-opacity-40 border rounded-lg focus:shadow-outline" type="text" placeholder="enter payee name" v-model="contractClient" id="org-name"/>

<label class="block mb-1 mt-4" for="org-email">Pay Term</label>
<div class="flex gap-2">
<button @click="handleTerm('30')" class="self-start hover:opacity-50 bg-orange-supl rounded-sm text-white p-1 pl-3 pr-3 mt-3">30</button>
<button @click="handleTerm('60')" class="self-start hover:opacity-50 bg-orange-supl rounded-sm text-white p-1 pl-3 pr-3 mt-3">60</button>
<button @click="handleTerm('90')" class="self-start hover:opacity-50 bg-orange-supl rounded-sm text-white p-1 pl-3 pr-3 mt-3">90</button>
<button  class="self-start hover:opacity-50 bg-dark-blue rounded-sm text-white p-1 pl-3 pr-3 mt-3">Custom</button>
</div>
<label class="block mb-1 mt-4" for="eth-amount">Amount (Eth)</label>
<input class=" w-4/5  h-8 px-3 text-base placeholder-gray-600 placeholder-opacity-40 border rounded-lg focus:shadow-outline" type="number" id="eth-amount" v-model="contractAmount" placeholder="enter amount (Eth)"/>

<button @click="addContract" class="self-start ml-8 hover:opacity-50 bg-dark-blue rounded-sm text-white p-1 pl-3 pr-3 mt-3">Create Contract</button>
</div>
<div v-else class="flex flex-col items-center pt-28 pb-32">
    <div class="lds-dual-ring"></div>
    <div>Creating New Contract</div>
    <div class=" text-center text-xs">This may take some time for the blockchain to update &#x1F570;</div>
</div>
      </div>



            <div class="bg-white shadow-2xl rounded-lg p-5 pb-7 w-96">
      <div><h1 class="mt-2 text-2xl font-normal text-black text-center">One off Payment</h1></div>
<div class="flex flex-col items-center">
    <h1 class="" id="status">{{test}}</h1>
      <label class="block mb-1 mt-4" for="org-wallet">Wallet Address</label>
  <input class="disabled:opacity-50  w-4/5  h-8 px-3 text-base placeholder-gray-600 placeholder-opacity-40 border rounded-lg focus:shadow-outline" type="text" placeholder="enter wallet address" v-model="walletAddress" @keyup="matchUser" id="org-wallet" />

  <label class="block mb-1 mt-4" for="org-name">Payee</label>
  <input class=" w-4/5  h-8 px-3 text-base placeholder-gray-600 placeholder-opacity-40 border rounded-lg focus:shadow-outline" type="text" placeholder="enter payee name" v-model="client" id="org-name"/>

<label class="block mb-1 mt-4" for="org-email">Note</label>
<input class=" w-4/5  h-8 px-3 text-base placeholder-gray-600 placeholder-opacity-40 border rounded-lg focus:shadow-outline" type="optional note" id="org-email" placeholder="enter note (optional)"/>

<label class="block mb-1 mt-4" for="eth-amount">Amount (Eth)</label>
<input class=" w-4/5  h-8 px-3 text-base placeholder-gray-600 placeholder-opacity-40 border rounded-lg focus:shadow-outline" type="number" id="eth-amount" v-model="ethAmount" placeholder="enter amount (Eth)"/>

<button @click="handlePayment" class="self-start ml-8 hover:opacity-50 bg-dark-blue rounded-sm text-white p-1 pl-3 pr-3 mt-3">Send Payment</button>
</div>
      </div>
  </div>
</template>

<script>
import moralis, { Moralis } from 'moralis'
import axios from 'axios'
import store from '../../store/index'
export default {
data(){
    return{
        loading: false,
        statusCon: '',
        contractStatus: '',
        test: '',
        contractAddress: '',
        contractClient: '',
        contractAmount: 0,
        ethAmount: '',
        walletAddress: '',
        term: '',
        client: '',
        testingState: 0
    }
},
mounted(){
async function load() {
await moralis.enableWeb3();
}

load();
},
methods: {
    matchUser: function(val){
    for(let x = 0; x < store.state.accountNames.length; x ++){
      if(this.walletAddress.toLowerCase() === store.state.accountNames[x].ethAddress){
        this.client = store.state.accountNames[x].username
      }
    }
    },
    matchUserContract: function(val){
    for(let x = 0; x < store.state.accountNames.length; x ++){
      if(this.contractAddress.toLowerCase() === store.state.accountNames[x].ethAddress){
        this.contractClient = store.state.accountNames[x].username
      }
    }
    },
    addContract: async function (event) {
try{
    let epochTerm = (this.term*86400)+(~~(Date.now() / 1000))
    let d = new Date(0)
    d.setUTCSeconds(epochTerm)
    let realDate = d.toUTCString()

    let user = await moralis.User.current().get("ethAddress")

        let deposit = {
        contractAddress: '0xcEfB33651Ce065fe69801D887dB068c590c131D3',
        functionName: 'deposit',
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
        wallet: this.contractAddress,
        company: this.contractClient
    },
    msgValue: moralis.Units.ETH(this.contractAmount)
        }

    let options = {
        contractAddress: '0xcEfB33651Ce065fe69801D887dB068c590c131D3',
        functionName: 'addPayee',
        abi: [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
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
		],
        params: {
            _owner: user,
            _wallet: this.contractAddress,
            _company: this.contractClient,
            _release: epochTerm,
            _amount: 0,
            _withdraw: false
        }
    }

    const createdContract = await moralis.executeFunction(options)
    this.loading = true
    await createdContract.wait()
    const depositValue = await moralis.executeFunction(deposit)
    this.loading = false
    this.contractStatus = 'Contract Created'
    await axios.post('http://localhost:3000/create', {
        "client": this.contractClient,
        "wallet": this.contractAddress,
        "date": realDate.substring(5, 7) + "/" + realDate.substring(8, 11)+"/"+realDate.substring(14, 16),
        "amount": this.contractAmount,
        "owner": user,
        "epoch": d
        }).then(() => {
            window.location.reload()
        })
    await depositValue.wait()

}catch{
    this.contractStatus = 'Transaction Unsuccessful'
}
    },
handleTerm: function(termValue){
this.term = termValue
},
    handlePayment: async function(){
        try {
            await moralis.authenticate()
        const options = {type: "native", amount: moralis.Units.ETH(this.ethAmount), receiver: this.walletAddress}
        let result = await moralis.transfer(options)
        var element = document.getElementById("status");
        element.classList.add("text-green-400");
        this.test = "Successful Payment"
        } catch (error) {
            console.log(error)
            var element = document.getElementById("status");
            element.classList.add("text-red-400");
            this.test="Payment Failed"
        }

    },
    contractCreation: async function(){
        try {
        axios.post('http://localhost:3000/create', 
        {
            "client": this.client,
            "wallet": this.walletAddress,
            "date": "26/02/2022",
            "amount": this.ethAmount,
            "owner": await moralis.User.current().get("ethAddress")
        }).then((res) => {
            this.statusCon = res.data.message
        })
        } catch (error) {
            this.statusCon = "Contract Creation Failed"
        }
    }
}
}
</script>

<style>
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