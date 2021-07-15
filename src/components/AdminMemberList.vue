<template>
  <el-table :data="this.$store.state.usersList" style="width: 50%">
    <el-table-column label="用户名称" prop="userID"> </el-table-column>
    <el-table-column label="修改密码" prop="editPassword">
      <el-button
        @click="recordPassword(scope.$index, this.$store.state.usersList)"
        ><i class="el-icon-edit"></i
      ></el-button>
      <el-dialog title="修改密码" v-model="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="新密码">
            <el-input
              maxlength="10"
              v-model="inputPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="passwordEdit(userindexTemp, userDataTemp)"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-table-column>
    <el-table-column label="删除用户">
      <template #default="scope">
        <el-button
          @click.prevent="deleteRow(scope.$index, this.$store.state.usersList)"
          type="text"
          size="big"
        >
          <i class="el-icon-delete"></i>
        </el-button>
      </template>
    </el-table-column>
    <el-table-column label="查看文件夹" type="expand" width="120vh">
      <el-button
        @click="displayFolders(scope.$index, this.$store.state.usersList)"
        >获取文件夹</el-button
      >
      <el-table :data="this.$store.state.userFolder">
        <el-table-column label="文件夹名" prop="userFolderName">
        </el-table-column>
        <el-table-column label="是否被拥有" prop="userOwn"> </el-table-column>
      </el-table>
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
import {
  adminFolderList,
  adminDeleteUser,
  adminModifyUserPassword,
} from "../net/network";

import { ref } from "vue";

export default {
  setup() {
    return {
      inputPassword: ref(""),
    };
  },
  data() {
    return {
      userNameTemp: "",
      userindexTemp: "",
      userDataTemp: "",
      dialogFormVisible: false,
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
    };
  },
  methods: {
    recordPassword(index, rows) {
      console.log("recording");
      console.log(index);
      this.dialogFormVisible = true;
      this.userindexTemp = index;
      this.userDataTemp = rows;
    },
    passwordEdit(index, rows) {
      console.log("modify password ing");
      console.log(index);
      (this.dialogFormVisible = false),
        adminModifyUserPassword(
          {
            username: rows[index]["userID"],
            newPassword: this.inputPassword,
          },
          (res) => {
            console.log("modify password");
            if (res.data.result === true) {
              console.log("sucessfully");
            }
          }
        );
      console.log(rows);
      console.log(index);
    },
    displayFolders(index, rows) {
      console.log("check folder ing!!");
      console.log(rows[index]["userID"]);
      adminFolderList({ username: rows[index]["userID"] }, (res) => {
        this.$store.commit("displayUserFolder", res.data.folder_list);
      });
    },
    deleteRow(index, rows) {
      console.log(rows[index]["userID"]);
      this.$confirm(
        `此操作将永久删除该用户${rows[index]["userID"]}, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          rows.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      adminDeleteUser({ username: rows[index]["userID"] }, (res) => {
        if (res.data.result === true) {
          console.log("sucessfully");
        }
      });
    },
  },
};
</script>