<template>
  <div class="el-change">
    <div class="text">修改密码</div>
    <div class="el-input_password">
      <el-input
        placeholder="旧密码"
        prefix-icon="el-icon-lock"
        v-model="oldPassword"
        show-password
        style="margin-bottom: 2vh"
      >
      </el-input>
      <el-input
        placeholder="新密码"
        prefix-icon="el-icon-lock"
        v-model="newPassword0"
        show-password
        style="margin-bottom: 2vh"
      >
      </el-input>
      <el-input
        placeholder="确认密码"
        prefix-icon="el-icon-lock"
        v-model="newPassword1"
        show-password
      >
      </el-input>
      <div v-if="error" class="error">{{ errorInfo }}</div>
    </div>
    <el-row>
      <el-button type="primary" @click="changePassword">确定</el-button>
      <el-button type="primary" @click="returnMain">取消</el-button>
    </el-row>
  </div>
</template>

<script>
import { ref } from "vue";
import { modifyPassword } from "../net/network";
import { ElMessage } from "element-plus";

export default {
  setup() {
    return {
      oldPassword: ref(""),
      newPassword0: ref(""),
      newPassword1: ref(""),
    };
  },
  data() {
    return {
      error: false,
      errorInfo: "",
    };
  },
  methods: {
    returnMain() {
      this.$store.commit("changeRouter", 1);
    },
    changePassword() {
      if (this.newPassword0 !== this.newPassword1) {
        this.error = true;
        this.errorInfo = "两遍密码不一致！";
      } else {
        modifyPassword(
          {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword0,
          },
          (res) => {
            console.log(res);
            if (res.data.status === 202) {
              this.error = true;
              this.errorInfo = "原密码错误！";
            } else if (res.data.status === 201) {
              this.error = true;
              this.errorInfo = "新密码不能和老密码相同！";
            } else {
              ElMessage.success({
                message: "恭喜你，修改成功！（2s后返回主界面）",
                type: "success",
              });
              setTimeout(() => {
                this.$store.commit("changeRouter", 1);
                this.$store.commit("switchLogOrChange", false);
              }, 2000);
            }
          }
        );
      }
    },
  },
};
</script>

<style>
.text {
  font-family: STXingkai;
  font-size: 4vh;
  margin-bottom: 5vh;
}

.el-change {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-input_password {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5vh;
}

.error {
  color: red;
}
</style>
