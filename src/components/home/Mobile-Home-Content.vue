<template>
  <div class="flex flex-col h-screen">
      <div class="text-center mt-20 self-center">
          <div class="bg-white w-96 flex flex-col rounded-md filter drop-shadow-2xl p-5">
          <h1 class="text-3xl">Manage your supply chain</h1>
          <h2 class="text-normal font-normal">Fully decentralized supply chain management. Track purchase and supplier orders, keep bookkeeping records, easily setup and enforce purchase and order contracts...</h2>
                <div class="flex justify-center">
                <router-link to="/login"><div class="text-white bg-dark-blue mt-7 h-14 w-80 text-center rounded-sm text-xl p-3 font-medium">
          
          <!-- SVG icon to accent the main feature button --> 
          &#x1F440; Check us out
        </div></router-link>
        </div>
        </div>
      <div class="flex justify-center mt-12">
          <Widget/>
      </div>
      </div>
  </div>
</template>

<script>
import Widget from './Home-Widget.vue'
export default {
  components: {
    Widget
  },
}
</script>

<style>

</style>