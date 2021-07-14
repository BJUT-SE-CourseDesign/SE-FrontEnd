<template>
  <el-table :data="tableData" style="width: 50%">
    <el-table-column label="用户名称" prop="id"> </el-table-column>
    <el-table-column label="密码" prop="name"> </el-table-column>
    <el-table-column label="修改密码" prop="desc">
      <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
        ><i class="el-icon-edit"></i>
      </el-button>
    </el-table-column>
    <el-table-column label="删除用户" prop="name"
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
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
      ],
    };
  },
};
</script>