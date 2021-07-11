<template>
  <div class="el-change">
    <div class="text">修改密码</div>
    <div class="el-input_passward">
      <el-input
        placeholder="旧密码"
        prefix-icon="el-icon-lock"
        v-model="input1"
      >
      </el-input>
      <el-input
        placeholder="新密码"
        prefix-icon="el-icon-lock"
        v-model="input2"
      >
        <div></div>
      </el-input>
      <el-input
        placeholder="重复密码"
        prefix-icon="el-icon-lock"
        v-model="input3"
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
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return {
      input1: ref(""),
      input2: ref(""),
      input3: ref(""),
    };
  },
});
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

.el-input_passward {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5vh;
}
</style>
