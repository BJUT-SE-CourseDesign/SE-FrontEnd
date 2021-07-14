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
          >上传<i class="el-icon-upload el-icon--right"></i
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
  <el-row>
    <div class="el-bar">
      <div class="el-upload__tip">
        <el-button-group>
          <el-button
            type="success"
            icon="el-icon-document-add"
            size="small"
            @click="
              uploadDialog = true;
              importFolderIndex = 0;
            "
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-document-remove"
            size="small"
            disabled
          ></el-button>
        </el-button-group>
        文件操作
      </div>
      <div class="el-upload__tip">
        <el-button-group>
          <el-button
            type="success"
            icon="el-icon-folder-add"
            size="small"
            @click="newFolder"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-folder-remove"
            size="small"
            :disabled="selectedFolder <= 3"
            @click="deleteFolder"
          ></el-button>
        </el-button-group>
        文件夹操作
      </div>
      <div class="el-upload__tip">
        <el-button-group>
          <el-button
            type="success"
            icon="el-icon-refresh"
            size="small"
          ></el-button>
        </el-button-group>
        同步
      </div>
      <div class="el-upload__tip">
        <el-button-group>
          <el-button
            type="info"
            icon="el-icon-question"
            size="small"
          ></el-button>
        </el-button-group>
        帮助
      </div>
    </div>
    <div style="flex: 1"></div>
    <div class="el-search">
      <div class="demo-input-suffix">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="input2"
        >
        </el-input>
      </div>
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
  </el-row>
</template>

<script>
import { deleteFolder, getFolderList, importPDF } from "../net/network";

export default {
  name: "ToolBar",
  data() {
    return {
      arrow: "el-icon-arrow-down",
      uploadDialog: false,
      importFolderIndex: 0,
      labelWidth: "120px",
    };
  },
  methods: {
    mockUploadFile: function () {
      this.$refs.uploadButton.click();
    },
    uploadFile() {
      this.uploadDialog = false;
      const fileObj = this.$refs.uploadButton.files[0];
      let fileName = fileObj.name.split(".");
      const fileType = fileName[fileName.length - 1];
      fileName = fileName.slice(0, fileName.length - 1).join("");
      this.$store.commit("addFileObj", { fileObj, fileName, fileType });
      const folder = this.$store.state.foldersList[this.importFolderIndex];
      const folderID = folder.FID;
      importPDF(
        {
          folderID,
          file: fileObj,
        },
        (res) => {
          console.log(res);
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
</style>
