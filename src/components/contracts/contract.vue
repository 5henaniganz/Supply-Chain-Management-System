<template>
  <div class="flex justify-center mb-5 flex-row shadow-2xl">
      <h1 class="text-center bg-white w-96 rounded-md text-xl">Contracts</h1>
  </div>

    <div class="flex flex-col lg:flex-row gap-10 justify-center items-center">
      <div class="bg-white shadow-2xl rounded-lg p-5 pb-7 w-96">
      <div><h1 class="mt-2 text-2xl font-normal text-black text-center">Create Recurring Contract</h1></div>
<div class="flex flex-col items-center">
    <h1 class="" id="status">{{statusCon}}</h1>
  <label class="block mb-1 mt-4" for="org-name">Payee</label>
  <input class=" w-4/5  h-8 px-3 text-base placeholder-gray-600 placeholder-opacity-40 border rounded-lg focus:shadow-outline" type="text" placeholder="enter payee name" v-model="client" id="org-name"/>

  <label class="block mb-1 mt-4" for="org-wallet">Wallet Address</label>
  <input class="disabled:opacity-50  w-4/5  h-8 px-3 text-base placeholder-gray-600 placeholder-opacity-40 border rounded-lg focus:shadow-outline" type="text" placeholder="enter wallet address" v-model="walletAddress" id="org-wallet" />

<label class="block mb-1 mt-4" for="org-email">Pay Term</label>
<div class="flex gap-2">
<button @click="handleTerm('30')" class="self-start hover:opacity-50 bg-orange-supl rounded-sm text-white p-1 pl-3 pr-3 mt-3">30</button>
<button @click="handleTerm('60')" class="self-start hover:opacity-50 bg-orange-supl rounded-sm text-white p-1 pl-3 pr-3 mt-3">60</button>
<button @click="handleTerm('90')" class="self-start hover:opacity-50 bg-orange-supl rounded-sm text-white p-1 pl-3 pr-3 mt-3">90</button>
<button  class="self-start hover:opacity-50 bg-dark-blue rounded-sm text-white p-1 pl-3 pr-3 mt-3">Custom</button>
</div>
<label class="block mb-1 mt-4" for="eth-amount">Amount (Eth)</label>
<input class=" w-4/5  h-8 px-3 text-base placeholder-gray-600 placeholder-opacity-40 border rounded-lg focus:shadow-outline" type="number" id="eth-amount" v-model="ethAmount" placeholder="enter amount (Eth)"/>

<button @click="contractCreation" class="self-start ml-8 hover:opacity-50 bg-dark-blue rounded-sm text-white p-1 pl-3 pr-3 mt-3">Create Contract</button>
</div>
      </div>



            <div class="bg-white shadow-2xl rounded-lg p-5 pb-7 w-96">
      <div><h1 class="mt-2 text-2xl font-normal text-black text-center">One off Payment</h1></div>
<div class="flex flex-col items-center">
    <h1 class="" id="status">{{test}}</h1>
  <label class="block mb-1 mt-4" for="org-name">Payee</label>
  <input class=" w-4/5  h-8 px-3 text-base placeholder-gray-600 placeholder-opacity-40 border rounded-lg focus:shadow-outline" type="text" placeholder="enter payee name" v-model="client" id="org-name"/>

  <label class="block mb-1 mt-4" for="org-wallet">Wallet Address</label>
  <input class="disabled:opacity-50  w-4/5  h-8 px-3 text-base placeholder-gray-600 placeholder-opacity-40 border rounded-lg focus:shadow-outline" type="text" placeholder="enter wallet address" v-model="walletAddress" id="org-wallet" />

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
import moralis from 'moralis'
import axios from 'axios'
export default {
data(){
    return{
        statusCon: '',
        test: '',
        ethAmount: '',
        walletAddress: '',
        term: '',
        client: ''
    }
},
created(){
 
},
methods: {
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

</style>