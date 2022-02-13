<template>
  <div class="flex justify-center mb-5 flex-row shadow-2xl">
      <h1 class="text-center bg-white w-96 rounded-md text-xl">Contracts</h1>
  </div>
  <div>
      
  </div>
</template>

<script>
import moralis from 'moralis'
export default {
data(){
    return{
        test: ''
    }
},
created(){
 
 this.test = moralis.User.current()
}


}
</script>

<style>

</style>