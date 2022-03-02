<template>
<Content class="hidden lg:grid" />
<MobileHomeContent class="lg:hidden" />
</template>

<script>
import Content from '@/components/home/Home-Content.vue'
import MobileHomeContent from '../components/home/Mobile-Home-Content.vue'

export default {
  name: 'Home',
  components: {
    Content,
    MobileHomeContent
  },
}

</script>