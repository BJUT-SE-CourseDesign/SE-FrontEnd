<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    row-key="id"
    border
    highlight-current-row="true"
  >
    <el-table-column>
      <template #header>
        <div class="readPoint"></div>
      </template>
    </el-table-column>
    <el-table-column>
      <template #header>
        <i class="el-icon-document"></i>
      </template>
    </el-table-column>
    <el-table-column prop="authors" label="作者"> </el-table-column>
    <el-table-column prop="title" label="标题"> </el-table-column>
    <el-table-column prop="year" label="年份" sortable> </el-table-column>
    <el-table-column prop="added" label="添加日期"> </el-table-column>
  </el-table>
</template>


<script>
export default {
  name: "PapersContainer",
  components: {},
  data() {
    return {};
  },
};
</script>

<style>
.readPoint {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: gray;
}
</style>
