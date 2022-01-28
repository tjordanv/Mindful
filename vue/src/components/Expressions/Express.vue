<template class="h">
    <div>

      <!-- <h1>COMING SOON</h1>
      <router-link class="link" :to="{name: 'home'}">Home</router-link> -->
      <chart :options="chartOptionsBar"></chart>
      <h1>hi</h1>
    </div>
</template>

<script>
export default {
  name: 'simpleChart',
  data() {
    return {
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
    }
  }
}
</script>

<style scoped>
.h {
  width: 100%;
  height: 100%;
}
chart {
  min-width: 100px;
  min-height:100px;
}
</style>