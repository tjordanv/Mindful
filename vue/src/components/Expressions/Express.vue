<template>
  
      <!-- <h1>COMING SOON</h1>
      <router-link class="link" :to="{name: 'home'}">Home</router-link> -->
      <chart :options="chartOptionsBar"></chart>
  
</template>

<script>
export default {
  name: 'simpleChart',
  data: () => ({
    chartOptionsBar: {
      xAxis: {
        data: ['a', 'b', 'c']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          data: [20, 40, 30]
        }
      ]
    }
  })
}
</script>

<style scoped>

</style>