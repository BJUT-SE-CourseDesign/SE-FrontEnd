<template>
  <v-contextmenu ref="contextmenu">
    <v-contextmenu-item>菜单1</v-contextmenu-item>
    <v-contextmenu-item>菜单2</v-contextmenu-item>
    <v-contextmenu-item>菜单3</v-contextmenu-item>
  </v-contextmenu>

  <el-table
    :data="tableData"
    style="width: 100%"
    row-key="id"
    border
    highlight-current-row="true"
    height="100%"
    max-height="100%"
    v-contextmenu:contextmenu
  >
    <el-table-column prop="ifRead" width="30">
      <template #header>
        <div class="readPoint"></div>
      </template>
      <template #default="scope">
        <div :class="scope.row.ifRead ? 'haveReadPoint' : 'haveNotRead'"></div>
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
</template>


<script>
export default {
  name: "PapersContainer",
  components: {},
  data() {
    return {};
  },
  computed: {
    tableData() {
      let fileTables = this.$store.state.fileTables;
      return fileTables;
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
</style>
