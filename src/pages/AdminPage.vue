<template>
  <AdminMemberList />
  <AdminSystemSet />
  <AdminBack />
</template>

<script>
import AdminMemberList from "../components/AdminMemberList.vue";
import AdminSystemSet from "../components/AdminSystemSet.vue";
import AdminBack from "../components/AdminBack.vue";

export default {
  name: "MainPage",
  components: {
    AdminMemberList,
    AdminSystemSet,
    AdminBack,
  },
  data() {
    return {};
  },
  computed: {
    tabIndex() {
      return this.$store.state.tabIndex;
    },
  },
};
</script>

<style scoped>
</style>