<template>
  <div>
      <div class="goalsContainer">
          <table>
          <tr class="headers">
              <th>Goal</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Target</th>
              <th>Current Score</th>
          </tr>
          </table>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.goalsContainer {
  min-height: 600px;
  max-width: 500px;
  border: 2px red solid;
}
table {
    border-spacing: 15px;
}
</style>