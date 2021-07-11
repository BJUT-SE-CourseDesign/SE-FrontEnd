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
        v-model="input1"
      >
      </el-input>
      <el-input
        placeholder="密码"
        prefix-icon="el-icon-lock"
        v-model="input2"
        show-password
      >
      </el-input>
    </div>
    <el-row>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button type="primary">注册</el-button>
    </el-row>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return {
      input1: ref(""),
      input2: ref(""),
    };
  },
  methods: {
    login() {
      this.$store.commit("changeRouter", 1);
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
</style>
