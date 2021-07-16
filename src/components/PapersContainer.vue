<template>
  <v-contextmenu ref="contextmenu">
    <v-contextmenu-submenu title="移动至">
      <v-contextmenu-item
        v-for="folder in allFolders"
        :key="folder"
        @click="movepdf(folder)"
        >{{ folder.folderName }}</v-contextmenu-item
      >
    </v-contextmenu-submenu>
    <v-contextmenu-item @click="deletePaper">删除文献</v-contextmenu-item>
  </v-contextmenu>

  <div class="paper-container" style="flex: 1">
    <div class="folder-bar">
      <div style="margin-right: 30px">{{ folderName }}</div>
      <el-switch
        v-if="folderName !== '所有文档' && folderName !== '最近添加'"
        v-model="folderShared"
        active-text="共享"
        inactive-text="私有"
        @click="changePublic"
        style="margin-right: 30px"
      >
      </el-switch>
      <el-button
        v-if="folderShared"
        type="success"
        style="height: 30px"
        @click="getShareCode"
        >获取共享码<i class="el-icon-cloudy el-icon--right"></i
      ></el-button>
    </div>
    <el-table
      :data="tableData"
      row-key="id"
      border
      highlight-current-row="true"
      height="100%"
      max-height="100%"
      style="width: 100%"
      v-contextmenu:contextmenu
      @cell-dblclick="doubleClickRow"
      @cell-click="signalClickRow"
      @cell-mouse-enter="hoverRow"
    >
      <el-table-column prop="Type" width="60">
        <template #header>
          <i class="el-icon-document"></i>
        </template>
        <template #default="scope">
          <el-image
            style="width: 30px; height: 30px"
            :src="getIcon(scope.row.Type)"
            :fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="Authors" label="作者"> </el-table-column>
      <el-table-column prop="Title" label="标题"> </el-table-column>
      <el-table-column prop="Conference" label="期刊/会议"> </el-table-column>
      <el-table-column prop="Year" label="年份" sortable> </el-table-column>
      <el-table-column prop="addedDate" label="添加日期" sortable>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import {
  shareFolder,
  unshareFolder,
  getFolderList,
  downloadLatestPaper,
  movePDF,
  deletePaper,
  getMetaData,
} from "../net/network";
import { ElMessage } from "element-plus";

const pdfIcon = require("../assets/pdf_icon.png");
const docxIcon = require("../assets/docx_icon.png");
const pptxIcon = require("../assets/pptx_icon.png");
const xlsxIcon = require("../assets/xlsx_icon.png");

function copyToClip(content) {
  let aux = document.createElement("input");
  aux.setAttribute("value", content);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  ElMessage.success({
    message: "共享码已复制剪贴板",
    type: "success",
  });
}

export default {
  name: "PapersContainer",
  components: {},
  created() {
    this.$store.commit("setSelectedFolder", 2);
  },
  data() {
    return {
      prePID: 0,
    };
  },
  methods: {
    deletePaper() {
      deletePaper({ paperID: this.$store.state.currentPID }, (res) => {
        console.log(res.status);
        this.$store.commit(
          "setSelectedFolder",
          this.$store.state.selectedFolder
        );
        ElMessage.success({
          message: "删除成功",
          type: "success",
        });
      });
    },
    signalClickRow(row) {
      this.$store.commit("changeChoosePaper", true);
      this.$store.commit("changeCurrentPID", row.PID);
      let currentMetaDate = {};
      if (this.$store.state.prePID != row.PID) {
        this.$store.state.prePID = row.PID;
      }
      getMetaData(
        {
          paperID: row.PID,
        },
        (res) => {
          currentMetaDate = res.data.meta;
          this.$store.commit("writeMetaData", currentMetaDate);
        }
      );

      const loadMeta = this.$store.state.loadMeta;
      if (loadMeta) loadMeta();
    },
    hoverRow(row) {
      this.currentHover = row;
    },
    movepdf(folder) {
      console.log(folder);
      movePDF(
        { newFolderID: folder.FID, paperID: this.currentHover.PID },
        (res) => {
          console.log(res);
        }
      );
    },
    doubleClickRow(row) {
      console.log(row);
      downloadLatestPaper({ paperID: row.PID }, (res) => {
        console.log(res);
        this.$store.commit("addTab", {
          url: res.data.address,
          title: row.Title,
          PID: row.PID,
        });
      });
    },
    getIcon(type) {
      switch (type) {
        case "pdf":
        case "blob":
          return pdfIcon;
        case "docx":
          return docxIcon;
        case "pptx":
          return pptxIcon;
        case "xlsx":
          return xlsxIcon;

        default:
          break;
      }
    },
    changePublic() {
      const data = this.$store.state;
      const index = data.selectedFolder;
      const folder = data.foldersList[index - 4];
      const callback = (res) => {
        if (res.data.status === 200) {
          getFolderList((res) => {
            if (res.data.status === 200) {
              this.$store.commit("getAllFolders", res.data.folder_list);
              this.$message({
                type: "success",
                message: "操作成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: "操作失败!",
              });
            }
          });
        }
      };
      if (index > 3) {
        let shared = folder.shared;
        if (shared) {
          unshareFolder({ folderID: folder.FID }, callback);
        } else {
          shareFolder({ folderID: folder.FID }, callback);
        }
      }
    },
    getShareCode() {
      const data = this.$store.state;
      const index = data.selectedFolder;
      const folder = data.foldersList[index - 4];
      shareFolder({ folderID: folder.FID }, (res) => {
        copyToClip(res.data.FUUID);
      });
      return 0;
    },
  },
  computed: {
    allFolders() {
      return this.$store.state.foldersList;
    },
    tableData() {
      return this.$store.state.fileTables;
    },
    folderName() {
      const data = this.$store.state;
      const index = data.selectedFolder;
      let folderName = "";
      if (index === 2) {
        folderName = "所有文档";
      } else if (index === 3) {
        folderName = "最近添加";
      } else {
        folderName = data.foldersList[index - 4].folderName;
      }
      return folderName;
    },
    folderShared() {
      const data = this.$store.state;
      const index = data.selectedFolder;
      let shared = false;
      if (index === 2) {
        shared = false;
      } else if (index === 3) {
        shared = false;
      } else {
        shared = data.foldersList[index - 4].shared;
      }
      return shared === 1 ? true : false;
    },
  },
};
</script>

<style>
.readPoint {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: gray;
}

.paper-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 1%;
  height: 100%;
}

.folder-bar {
  margin: 10px;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
