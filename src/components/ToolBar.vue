<template>
  <input
    ref="uploadButton"
    type="file"
    hidden
    accept=".pdf"
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
            @click="addFile"
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
    <div class="el-user">
      天鹤
      <i class="el-icon-user-solid"></i>
    </div>
  </el-row>
</template>

<script>
export default {
  name: "ToolBar",
  methods: {
    addFile: function () {
      this.$refs.uploadButton.click();
    },
    uploadFile(event) {
      console.log(event);
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
