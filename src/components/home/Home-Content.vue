<template>
  <div class="grid grid-cols-2 w-full font-sans h-screen justify-center items-center">
    <div class=" h-4/5">
      <div class="ml-32 mt-72 mr-36 text-center">
        <h1 class="text-4xl">Manage your supply chain</h1>
        <h2 class="text-normal">Fully decentralized supply chain management. Track purchase and supplier orders, keep bookkeeping records, easily setup and enforce purchase and order contracts...</h2>
        <div class="flex justify-center">
        <router-link to="/login"><div class="text-white bg-dark-blue mt-7 h-14 w-80 text-center rounded-sm text-xl p-3 font-medium">
          
          <!-- SVG icon to accent the main feature button -->
           Check us out &#x1F440;
        </div></router-link>
        </div>
      </div>
    </div>
    <div class="flex h-screen justify-center items-center flex-shrink-0">
      
      <!-- Imports side widget to the right grid column -->
      <Widget />
    </div>
  </div>
</template>

<script>
import Widget from '@/components/home/Home-Widget.vue'
export default {
  components: {
    Widget
  },
}
</script>

<style>
.test-style{
    background-color: #4464AD;
}
</style>