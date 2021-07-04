<template>
  <div>
    <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab">
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
  components: {},
  computed: {
    tabs() {
      return this.$store.state.openedTabs;
    },
  },
  methods: {
    removeTab(index) {
      this.$store.commit("removeTab", index);
    },
  },
};
</script>

<style scoped>
</style>
