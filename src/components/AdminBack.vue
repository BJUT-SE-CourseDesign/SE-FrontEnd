<template>
  <el-button
    type="primary"
    icon="el-icon-back"
    size="small"
    @click="backToMainPage"
  >
  </el-button>
</template>

<script>
export default {
  name: "AdminBack",
  data() {
    return {};
  },
  methods: {
    backToMainPage() {
      this.$store.commit("changeRouter", 1);
    },
  },
};
</script>