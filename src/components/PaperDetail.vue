<template>
  <div class="paper-detail">
    <el-tabs type="border-card" style="height: 100%">
      <el-tab-pane label="详情" key="详情">
        <div v-show="nullChoose" class="el-textNull">未选择文件</div>
        <div v-show="chooseFile" class="el-text">标题</div>
        <div v-show="chooseFile" class="el-text">作者</div>
        <div v-show="chooseFile" class="el-text">来源</div>
        <div v-show="chooseFile" class="el-text">摘要</div>
        <div v-show="chooseFile" class="el-text">关键词</div>
        <div v-show="chooseFile" class="el-text">年份</div>
      </el-tab-pane>
      <el-tab-pane label="笔记" key="笔记"> </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
export default {
  name: "PaperDetail",
  components: {},
  data() {
    return {
      nullChoose: true,
      chooseFile: false,
      detailTabs: ["详情", "笔记"],
    };
  },
  methods: {},
};
</script>

<style scoped>
.paper-detail {
  height: 100%;
}
.el-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2vh;
}
.el-textNull {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
