<template>
  <div class="paper-detail">
    <el-tabs type="border-card" style="height: 100%">
      <el-tab-pane label="详情" key="详情">
        <div v-show="nullChoose" class="el-textNull">未选择文件</div>

        <div v-for="item in detailItems" :key="item">
          <div v-if="chooseFile" class="el-text">{{ item }}</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="笔记" key="笔记">
        <el-input
          type="textarea"
          :rows="16"
          placeholder="请输入您的笔记"
          v-model="textarea"
          @change="doneInput"
        >
        </el-input>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import { ref } from "vue";
import { paperModifyNote, paperGetNote } from "../net/network";

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
      detailItems: ["标题", "作者", "来源", "摘要", "关键词", "年份"],
    };
  },
  mounted() {
    paperGetNote(
      {
        PaperID: this.$store.state.currentPID,
      },
      (res) => {
        this.textarea = res.data.note;
      }
    );
  },
  methods: {
    doneInput() {
      paperModifyNote(
        {
          Note: this.textarea,
          PaperID: this.$store.state.currentPID,
        },
        (res) => {
          console.log("Paper modify note");
          console.log(res);
        }
      );
    },
  },
  computed: {
    chooseFile() {
      let flag = this.$store.state.choosePaper;
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
