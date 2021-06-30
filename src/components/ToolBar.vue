<template>
  <el-row>
    <el-button-group>
      <el-button type="success" icon="el-icon-document-add"></el-button>
    </el-button-group>
    <el-button-group>
      <el-button type="success" icon="el-icon-folder-add"></el-button>
      <el-button type="danger" icon="el-icon-folder-remove"></el-button>
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
.el-button {
  margin-right: 10px;
}
</style>
