<template>
  <div>
    <el-tabs
      v-model="tabIndex"
      type="card"
      @tab-remove="removeTab"
      @tab-click="switchTab"
    >
      <el-tab-pane
        :key="item.name"
        v-for="(item, index) in tabs"
        :closable="index !== 0"
        :label="item"
        :name="'' + index"
      />
    </el-tabs>
  </div>
</template>


<script>
export default {
  name: "TabsBar",
  data() {},
  components: {},
  computed: {
    tabs() {
      return this.$store.state.openedTabs;
    },
    tabIndex() {
      return "" + this.$store.state.tabIndex;
    },
  },
  methods: {
    removeTab(index) {
      this.$store.commit("removeTab", index);
      this.$store.commit("switchTab", Math.max(0, parseInt(index) - 1));
    },
    switchTab(event) {
      this.$store.commit("switchTab", event.index);
    },
  },
};
</script>

<style scoped>
</style>
