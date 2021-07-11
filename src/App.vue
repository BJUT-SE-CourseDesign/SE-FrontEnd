<template>
  <div class="App">
    <div class="children-ToolBar">
      <ToolBar />
    </div>
    <TabsBar />
    <div class="main">
      <LibraryHierarchy v-if="tabIndex === 0" />
      <PapersContainer v-if="tabIndex === 0" class="center" />
      <PaperReader v-else class="center" />
      <PaperDetail />
    </div>
    <div></div>
  </div>
</template>


<script>
import ToolBar from "./components/ToolBar.vue";
import LibraryHierarchy from "./components/LibraryHierarchy.vue";
import PapersContainer from "./components/PapersContainer.vue";
import TabsBar from "./components/TabsBar.vue";
import PaperReader from "./components/PaperReader.vue";
import PaperDetail from "./components/PaperDetail.vue";
export default {
  name: "App",
  components: {
    PaperReader,
    TabsBar,
    ToolBar,
    LibraryHierarchy,
    PapersContainer,
    PaperDetail,
  },
  data() {
    return {};
  },
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
.App {
  display: flex;
  flex-direction: column;
  height: 98vh;
}
.App .main {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
}

.center {
  flex: 1;
}
</style>