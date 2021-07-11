<template>
  <div class="root">
    <div class="children-ToolBar">
      <ToolBar />
    </div>
    <div class="main">
      <LibraryHierarchy />
      <PapersContainer />
      <UploadFrame />
      <LogIn />
    </div>
  </div>
</template>


<script>
import ToolBar from "../components/ToolBar.vue";
import LibraryHierarchy from "../components/LibraryHierarchy.vue";
import PapersContainer from "../components/PapersContainer.vue";
import LogIn from "../components/LogIn.vue";

export default {
  name: "PapersManagement",
  components: {
    ToolBar,
    LibraryHierarchy,
    PapersContainer,
    LogIn
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.children-ToolBar {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

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
