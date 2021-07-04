<template>
  <div id="Webviewer">
    <WebViewer
      initialDoc="https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf"
    />
  </div>
</template>


<script>
import WebViewer from "./WebViewer.vue";
export default {
  name: "PaperReader",
  components: {
    WebViewer,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
#Webviewer {
  width: 100%;
  height: 100%;
}
</style>
