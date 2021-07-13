<template>
  <div class="el-change">
    <div class="text">修改密码</div>
    <div class="el-input_password">
      <el-input
        placeholder="旧密码"
        prefix-icon="el-icon-lock"
        v-model="input1"
        show-password
        style="margin-bottom: 2vh"
      >
      </el-input>
      <el-input
        placeholder="新密码"
        prefix-icon="el-icon-lock"
        v-model="input2"
        show-password
        style="margin-bottom: 2vh"
      >
      </el-input>
      <el-input
        placeholder="确认密码"
        prefix-icon="el-icon-lock"
        v-model="input3"
        show-password
      >
      </el-input>
    </div>
    <el-row>
      <el-button type="primary">确定</el-button>
      <el-button type="primary">取消</el-button>
    </el-row>
  </div>
</template>

<script>
import {ref } from "vue";

export default {
  setup() {
    return {
      input1: ref(""),
      input2: ref(""),
      input3: ref(""),
    };
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
</style>
