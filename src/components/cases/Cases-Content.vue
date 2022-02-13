<template>
  <div class="grid grid-cols-2 w-full font-sans h-screen justify-center items-center">
    <div class=" h-4/5">
      <div class="ml-32 mt-72 mr-36 text-center">
        <h1 class="text-4xl">Tired of Chasing Clients?</h1>
        <h2 class="text-normal">We'll keep track of your client' liquidity, so you're never left in the dark when it comes to payments.</h2>
        <div class="flex justify-center">
        <router-link to="/login"><div class="text-white bg-dark-blue mt-7 h-14 w-80 text-center rounded-sm text-xl p-3 font-medium">
          
          <!-- SVG icon to accent the main feature button -->
           Check us out &#x1F389;
        </div></router-link>
        </div>
      </div>
    </div>
    <div class="flex h-screen justify-center items-center">
      
      <!-- Imports side widget to the right grid column -->
      <Widget />
    </div>
  </div>
</template>

<script>
import Widget from './Cases-Widget.vue'
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