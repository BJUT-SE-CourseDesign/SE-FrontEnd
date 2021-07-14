<template>
  <v-contextmenu ref="contextmenu" @show="hi">
    <v-contextmenu-item>重命名文件夹</v-contextmenu-item>
    <v-contextmenu-item @click="hi">删除文件夹</v-contextmenu-item>
    <v-contextmenu-item>菜单3</v-contextmenu-item>
  </v-contextmenu>

  <div class="root">
    <div class="el-paper hierarchy" v-contextmenu:contextmenu>
      <el-menu
        :default-active="selectedFolder + ''"
        class="el-menu-vertical-demo"
        @select="handleOpenFolder"
      >
        <h3>论文库</h3>
        <el-menu-item index="2">
          <i class="el-icon-takeaway-box"></i>
          <template #title>所有文档</template>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-timer"></i>
          <template #title>最近添加</template>
        </el-menu-item>
        <el-menu-item
          v-for="(folder, idx) in allFolders"
          :key="folder.FID"
          :index="idx + 4"
        >
          <i class="el-icon-user"></i>
          <template #title>{{ folder.folderName }}</template>
        </el-menu-item>
        <el-menu-item :index="allFolders.length + 4 + ''">
          <input
            v-show="onNewFolder"
            v-model="newFolderName"
            placeholder="请输入内容"
            @blur="newFolderBlur"
            @focus="focusNewFolderInput"
            ref="newFolderInput"
            class="newFolderInput"
          />
          <div v-show="!onNewFolder" @click="newFolder">新建文件夹...</div>
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
import { addFolder, getFolderList } from "../net/network";

export default {
  name: "LibraryHierarchy",
  components: {},
  created() {
    this.$store.commit("setOnNewFolderCallBack", () => {
      this.$refs.newFolderInput.focus();
    });
  },
  data() {
    return {
      options: this.$store.getters.allFilterValues,
      newFolderName: "未命名文件夹",
    };
  },
  computed: {
    filterValue() {
      return this.$store.getters.filterValue.label;
    },
    allFolders() {
      return this.$store.state.foldersList;
    },
    onNewFolder() {
      return this.$store.state.onNewFolder;
    },
    selectedFolder() {
      return this.$store.state.selectedFolder;
    },
  },
  methods: {
    changeFilterValue(index) {
      this.$store.commit("changeFilterValue", index);
    },
    newFolder() {
      this.$store.commit("switchOnNewFolder", true);
    },
    newFolderBlur() {
      if (
        this.newFolderName !== "未命名文件夹" &&
        this.newFolderName.length > 0
      ) {
        addFolder(
          {
            folderName: this.newFolderName,
            shared: false,
          },
          (res) => {
            if (res.data.status === 200) {
              getFolderList((res) => {
                if (res.data.status === 200) {
                  this.$store.commit("getAllFolders", res.data.folder_list);
                }
              });
            }
          }
        );
      }
      this.$store.commit("switchOnNewFolder", false);
      this.newFolderName = "未命名文件夹";
    },
    focusNewFolderInput() {
      this.$refs.newFolderInput.select();
    },
    handleOpenFolder(e) {
      this.$store.commit("setSelectedFolder", parseInt(e));
    },
    hi(e) {
      console.log(e);
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

.newFolderInput {
  border-width: 0;
  height: 30px;
}
</style>
