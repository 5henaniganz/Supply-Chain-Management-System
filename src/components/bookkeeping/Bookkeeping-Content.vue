<template>
<div class="h-screen">
  <div id="iframeContainer"></div>
<div class="flex justify-center text-center flex-col items-center break-words">

  <div class="flex justify-center items-center flex-col text-sm lg:text-normal">
<div class="bg-white shadow-2xl rounded-2xl p-10 mt-4 break-words w-96 lg:w-auto">
      <h1 class="text-center mb-5 text-xl">Accounts Recievable</h1>
      <table class="table-fixed w-72 lg:w-auto">
  <thead >
    <tr>
    <th class="w-2/6">Date</th>
      <th class="w-1/6">Supplier</th>
      <th class="w-1/6">Cost</th>
      <th class="w-1/6">Blockchain Explorer</th>
      <th class="w-1/6">Invoice</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(payable, index) in visibleLogs" :key="index">
      <td>{{payable.block_timestamp.substring(0,10).split("-").reverse().join("/")}}</td>
      <td>{{visibleNames[index]}}</td>
      <td>-{{payable.value/1000000000000000000}} Eth</td>
      <td><a :href="'https://ropsten.etherscan.io/tx/' + payable.hash" target="_blank">View</a></td>
      <td><button @click="downloadPdf(payable.from_address, payable.value/1000000000000000000, payable.block_timestamp.substring(0,10).split('-').reverse().join('/'), payable.to_address, test[index])">View</button></td>
    </tr>
  </tbody>
</table>
<div class=" flex justify-center mt-2 gap-2">
      <button @click="updatePage(currentPage-1)">Prev</button>
      <button @click="updatePage(currentPage+1)">Next</button>
</div>
</div>
<div class="bg-white shadow-2xl rounded-2xl p-10 mt-4 break-words w-96 lg:w-auto">
      <h1 class="text-center mb-5 text-xl">Accounts Recievable</h1>
      <table class="table-fixed w-72 lg:w-auto">
  <thead>
    <tr>
    <th class="w-2/6">Date</th>
      <th class="w-1/6">Supplier</th>
      <th class="w-1/6">Cost</th>
      <th class="w-1/6">Blockchain Explorer</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(recieve, index) in visibleLogsT" :key="index">
      <td>{{recieve.block_timestamp.substring(0,10).split("-").reverse().join("/")}}</td>
      <td>{{visibleNamesT[index]}}</td>
      <td>+{{recieve.value/1000000000000000000}} Eth</td>
      <td><a :href="'https://ropsten.etherscan.io/tx/' + recieve.hash">View</a></td>
    </tr>
  </tbody>
</table>
<div class=" flex justify-center mt-2 gap-2">
      <button @click="updatePageT(currentPageT-1)">Prev</button>
      <button @click="updatePageT(currentPageT+1)">Next</button>
</div>
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
import {inject, ref} from 'vue'
import { useStore } from 'vuex'
import Pagination from '../helpers/pagination.vue'
export default {
  components:{
    Pagination
  },
setup (){
    const store = useStore()
    let fullTransactionList = store.state.transactions;
    let accountsObject = {'payable': [], 'recieve': []}
    const $moralis = inject('$moralis')
    const user = $moralis.User.current()
    const currentEthAddress = user.get("ethAddress");
    let test = []
    let testPay = []
    const contractAddress = '0xcefb33651ce065fe69801d887db068c590c131d3';

    let currentPage = ref(0)
    let totalPages = ref(0)
    let pageSize = ref(5)
    let visibleLogs = ref([])
    let visibleNames = ref([])
    
    let currentPageT = ref(0)
    let totalPagesT = ref(0)
    let pageSizeT = ref(5)
    let visibleLogsT = ref([])
    let visibleNamesT = ref([])


for(let i = 0; i < fullTransactionList.length; ++i){
    if(fullTransactionList[i].from_address === currentEthAddress){
       accountsObject.payable.push(fullTransactionList[i]) 
    }else{
        accountsObject.recieve.push(fullTransactionList[i]) 
    }
}

        for(let i = 0; i < accountsObject.payable.length; i++){ 
    for(let x = 0; x < store.state.accountNames.length; x ++){
      if(accountsObject.payable[i].to_address === store.state.accountNames[x].ethAddress){
        test.push(store.state.accountNames[x].username)
      }else if(accountsObject.payable[i].to_address === contractAddress){
        test.push('Contract Created')
      }
    }
  }

  function updatePage(pageNo){
    if(pageNo <= 0){
      pageNo = 0
    }
    currentPage.value = pageNo
    updateLogs()
  }

  function updateLogs(){
    visibleLogs.value = accountsObject.payable.slice(currentPage.value*pageSize.value, currentPage.value*pageSize.value + pageSize.value)
    visibleNames.value = test.slice(currentPage.value*pageSize.value, currentPage.value*pageSize.value + pageSize.value)
    if(visibleLogs.value.length == 0 && currentPage.value > 0){
      updatePage(currentPage.value - 1)
    }
  }

          for(let i = 0; i < accountsObject.recieve.length; i++){ 
    for(let x = 0; x < store.state.accountNames.length; x ++){
      if(accountsObject.recieve[i].from_address === store.state.accountNames[x].ethAddress){
        testPay.push(store.state.accountNames[x].username)
      }else if(accountsObject.recieve[i].from_address === contractAddress){
        testPay.push('Contract Created')
      }
    }
  }



  function updatePageT(pageNo){
    if(pageNo <= 0){
      pageNo = 0
    }
    currentPageT.value = pageNo
    updateLogsT()
  }

  function updateLogsT(){
    visibleLogsT.value = accountsObject.recieve.slice(currentPageT.value*pageSizeT.value, currentPageT.value*pageSizeT.value + pageSizeT.value)
    visibleNamesT.value = testPay.slice(currentPageT.value*pageSizeT.value, currentPageT.value*pageSizeT.value + pageSizeT.value)
    if(visibleLogsT.value.length == 0 && currentPageT.value > 0){
      updatePageT(currentPageT.value -1)
    }
  }

updateLogsT()
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
require('pdfmake/build/pdfmake.js');
require('pdfmake/build/vfs_fonts.js');
 function downloadPdf (wallet, cost, date, walletTo, companyTo){
var dd = {
      pageSize: {
    width: 595.28,
    height: 'auto'
  },
	content: [
		{text: 'Invoice', style: 'header'},
    {text: 'Date: ' + date, style: 'subheader'},
		{text: 'From:                                                                 To: ', style: 'subheader'},
		{text: 'Company: ' + $moralis.User.current().attributes.username + '                                                                                                   Company: ' + companyTo, style: 'invoiceTextSize'},
		{text: 'Wallet:    '+ wallet +'                                           Wallet: ' + walletTo, style: 'invoiceFrom'},
		
		{
			style: '',
			table: {
			    widths: [200, '*', '*', '*'],
				body: [
					[ { text: 'Service', style: 'tableStyle' }, { text: 'Quantity', style: 'tableStyle'}, { text: 'Cost', style: 'tableStyle' }, { text: 'Gross Total', style: 'tableStyle'}],
					['Pallets', 'X2', cost/2 + "Eth", cost + "Eth"]
				], 
			}
		},
		{text: 'Net Total: ' + cost + " Eth", style: 'header'},
	],
	styles: {
		header: {
			fontSize: 25,
			bold: true,
			margin: [0, 30, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableStyle: {
		    bold: true,
		    fillColor: '#ffd2c0'
		},
		invoiceFrom: {
      fontSize: 8,
		  margin: [0, 0, 0, 20],
		},
    invoiceTextSize: {
      fontSize: 8
    }
	},
	defaultStyle: {
		// alignment: 'justify'
	}
	
}
    pdfMake.createPdf(dd).open();
  }
updateLogs()
return {currentPageT, totalPagesT, pageSizeT, visibleLogsT, updatePageT, updateLogsT, visibleNamesT, accountsObject, convertToCSV, downloadPdf, test, testPay, currentPage, totalPages, pageSize, visibleLogs, updatePage, updateLogs,visibleNames}
}
}
</script>

<style>

</style>