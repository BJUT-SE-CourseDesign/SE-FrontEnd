<template>
  <MemberList />
</template>


<script>
import MemberList from "../components/MemberList.vue";

export default {
  name: "MainPage",
  components: {
    MemberList,
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