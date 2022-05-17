<template>
<div class="h-screen">
  <Contract />
  <br>
  <Sub />
  </div>
</template>

<script>
import Contract from '../components/contracts/contract.vue'
import Sub from '../components/contracts/purchase-supplier.vue'
export default {
components: {
    Contract,
    Sub
}
}
</script>

<style>

</style>