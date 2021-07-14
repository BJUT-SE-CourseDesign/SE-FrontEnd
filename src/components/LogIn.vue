<template>
  <div class="login-part">
    <div class="text">
      <div class="title">论文通</div>
      <div class="subtitle">您的一站式论文管理系统</div>
    </div>
    <div class="input-div">
      <el-input
        placeholder="用户名"
        prefix-icon="el-icon-user"
        v-model="username"
      >
      </el-input>
      <el-input
        placeholder="密码"
        prefix-icon="el-icon-lock"
        v-model="password"
        show-password
      >
      </el-input>
      <div v-if="error" class="error">{{ failWords }}</div>
      <div v-if="registerFlag" class="success">注册成功！</div>
    </div>
    <el-row>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button type="primary" @click="register">注册</el-button>
    </el-row>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import {
  userLogin,
  userRegister,
  getFolderList,
  userIsAdmin,
} from "../net/network";

export default defineComponent({
  setup() {
    return {
      username: ref(""),
      password: ref(""),
    };
  },
  data() {
    return {
      error: false,
      registerFlag: false,
      failWords: "",
    };
  },
  methods: {
    login() {
      userLogin(
        {
          username: this.username,
          password: this.password,
        },
        (res) => {
          if (res.data.status === 200) {
            this.$store.commit("changeRouter", 1);
            this.$store.commit("changeUsername", this.username);
            userIsAdmin((res) => {
              console.log(res);
              if (res.data.status === 200 && res.data.flag === true) {
                this.$store.commit("logInAdmin", true);
              } else {
                this.$store.commit("logInAdmin", false);
              }
              getFolderList((res) => {
                if (res.data.status === 200) {
                  this.$store.commit("getAllFolders", res.data.folder_list);
                }
              });
            });
          } else {
            this.error = true;
            this.registerFlag = false;
            this.failWords = "账号或密码错误！";
          }
        }
      );
    },
    register() {
      userRegister(
        {
          username: this.username,
          password: this.password,
        },
        (res) => {
          if (res.data.status === 200) {
            this.error = false;
            this.registerFlag = true;
          } else {
            this.error = true;
            this.registerFlag = false;
            this.failWords = "该账号已存在！";
          }
        }
      );
    },
  },
});
</script>

<style>
.login-part {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-part .title {
  font-size: 80px;
  font-family: STKaiti;
  font-weight: bold;
  letter-spacing: 12px;
  margin: 0 20px 20px 0;
  text-align: left;
}

.login-part .subtitle {
  margin: 0 20px 20px 20px;
  text-align: right;
  width: 100%;
  font-size: 20px;
}

.el-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
}

.input-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 0 50px 0;
}

.text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
