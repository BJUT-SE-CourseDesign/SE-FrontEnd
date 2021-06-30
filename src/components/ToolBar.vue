<template>
  <el-row>
    <el-button-group>
      <el-button type="success" icon="el-icon-document-add"></el-button>
      <el-button
        type="danger"
        icon="el-icon-document-remove"
        disabled
      ></el-button>
      <div class="el-upload__tip">文件操作</div>
    </el-button-group>
    <el-button-group>
      <el-button type="success" icon="el-icon-folder-add"></el-button>
      <el-button
        type="danger"
        icon="el-icon-folder-remove"
        disabled
      ></el-button>
      <div class="el-upload__tip">文件夹操作</div>
    </el-button-group>
    <el-button-group>
      <el-button type="success" icon="el-icon-refresh"></el-button>
      <div class="el-upload__tip">同步</div>
    </el-button-group>
    <el-button-group>
      <el-button type="info" icon="el-icon-question"></el-button>
      <div class="el-upload__tip">帮助</div>
    </el-button-group>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleClick() {
      alert("button click");
    },
  },
};
</script>


<style>
.el-button-group {
  margin-right: 10px;
}
</style>
