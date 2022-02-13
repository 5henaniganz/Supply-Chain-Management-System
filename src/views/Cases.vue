<template>
<Content class="hidden lg:grid" />
<MobileHomeContent class="lg:hidden" />
</template>

<script>
import Content from '../components/cases/Cases-Content.vue'
import MobileHomeContent from '../components/cases/Mobile-Cases-Content.vue'

export default {
  name: 'Cases',
  components: {
    Content,
    MobileHomeContent
  },
}

</script>