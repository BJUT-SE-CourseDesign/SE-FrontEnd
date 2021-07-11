<template>
  <div id="webviewer" ref="viewer"></div>
</template>

<script>
import { ref, onMounted } from "vue";
import WebViewer from "@pdftron/webviewer";
export default {
  name: "WebViewer",
  props: { initialDoc: { type: String }, loadPDF: { type: Function } },
  setup(props) {
    const viewer = ref(null);
    onMounted(() => {
      const path = `${process.env.BASE_URL}webviewer`;
      WebViewer({ path }, viewer.value).then((instance) => {
        props.loadPDF(instance);
      });
    });
    return {
      viewer,
    };
  },
};
</script>

<style>
#webviewer {
  width: 100%;
  height: 100%;
}
</style>