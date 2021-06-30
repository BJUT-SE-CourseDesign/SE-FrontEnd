<template>
  <div class="root">
    <ToolBar />
    <div class="main">
      <LibraryHierarchy />
      <PapersContainer />
    </div>
  </div>
</template>


<script>
import ToolBar from "../components/ToolBar.vue";
import LibraryHierarchy from "../components/LibraryHierarchy.vue";
import PapersContainer from "../components/PapersContainer.vue";

export default {
  name: "PapersManagement",
  components: {
    ToolBar,
    LibraryHierarchy,
    PapersContainer,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
}

.root .main {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>
