<template>
  <input
    ref="uploadButton"
    type="file"
    hidden
    accept=".pdf,.docx,.pptx,.xlsx"
    @change="uploadFile"
    multiple
  />
  <el-dialog title="导入文件" v-model="uploadDialog">
    <el-form :model="form">
      <el-form-item :label-width="labelWidth">
        <el-button type="primary" @click="mockUploadFile"
          >上传文件<i class="el-icon-upload el-icon--right"></i
        ></el-button>
        <span> 至 </span>
        <el-select
          v-model="importFolderName"
          placeholder="请选择目标文件夹"
          @change="changeImportFolder"
        >
          <el-option
            v-for="(folder, index) in folders"
            :label="folder.folderName"
            :value="index"
            :key="folder.FID"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-dialog>
  <div class="bar-row">
    <div class="el-bar">
      <div class="el-upload__tip">
        <el-button-group>
          <el-button
            icon="el-icon-document-add"
            size="mini"
            @click="
              uploadDialog = true;
              importFolderIndex = 0;
            "
          ></el-button>
          <el-button
            icon="el-icon-document-remove"
            size="mini"
            plain
            :disabled="!choosePaper"
            @click="deletePaper"
          ></el-button>
        </el-button-group>
        文件操作
      </div>
      <div class="el-upload__tip">
        <el-button-group>
          <el-button
            icon="el-icon-folder-add"
            size="mini"
            plain
            @click="newFolder"
          ></el-button>
          <el-button
            icon="el-icon-folder-remove"
            size="mini"
            plain
            :disabled="selectedFolder <= 3"
            @click="deleteFolder"
          ></el-button>
        </el-button-group>
        文件夹操作
      </div>
      <div class="el-upload__tip">
        <el-button-group>
          <el-button
            icon="el-icon-circle-plus-outline"
            size="mini"
            plain
            @click="dialogFormVisible = true"
          ></el-button>
          <el-dialog title="加入共享文件夹" v-model="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="请输入文件夹邀请码">
                <el-input v-model="inputFolder" maxlength="50"></el-input>
                <div v-if="error" class="error">{{ errorInfo }}</div>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="joinSharedFolder"
                  >确 定</el-button
                >
              </span>
            </template>
          </el-dialog>
        </el-button-group>
        加入共享
      </div>
      <div class="el-upload__tip">
        <el-button-group>
          <el-button icon="el-icon-question" size="mini" plain></el-button>
        </el-button-group>
        帮助
      </div>
      <div v-if="tabIndex > 0" class="el-upload__tip">
        <el-button-group>
          <el-button
            icon="el-icon-refresh"
            size="mini"
            plain
            @click="sync"
          ></el-button>
        </el-button-group>
        同步
      </div>
    </div>
    <div style="flex: 1"></div>
    <div class="demo-input-suffix">
      <el-input
        placeholder="   搜索..."
        v-model="searchInput"
        @blur="searchFiles"
        clearable
      >
        <template #prefix>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-search"></i>
              <i class="el-icon-arrow-down"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="this.searchInput += ' 作者：'"
                  >作者</el-dropdown-item
                >
                <el-dropdown-item @click="this.searchInput += ' 标题：'"
                  >标题</el-dropdown-item
                >
                <el-dropdown-item @click="this.searchInput += ' 年份：'"
                  >年份</el-dropdown-item
                >
                <el-dropdown-item @click="this.searchInput += ' 期刊：'"
                  >期刊</el-dropdown-item
                >
                <el-dropdown-item @click="this.searchInput += ' 关键词：'"
                  >关键词</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-input>
    </div>

    <el-dropdown>
      <div class="el-user">
        <i class="el-icon-user-solid"></i>
        {{ username }}
        <i :class="arrow"></i>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="toChangePassword"
            ><i class="el-icon-key"></i>修改密码</el-dropdown-item
          >
          <el-dropdown-item @click="logOut"
            ><i class="el-icon-circle-close"></i>退出登陆</el-dropdown-item
          >
          <el-dropdown-item v-show="adminOrUser" @click="adminIn"
            ><i class="el-icon-user"></i>系统管理</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import {
  deleteFolder,
  getFolderList,
  importPDF,
  adminUserList,
  joinFolder,
  fuzzyQuery,
  getMetaData,
  deletePaper,
  uploadPaper,
} from "../net/network";

import { ref } from "vue";
import { ElMessage } from "element-plus";

export default {
  setup() {
    return {
      inputFolder: ref(""),
    };
  },
  name: "ToolBar",
  data() {
    return {
      error: false,
      errorInfo: "",
      dialogFormVisible: false,
      arrow: "el-icon-arrow-down",
      uploadDialog: false,
      importFolderIndex: 0,
      labelWidth: "120px",
      searchInput: "",
    };
  },
  methods: {
    sync() {
      const tabIdx = this.$store.state.tabIndex;
      const PID = this.$store.state.openedTabs[tabIdx].PID;
      const instance = this.$store.state.pdfInstance;
      const { docViewer, annotManager, CoreControls } = instance;

      const sendData = async () => {
        const loading = this.$loading({
          lock: true,
          text: "正在同步",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        const doc = docViewer.getDocument();
        const xfdfString = await annotManager.exportAnnotations();
        const saveOptions = CoreControls.SaveOptions;
        const options = {
          xfdfString,
          flags: saveOptions.LINEARIZED,
          downloadType: "pdf",
        };
        const data = await doc.getFileData(options);
        const arr = new Uint8Array(data);
        const blob = new Blob([arr], { type: "application/pdf" });
        uploadPaper(
          {
            paperID: PID,
            file: blob,
          },
          (res) => {
            console.log(res);
            loading.close();
          }
        );
      };
      sendData();
    },
    searchFiles() {
      if (this.searchInput.length < 1) {
        this.$store.commit(
          "setSelectedFolder",
          this.$store.state.selectedFolder
        );
      } else {
        fuzzyQuery({ keywords: this.searchInput }, (res) => {
          console.log(res);
          this.$store.commit("setFileTable", []);
          for (let pid of res.data.pids) {
            getMetaData({ paperID: pid }, (res) => {
              this.$store.commit("addFileTableRow", res.data.meta);
            });
          }
        });
      }
    },
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
    joinSharedFolder() {
      console.log("string");
      console.log(this.inputFolder);
      joinFolder({ fuuID: this.inputFolder }, (res) => {
        console.log(res);
        console.log(res.data.status);
        if (res.data.status === 200) {
          console.log("join successfully!");
          ElMessage.success({
            message: "恭喜你，加入共享文件夹成功！（2s后返回主界面）",
            type: "success",
          });
          setTimeout(() => {
            this.$store.commit("changeRouter", 1);
            this.dialogFormVisible = false;
          }, 2000);
        } else if (res.data.status === 201) {
          this.error = true;
          this.errorInfo = "加入失败，您已经在此共享文件夹中了";
        } else if (res.data.status === 202) {
          this.error = true;
          this.errorInfo = "加入失败，您是这个文件夹的主人";
        } else if (res.data.status === 203) {
          this.error = true;
          this.errorInfo = "加入失败，此文件夹已经不被共享或存在";
        }
      });
    },
    addSharedFolder() {},
    mockUploadFile: function () {
      this.$refs.uploadButton.click();
    },
    uploadFile() {
      const loading = this.$loading({
        lock: true,
        text: "正在上传",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const fileObj = this.$refs.uploadButton.files[0];
      const folder = this.$store.state.foldersList[this.importFolderIndex];
      const folderID = folder.FID;

      importPDF(
        {
          folderID,
          file: fileObj,
        },
        (res) => {
          console.log(res);
          this.uploadDialog = false;
          if (res.data.status === 200) {
            this.$store.commit("setSelectedFolder", 2);
            ElMessage.success({
              message: "上传成功！",
              type: "success",
            });
          }
          loading.close();
        }
      );
    },
    logOut() {
      this.$store.commit("changeRouter", 0);
      this.$store.commit("switchLogOrChange", true);
    },
    toChangePassword() {
      this.$store.commit("changeRouter", 0);
      this.$store.commit("switchLogOrChange", false);
    },
    adminIn() {
      this.$store.commit("changeRouter", 2);
      adminUserList((res) => {
        let dictUsersList = [];
        for (let i = 0; i < res.data.user_list.length; i++) {
          dictUsersList.push({
            userID: res.data.user_list[i],
          });
        }
        this.$store.commit("getAllUsers", dictUsersList);
        console.log(dictUsersList);
      });
    },
    newFolder() {
      this.$store.commit("switchOnNewFolder", true);
    },
    deleteFolder() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          const folderIndex = this.$store.state.selectedFolder;
          const folderInfo = this.$store.state.foldersList[folderIndex - 4];
          deleteFolder({ folderID: folderInfo.FID }, (res) => {
            if (res.data.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              getFolderList((res) => {
                if (res.data.status === 200) {
                  this.$store.commit("getAllFolders", res.data.folder_list);
                }
              });
            } else {
              this.$message({
                type: "error",
                message: "删除失败!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    changeImportFolder(e) {
      this.importFolderIndex = e;
    },
  },
  computed: {
    choosePaper() {
      console.log(this.$store.state.choosePaper);
      return this.$store.state.choosePaper;
    },
    username() {
      return this.$store.state.username;
    },
    adminOrUser() {
      return this.$store.state.adminOrUser;
    },
    selectedFolder() {
      return this.$store.state.selectedFolder;
    },
    importFolderName() {
      if (this.importFolderIndex >= 0) {
        return this.$store.state.foldersList[this.importFolderIndex].folderName;
      }
      return "";
    },
    folders() {
      return this.$store.state.foldersList;
    },
    tabIndex() {
      return this.$store.state.tabIndex;
    },
  },
};
</script>


<style>
.el-search {
  margin-right: 10px;
}

.el-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.el-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.el-upload__tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 6px;
}

.demo-input-suffix {
  width: 300px;
  margin-right: 30px;
}

.bar-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
