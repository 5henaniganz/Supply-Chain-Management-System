<template>
      <div class="bg-white shadow-2xl rounded-2xl ml-2 custom-height w-96 lg:h-custom-height lg:w-custom-width justify-center">
      <div class="p-10">
        <h1 class="text-center text-2xl">Upcoming Purchase Orders</h1>
      </div>
              <div class="break-words pl-5 pr-5">
<table class="table-fixed text-center">
  <thead>
    <tr>
      <th class="w-2/6">Company</th>
      <th class="w-1/6">Service</th>
      <th class="w-2/6">Date</th>
      <th class="w-1/6">Liquidity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Pallet People</td>
      <td>X10 Shipping Pallets</td>
      <td>11/09/2022</td>
      <td class="bg-green-100">Able to Honor</td>
    </tr>
    <tr>
      <td>The forklift People</td>
      <td>X2 Rental Forklifts</td>
      <td>05/09/2022</td>
      <td class="bg-red-100">Unable to Honor</td>
    </tr>
    <tr>
      
    </tr>
    <tr>
      
    </tr>
  </tbody>
</table>
              </div>
      </div>
</template>

<script>
import {inject} from 'vue';
export default {
setup() {
const $moralis = inject('$moralis')
const user = $moralis.User.current()


return {
  user
}
}
}
</script>

<style>
.custom-height{
  height: 27rem;
}
</style>