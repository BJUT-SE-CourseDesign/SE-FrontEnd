<template>
  <LoginPage v-if="router === 0" />
  <MainPage v-else />
</template>


<script>
import MainPage from "./pages/MainPage.vue";
import LoginPage from "./pages/LoginPage.vue";

export default {
  name: "App",
  components: {
    MainPage,
    LoginPage,
  },
  data() {
    return {};
  },
  computed: {
    router() {
      return this.$store.state.pageRouter;
    },
  },
};
</script>

<style scoped>
</style>