<template>
  <div id="Webviewer">
    <WebViewer
      :loadPDF="
        (instance) => {
          loadPDF(instance);
        }
      "
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
  methods: {
    loadPDF(instance) {
      const tabIndex = this.$store.state.tabIndex;
      const file = this.$store.state.fileObjs[tabIndex];
      instance.loadDocument(file, { filename: file.name });
      const { docViewer } = instance;
      docViewer.on("documentLoaded", () => {
        // perform document operations
      });
      console.log("pdf loaded");
    },
  },
};
</script>

<style scoped>
#Webviewer {
  width: 100%;
  height: 100%;
}
</style>
