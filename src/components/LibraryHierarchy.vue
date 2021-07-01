<template>
  <div class="root">
    <div class="el-paper">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false" size="small">展开</el-radio-button>
        <el-radio-button :label="true" size="small">收起</el-radio-button>
      </el-radio-group>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-submenu>
          <template #title>
            <span>论文库</span>
          </template>
        </el-submenu>
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
    <div class="el-filter">
      <el-dropdown>
        <span class="el-dropdown-link">
          过滤器<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>关键词</el-dropdown-item>
            <el-dropdown-item>作者</el-dropdown-item>
            <el-dropdown-item>标记词</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>


<script>
export default {
  name: "LibraryHierarchy",
  components: {},
  data() {
    return {
      isCollapse: true,
    };
  },
};
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
