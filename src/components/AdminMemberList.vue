<template>
  <el-table :data="tableData" style="width: 50%">
    <el-table-column label="用户名称" prop="userID"> </el-table-column>
    <el-table-column label="密码" prop="password"> </el-table-column>
    <el-table-column label="修改密码" prop="editPassword">
      <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
        ><i class="el-icon-edit"></i>
      </el-button>
    </el-table-column>
    <el-table-column label="删除用户" prop="deleteUser"
      ><el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
        ><i class="el-icon-delete"></i> </el-button
    ></el-table-column>
    <el-table-column label="查看文件夹" type="expand" width="120vh">
    </el-table-column>
  </el-table>
</template>

<style>
/* .el-table__expand-column .cell {
  display: none;
} */
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          userID: "12987122",
          password: "好滋weqweqwe",
        },
      ],
    };
  },
  methods: {
    
  }

};
</script>