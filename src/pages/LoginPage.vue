<template>
  <div class="login-page">
    <div class="decorate">
      <el-image class="random-image" :src="url" :fit="fit"></el-image>
    </div>
    <LogIn />
  </div>
</template>

<script>
import { defineComponent } from "vue";
// import ChangePassward from "../components/ChangePassword.vue";
import LogIn from "../components/LogIn.vue";

export default defineComponent({
  components: {
    // ChangePassward,
    LogIn,
  },
  data() {
    const timeSeed = new Date().getTime();
    let url = `https://picsum.photos/seed/${timeSeed}/536/354`;
    return {
      url,
    };
  },
});
</script>

<style>
.login-page {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translateX(-50%) translateY(-30%);
}

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

.random-image {
  border-radius: 8px;
  box-shadow: 0 13px 27px -5px hsl(240deg 30% 28% / 25%),
    0 8px 16px -8px hsl(0deg 0% 0% / 30%), 0 -6px 16px -6px hsl(0deg 0% 0% / 3%);
}

.decorate {
  margin-right: 60px;
}
</style>
