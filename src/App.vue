<template>
  <LoginPage v-if="router === 0" />
  <MainPage v-else-if="router === 1" />
  <AdminPage v-else-if="router === 2" />
</template>


<script>
import MainPage from "./pages/MainPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import AdminPage from "./pages/AdminPage.vue";

export default {
  name: "App",
  components: {
    MainPage,
    LoginPage,
    AdminPage,
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