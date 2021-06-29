<template>
  <ToolBar />
  <library-hierarchy />
</template>

<script>
import ToolBar from "./components/ToolBar.vue";
import LibraryHierarchy from "./components/LibraryHierarchy.vue";

export default {
  name: "App",
  components: {
    ToolBar,
    LibraryHierarchy,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
