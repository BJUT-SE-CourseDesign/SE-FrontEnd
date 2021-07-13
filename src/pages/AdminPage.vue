<template>
  <MemberList />
  <SystemSet />
</template>


<script>
import MemberList from "../components/MemberList.vue";
import SystemSet from "../components/SystemSet.vue";

export default {
  name: "MainPage",
  components: {
    MemberList,
    SystemSet,
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