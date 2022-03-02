<template>
  <div class="flex flex-col justify-center items-center h-screen">
      <div class="bg-white shadow-2xl rounded-lg p-5 pb-7">
      <div><h1 class="mt-2 text-2xl font-normal text-black text-center">Account Settings</h1></div>
      <SettingsForm />
      </div>
  </div>
</template>

<script>
import SettingsForm from '@/components/forms/Settings-Form.vue'
export default {
components:{
    SettingsForm
}
}
</script>

<style>

</style>