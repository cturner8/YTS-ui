<template>
  <div class="main-content center upload">
    <h1>Upload data</h1>
    <div class="divider-bottom"></div>
    <FileUploader />
  </div>
</template>

<script>
import { FileUploader } from "../components";

export default {
  name: "Upload",
  components: {
    FileUploader
  }
};
</script>