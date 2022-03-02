<template>
<!-- Main div wrapper is used to instatiate a background from tailwind at the large screen
breakpoint. -->
<div class="bg-backgroundM bg-cover bg-repeat-y lg:bg-background lg:bg-no-repeat lg:bg-cover font-sans overflow-y-auto no-scrollbar">
  <Navigation />
<router-view v-slot="{ Component, route }">
  <transition name="fade" mode="out-in">
    <div :key="route.name">  
      <component :is="Component"></component>
    </div>
  </transition>
  </router-view>
</div>
</template>
<script>
import Navigation from '@/components/layout/Navigation.vue'
import {useStore} from 'vuex'
import Moralis from 'moralis'
export default {
  name: 'Home',
  components: {
    Navigation
  },
    created(){
const store = useStore()

    async function test () {
    const allusers = await Moralis.Cloud.run("loadUsers");
    store.commit('setAccountNames', allusers)
    }
        test()
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .50s;
}

.fade-enter-active {
  transition-delay: .50s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
