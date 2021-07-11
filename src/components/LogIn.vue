<template>
  <div class="el-logPage">
    <div class="text">
      <div class="el-text_1">论文通</div>
      <div class="el-text_2">您的一站式论文管理系统</div>
    </div>
    <div class="el-input">
      <el-input
        placeholder="用户名"
        prefix-icon="el-icon-user"
        v-model="input1"
      >
      </el-input>
      <el-input placeholder="密码" prefix-icon="el-icon-lock" v-model="input2">
      </el-input>
    </div>
      <el-row>
        <el-button type="primary">登录</el-button>
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
});
</script>

<style>

.el-logPage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
