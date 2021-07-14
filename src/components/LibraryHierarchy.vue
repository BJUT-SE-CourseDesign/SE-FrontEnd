<template>
  <div class="root">
    <div class="el-paper hierarchy">
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
          <i class="el-icon-folder"></i>
          <template #title
            ><span :ref="`folder${idx + 4}Span`">{{ folder.folderName }}</span>
            <input
              :id="folder.FID"
              v-model="folder.folderName"
              placeholder="请输入内容"
              :ref="`folder${idx + 4}Input`"
              class="newFolderInput"
              style="display: none"
              onfocus="this.select()"
              @blur="getNewFolderName"
            />
          </template>
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
import { addFolder, getFolderList, folderRename } from "../net/network";

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
      currentFolderName: "",
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
      } else {
        const currentFolderIndex = this.$store.state.selectedFolder;
        this.$store.commit(
          "setSelectedFolder",
          parseInt(currentFolderIndex) - 1
        );
      }
      this.$store.commit("switchOnNewFolder", false);
      this.newFolderName = "未命名文件夹";
    },
    handleOpenFolder(e) {
      const refSpan = `folder${e}Span`;
      const refInput = `folder${e}Input`;
      if (parseInt(e) === this.$store.state.selectedFolder) {
        this.$refs[refSpan].style.display = "none";
        this.$refs[refInput].style.display = "inline";
        this.$refs[refInput].focus();
        this.currentFolderName = this.$refs[refInput].value;
      }
      this.$store.commit("setSelectedFolder", parseInt(e));
    },
    getNewFolderName(e) {
      const idx = this.$store.state.selectedFolder;
      const refSpan = `folder${idx}Span`;
      const refInput = `folder${idx}Input`;
      const newName = e.target.value;
      const fid = e.target.id;
      if (newName.length >= 0 && newName !== this.currentFolderName) {
        folderRename({ folderID: fid, newFolderName: newName }, (res) => {
          if (res.data.status === 200) {
            getFolderList((res) => {
              if (res.data.status === 200) {
                this.$store.commit("getAllFolders", res.data.folder_list);
                this.$message({
                  type: "success",
                  message: "重命名成功!",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "重命名失败!",
                });
              }
            });
          }
        });
      }
      this.currentFolderName = "";
      this.$refs[refSpan].style.display = "inline";
      this.$refs[refInput].style.display = "none";
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
