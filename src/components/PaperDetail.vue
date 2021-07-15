<template>
  <div class="paper-detail">
    <el-tabs type="border-card" style="height: 100%">
      <el-tab-pane label="详情" key="详情">
        <div v-show="nullChoose" class="el-textNull">未选择文件</div>
        <div v-if="chooseFile" class="el-text">标题</div>
        <div v-if="chooseFile" class="el-text">作者</div>
        <div v-if="chooseFile" class="el-text">来源</div>
        <div v-if="chooseFile" class="el-text">摘要</div>
        <div v-if="chooseFile" class="el-text">关键词</div>
        <div v-if="chooseFile" class="el-text">年份</div>
      </el-tab-pane>
      <el-tab-pane label="笔记" key="笔记">
        <el-input
          type="textarea"
          :rows="16"
          placeholder="请输入您的笔记"
          v-model="textarea"
          @change="downInput"
        >
        </el-input>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      textarea: ref(""),
    };
  },
  name: "PaperDetail",
  components: {},
  data() {
    return {
      nullChoose: true,
      detailTabs: ["详情", "笔记"],
    };
  },
  methods: {
    downInput() {},
  },
  computed: {
    chooseFile() {
      let flag = this.$store.state.choosePaper;
      console.log("chooseFile");
      console.log(flag);
      return flag;
    },
  },
};
</script>

<style scoped>
.paper-detail {
  height: 100%;
  width: 20vw;
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
