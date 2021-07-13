<template>
  <div id="Webviewer">
    <WebViewer
      :loadPDF="
        (instance) => {
          loadPDFReader(instance);
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
    loadPDFReader(instance) {
      this.$store.commit("setPDFInstance", instance);
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
