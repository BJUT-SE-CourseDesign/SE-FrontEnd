<template>
  <div class="paper-detail">
    <el-tabs type="border-card" style="height: 100%">
      <el-tab-pane label="详情" key="详情">
        <div v-show="nullChoose" class="el-textNull">未选择文件</div>
        <el-input
          v-if="chooseFile"
          v-model="input0"
          type="textarea"
          :rows="1"
          @change="doneInputParameters"
        ></el-input>
        <div v-if="chooseFile" class="el-text">作者</div>
        <el-input
          v-if="chooseFile"
          v-model="input1"
          type="textarea"
          :rows="1"
          @change="doneInputParameters"
        ></el-input>
        <div v-if="chooseFile" class="el-text">来源</div>
        <el-input
          v-if="chooseFile"
          v-model="input2"
          type="textarea"
          :rows="1"
          @change="doneInputParameters"
        ></el-input>
        <div v-if="chooseFile" class="el-text">摘要</div>
        <el-input
          v-if="chooseFile"
          v-model="input3"
          type="textarea"
          :rows="4"
          @change="doneInputParameters"
        ></el-input>
        <div v-if="chooseFile" class="el-text">关键词</div>
        <el-input
          v-if="chooseFile"
          v-model="input4"
          type="textarea"
          :rows="1"
          @change="doneInputParameters"
        ></el-input>
        <div v-if="chooseFile" class="el-text">年份</div>
        <el-input
          v-if="chooseFile"
          v-model="input5"
          type="textarea"
          :rows="1"
          @change="doneInputParameters"
        ></el-input>
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
import {
  paperModifyNote,
  paperGetNote,
  metaModifyData,
  getMetaData,
} from "../net/network";

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
      detailItem: ["标题", "作者", "来源", "摘要", "关键词", "年份"],
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

    const loadMeta = () => {
      getMetaData(
        {
          paperID: this.$store.state.currentPID,
        },
        (res) => {
          if (this.$store.state.prePID != this.$store.state.currentPID) {
            this.input0 = "";
            this.input1 = "";
            this.input2 = "";
            this.input3 = "";
            this.input4 = "";
            this.input5 = "";
          }
          let currentMetaDate = {};
          currentMetaDate = res.data.meta;
          this.$store.commit("writeMetaData", currentMetaDate);
          this.input0 = this.$store.state.metaData["Titile"];
          this.input1 = this.$store.state.metaData["Authors"];
          this.input2 = this.$store.state.metaData["Conference"];
          this.input3 = this.$store.state.metaData["Abstract"];
          this.input4 = this.$store.state.metaData["Keywords"];
          this.input5 = this.$store.state.metaData["Year"];
        }
      );
    };

    this.$store.commit("setLoadMeta", loadMeta);
  },
  methods: {
    doneInputParameters() {
      console.log(this.$store.state.currentPID);
      console.log(this.input0);
      console.log(this.input1);
      console.log(this.input2);
      console.log(this.input3);
      console.log(this.input4);
      console.log(this.input5);
      metaModifyData(
        {
          paperID: this.$store.state.currentPID,
          title: this.input0,
          authors: this.input1,
          conference: this.input2,
          abstract: this.input3,
          Keywords: this.input4,
          year: this.input5,
        },
        (res) => {
          this.input0 = res.data.meta.Titile;
          this.input1 = res.data.meta.Authors;
          this.input2 = res.data.meta.Conference;
          this.input3 = res.data.meta.Abstract;
          this.input4 = res.data.meta.Keywords;
          this.input5 = res.data.meta.Year;
        }
      );
    },
    doneInput() {
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
  input0() {
    console.log("sdfsdafssfsdsg");
    if (this.$store.state.prePID != this.$store.state.currentPID) {
      this.input0 = "";
      this.input1 = "";
      this.input2 = "";
      this.input3 = "";
      this.input4 = "";
      this.input5 = "";
    }
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
