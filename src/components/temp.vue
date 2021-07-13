<template>
  <div v-contextmenu:contextmenu="{ trigger: 'click' }" class="wrapper">
    <code>左键点击此区域</code>
  </div>

  <div
    v-contextmenu:contextmenu="{ trigger: ['click', 'contextmenu'] }"
    class="wrapper"
  >
    <code>左键或右键点击此区域</code>
  </div>

  <div v-contextmenu:contextmenu="{ trigger: 'dblclick' }" class="wrapper">
    <code>左键双击此区域</code>
  </div>

  <v-contextmenu ref="contextmenu">
    <v-contextmenu-item>菜单</v-contextmenu-item>

    <v-contextmenu-divider />

    <v-contextmenu-group title="按钮组">
      <v-contextmenu-item>菜单1</v-contextmenu-item>
      <v-contextmenu-item>菜单2</v-contextmenu-item>
      <v-contextmenu-item disabled>菜单3</v-contextmenu-item>
    </v-contextmenu-group>
  </v-contextmenu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const {
  directive,
  version,
  Contextmenu,
  ContextmenuItem,
  ContextmenuDivider,
  ContextmenuGroup,
} = VContextmenu;

console.log("VContextmenu version:", version);

export default defineComponent({
  name: "ExampleCustomTrigger",

  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem,
    [ContextmenuDivider.name]: ContextmenuDivider,
    [ContextmenuGroup.name]: ContextmenuGroup,
  },

  directives: {
    contextmenu: directive,
  },
});
</script>

<style scoped lang="less">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 100px;
  border: 3px dashed rgba(90, 167, 164, 0.9);
  border-radius: 8px;
  background-color: rgba(90, 167, 164, 0.2);

  & + & {
    margin-top: 8px;
  }
}
</style>