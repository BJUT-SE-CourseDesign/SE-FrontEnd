<template>
  <v-contextmenu ref="contextmenu">
    <v-contextmenu-item>菜单1</v-contextmenu-item>
    <v-contextmenu-item>菜单2</v-contextmenu-item>
    <v-contextmenu-item>菜单3</v-contextmenu-item>
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
    >
      <el-table-column prop="ifRead" width="30">
        <template #header>
          <div class="readPoint"></div>
        </template>
        <template #default="scope">
          <div
            :class="scope.row.ifRead ? 'haveReadPoint' : 'haveNotRead'"
          ></div>
        </template>
      </el-table-column>
      <el-table-column prop="fileType" width="60">
        <template #header>
          <i class="el-icon-document"></i>
        </template>
        <template #default="scope">
          <el-image
            style="width: 30px; height: 30px"
            :src="scope.row.fileType"
            :fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="year" label="年份" sortable> </el-table-column>
      <el-table-column prop="addedDate" label="添加日期"> </el-table-column>
    </el-table>
  </div>
</template>


<script>
import { shareFolder, unshareFolder, getFolderList } from "../net/network";
import { ElMessage } from "element-plus";

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
  data() {},
  methods: {
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
    tableData() {
      let fileTables = this.$store.state.fileTables;
      return fileTables;
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
      console.log(data.foldersList[index - 4]);
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

.haveReadPoint {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: greenyellow;
}

.haveNotRead {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: gray;
}

.paper-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 1%;
}

.folder-bar {
  margin: 10px;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
