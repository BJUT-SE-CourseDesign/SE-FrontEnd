<template>
  <div class="paper-detail">
    <el-tabs type="border-card" style="height: 100%">
      <el-tab-pane label="详情" key="详情">
        <div v-show="nullChoose" class="el-textNull">未选择文件</div>
        <el-input v-if="chooseFile" v-model="input0"></el-input>
        <div v-if="chooseFile" class="el-text">作者</div>
        <el-input v-if="chooseFile" v-model="input1"></el-input>
        <div v-if="chooseFile" class="el-text">来源</div>
        <el-input v-if="chooseFile" v-model="input2"></el-input>
        <div v-if="chooseFile" class="el-text">摘要</div>
        <el-input v-if="chooseFile" v-model="input3"></el-input>
        <div v-if="chooseFile" class="el-text">关键词</div>
        <el-input v-if="chooseFile" v-model="input4"></el-input>
        <div v-if="chooseFile" class="el-text">年份</div>
        <el-input v-if="chooseFile" v-model="input5"></el-input>
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
      input0: ref(""),
      input1: ref(""),
      input2: ref(""),
      input3: ref(""),
      input4: ref(""),
      input5: ref(""),
    };
  },
  name: "PaperDetail",
  components: {},
  data() {
    return {
      detailTabs: ["详情", "笔记"],
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
      console.log(this.$store.state.currentPID);
      paperModifyNote({
        Note: this.textarea,
        PaperID: this.$store.state.currentPID,
      });
    },
  },
  computed: {
    chooseFile() {
      let flag = this.$store.state.choosePaper;
      return flag;
    },
    nullChoose() {
      if (this.$store.state.choosePaper) {
        return false;
      } else {
        return true;
      }
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
  align-items: flex-start;
  margin: 2vh;
}
.el-textNull {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
