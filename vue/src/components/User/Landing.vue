<template>
  <div class="container">
      <div class="header">
        <h1>Mindful</h1>
        <h2>Working Towards A Better You</h2>
      </div>
      <div class="tagline">
        <h3>Providing the tools to help find the greatness within you.</h3>
      </div>
      <div class="titles">
        <h3>Self-Expression</h3>
        <h3>Goal-Setting</h3>
        <h3>Community-Support</h3>
      </div>
      <div class="icons">
        <font-awesome-icon icon="edit" class="icon fa-3x"></font-awesome-icon>
        <font-awesome-icon icon="tasks" class="icon fa-3x"></font-awesome-icon>
        <font-awesome-icon icon="users" class="icon fa-3x"></font-awesome-icon>
      </div>
      <div class="descriptions">
        <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying
          out print, graphic or web designs. The passage is attributed to an unknown
          typesetter in the 15th </p>
        <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying
          out print, graphic or web designs. The passage is attributed to an unknown
          typesetter in the 15th </p>
        <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying
          out print, graphic or web designs. The passage is attributed to an unknown
          typesetter in the 15th </p>
      </div>


  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
    height: 80vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: 
    "header header header"
    "tagline tagline tagline"
    "titles icons descriptions"
    "titles icons descriptions"
    "titles icons descriptions";
    justify-items: center;
    text-align: center;
    background-color: #eff2f1;
}
.header {
    grid-area: header;
}
.tagline {
    grid-area: tagline;
}
.titles {
    grid-area: titles;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
}
.icons {
    grid-area: icons;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
}
.descriptions {
    grid-area: descriptions;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
}
.icon {
    color:navy;
}
</style>