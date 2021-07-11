<template>
  <div class="root">
    <div class="el-paper hierarchy">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <h3>论文库</h3>
        <el-menu-item index="2">
          <i class="el-icon-takeaway-box"></i>
          <template #title>所有文档</template>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-star-off"></i>
          <template #title>收藏夹</template>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-timer"></i>
          <template #title>最近添加</template>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-user"></i>
          <template #title>用户自定义</template>
        </el-menu-item>
      </el-menu>
    </div>

    <el-select v-model="filterValue" @change="changeFilterValue">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>


<script>
export default {
  name: "LibraryHierarchy",
  components: {},
  data() {
    return {
      options: this.$store.getters.allFilterValues,
    };
  },
  computed: {
    filterValue() {
      return this.$store.getters.filterValue.label;
    },
  },
  methods: {
    changeFilterValue(index) {
      this.$store.commit("changeFilterValue", index);
    },
  },
};
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hierarchy {
  width: 100%;
}
</style>
