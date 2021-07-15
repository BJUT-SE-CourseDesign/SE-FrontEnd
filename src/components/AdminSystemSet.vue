<template>
  <el-button type="primary" @click="table = true" style="margin-right: 80px"
    >修改系统设置</el-button
  >
  <el-drawer title="系统设置" v-model="table" direction="rtl" size="22%">
    <el-table :data="gridData">
      <el-table-column
        property="parametersName"
        label="参数名"
        width="120vh"
      ></el-table-column>
      <el-table-column
        property="parametersValue"
        label="参数值"
        width="120vh"
      ></el-table-column>
    </el-table>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      table: false,
      dialog: false,
      loading: false,
      gridData: [
        {
          parametersName: "2016-05-02",
          parametersValue: "王小虎",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "80px",
      timer: null,
    };
  },
};
</script>

<style>
</style>
