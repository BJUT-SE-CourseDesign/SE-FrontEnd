<template>
  <div class="admin">
    <AdminMemberList />
    <div class="button-group">
      <AdminSystemSet />
      <AdminBack />
    </div>
  </div>
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
.admin {
  width: 99vw;
  height: 98vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.button-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 120px;
}
</style>