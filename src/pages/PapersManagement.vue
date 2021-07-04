<template>
  <div class="PaperManagement">
    <div class="children-ToolBar">
      <ToolBar />
    </div>
    <TabsBar />
    <div class="main">
      <LibraryHierarchy />
      <PapersContainer v-if="tabIndex === '0'" />
      <PaperReader v-else />
      <UploadFrame />
    </div>
    <div></div>
  </div>
</template>


<script>
import ToolBar from "../components/ToolBar.vue";
import LibraryHierarchy from "../components/LibraryHierarchy.vue";
import PapersContainer from "../components/PapersContainer.vue";
import TabsBar from "../components/TabsBar.vue";
import PaperReader from "../components/PaperReader.vue";

export default {
  name: "PapersManagement",
  components: {
    PaperReader,
    TabsBar,
    ToolBar,
    LibraryHierarchy,
    PapersContainer,
  },
  data() {},
  computed: {
    tabIndex() {
      return this.$store.state.tabIndex;
    },
  },
};
</script>

<style scoped>
.children-ToolBar {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.PaperManagement {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.PaperManagement .main {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
}
</style>
