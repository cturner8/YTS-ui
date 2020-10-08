<template>
  <div class="main-content center upload">
    <h1>Upload data</h1>
    <div class="divider-bottom"></div>
    <FileUploader />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FileUploader } from "@/components";

export default Vue.extend({
  name: "Upload",
  components: {
    FileUploader,
  },
});
</script>
