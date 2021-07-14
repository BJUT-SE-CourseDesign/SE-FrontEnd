<template>
  <div class="paper-detail">
    <el-tabs type="border-card" style="height: 100%">
      <el-tab-pane label="详情" key="详情">
        <div>标题</div>
        作者 来源 摘要 关键词 年份
      </el-tab-pane>
      <el-tab-pane label="笔记" key="笔记"> </el-tab-pane>
      <el-tab-pane label="目录" key="目录"> </el-tab-pane>
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
.paper-detail {
  height: 100%;
}
</style>
