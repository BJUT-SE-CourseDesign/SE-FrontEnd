<template>
  <div class="header">
    <el-page-header @back="backToMainPage" content="系统设置"> </el-page-header>
  </div>

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

  <el-table
    :data="this.$store.state.usersList"
    style="width: 80%; overflow: auto"
    @expand-change="fetchFolders"
  >
    <el-table-column label="用户名称" prop="userID"> </el-table-column>
    <el-table-column label="修改密码" prop="editPassword">
      <template #default="scope">
        <el-button
          @click="recordPassword(scope.$index, this.$store.state.usersList)"
          ><i class="el-icon-edit"></i
        ></el-button>
      </template>
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
    <el-table-column label="查看文件夹" type="expand" width="120px">
      <template #default="scope">
        <el-table :data="currentExpandedFolders[scope.row.userID]">
          <el-table-column label="文件夹ID" prop="FID"> </el-table-column>
          <el-table-column label="文件夹名" prop="folderName">
          </el-table-column>
          <el-table-column label="是否为拥有者" prop="own"> </el-table-column>
        </el-table>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
.el-title {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
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

.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0 0 40px 120px;
}
</style>

<script>
import {
  adminFolderList,
  adminDeleteUser,
  adminModifyUserPassword,
} from "../net/network";

import { ref } from "vue";
import { ElMessage } from "element-plus";

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
      currentExpandedFolders: {},
    };
  },
  methods: {
    backToMainPage() {
      this.$store.commit("changeRouter", 1);
    },
    fetchFolders(row) {
      adminFolderList({ username: row.userID }, (res) => {
        console.log(res.data.folder_list);
        this.currentExpandedFolders[row.userID] = res.data.folder_list;
        let tempExpandFolders = this.currentExpandedFolders[row.userID];
        for (let i = 0; i < tempExpandFolders.length; i++) {
          console.log(i);
          console.log(tempExpandFolders[i].own);
          if (tempExpandFolders[i].own == true) {
            tempExpandFolders[i].own = "是";
          } else {
            tempExpandFolders[i].own = "否";
          }
        }
        this.currentExpandedFolders[row.userID] = tempExpandFolders;
      });
    },
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
              ElMessage.success({
                message: "修改成功！",
                type: "success",
              });
            }
          }
        );
      console.log(rows);
      console.log(index);
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