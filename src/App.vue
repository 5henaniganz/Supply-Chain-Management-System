<template>
<!-- Main div wrapper is used to instatiate a background from tailwind at the large screen
breakpoint. -->
<div class="bg-backgroundM bg-cover bg-repeat-y lg:bg-background lg:bg-no-repeat lg:bg-cover font-sans overflow-y-auto">
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
export default {
  name: 'Home',
  components: {
    Navigation
  },
  setup(){
    return{
    
    } 
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
</style>
