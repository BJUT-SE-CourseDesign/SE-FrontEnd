<template>
  <div class="login-page">
    <div class="decorate">
      <el-image class="random-image" :src="url" :fit="fit"></el-image>
    </div>
    <LogIn v-if="logOrChange" />
    <ChangePassword v-else />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import LogIn from "../components/LogIn.vue";
import ChangePassword from "../components/ChangePassword.vue";

export default defineComponent({
  components: {
    LogIn,
    ChangePassword,
  },
  data() {
    const timeSeed = new Date().getTime();
    let url = `https://picsum.photos/seed/${timeSeed}/536/354`;
    return {
      url,
    };
  },
  computed: {
    logOrChange() {
      return this.$store.state.logOrChange;
    },
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

.random-image {
  border-radius: 8px;
  box-shadow: 0 13px 27px -5px hsl(240deg 30% 28% / 25%),
    0 8px 16px -8px hsl(0deg 0% 0% / 30%), 0 -6px 16px -6px hsl(0deg 0% 0% / 3%);
}

.decorate {
  margin-right: 60px;
}
</style>
