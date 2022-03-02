<template>

      <div class="w-96 bg-white shadow-2xl rounded-2xl p-10">
        <h1 class="text-center mb-5 text-2xl">Profit/Loss</h1>
      <DoughnutChart  :chartData="Data" />
      </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { DoughnutChart } from 'vue-chart-3';
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
  components: { DoughnutChart },
  setup() {

    const store = useStore()
    
    const Data = computed(() => ({
      labels: ['Income', 'Expenditure'],
      datasets: [
        {
          data: [store.state.profit[0]/1000000000000000000 , store.state.profit[1]/1000000000000000000],
          backgroundColor: ['#ff9b71', '#e84855'],
        },
      ],
  }));

    return { Data };
  },
});
</script>

<style>
</style>