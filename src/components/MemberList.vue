<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="姓名" width="100vh">
      <template #default="scope">
        <i class="el-icon-user"></i>
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="password" label="密码" width="120vh">
    </el-table-column>
    <el-table-column label="修改密码" width="100vh">
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          ><i class="el-icon-edit"></i
        ></el-button>
      </template>
    </el-table-column>
    <el-table-column label="删除用户" width="100vh">
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          ><i class="el-icon-delete"></i
        ></el-button>
      </template>
    </el-table-column>
    <el-table-column label="查看文件夹" width="100vh">
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          ><i class="el-icon-folder-opened"></i
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          password: "cyqsb",
          name: "吴天鹤",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          password: "I am sb",
          name: "陈宇卿",
          address: "上海市普陀区金沙江路 1517 弄",
        },
      ],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style>
</style>
