<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane
        v-for="tab in detailTabs"
        :label="tab"
        :key="tab"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
export default {
  name: "PaperDetail",
  components: {},
  data() {
    return {
      detailTabs: ["详情", "笔记", "目录"],
    };
  },
  methods: {},
};
</script>

<style scoped>
</style>
