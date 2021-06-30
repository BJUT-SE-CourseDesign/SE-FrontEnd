<template>
  <MenuBar />
  <ToolBar />
  <UploadFrame />
  <LibraryHierarchy />
</template>

<script>
import ToolBar from "./components/ToolBar.vue";
import UploadFrame from "./components/UploadFrame.vue";

export default {
  name: "App",
  components: {
    UploadFrame,
    ToolBar,
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
