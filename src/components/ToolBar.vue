<template>
  <input
    ref="uploadButton"
    type="file"
    hidden
    accept=".pdf,.docx,.pptx,.xlsx"
    @change="uploadFile"
    multiple
  />
  <el-row>
    <div class="el-bar">
      <div class="el-upload__tip">
        <el-button-group>
          <el-button
            type="success"
            icon="el-icon-document-add"
            size="small"
            @click="mockUploadFile"
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
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-folder-remove"
            size="small"
            disabled
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

      <el-button
        type="success"
        icon="el-icon-eleme"
        size="big"
        @click="apiTest"
      ></el-button>
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
            ><i class="el-icon-circle-close"></i>账号注销</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-row>
</template>

<script>
export default {
  name: "ToolBar",
  data() {
    return {
      arrow: "el-icon-arrow-down",
    };
  },
  methods: {
    mockUploadFile: function () {
      this.$refs.uploadButton.click();
    },
    uploadFile() {
      const fileObj = this.$refs.uploadButton.files[0];
      let fileName = fileObj.name.split(".");
      const fileType = fileName[fileName.length - 1];
      fileName = fileName.slice(0, fileName.length - 1).join("");
      this.$store.commit("addFileObj", { fileObj, fileName, fileType });
    },
    apiTest() {
      console.log("api test start");
    },
    logOut() {
      this.$store.commit("changeRouter", 0);
      this.$store.commit("switchLogOrChange", true);
    },
    toChangePassword() {
      this.$store.commit("changeRouter", 0);
      this.$store.commit("switchLogOrChange", false);
    },
  },
  computed: {
    username() {
      return this.$store.state.username;
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
