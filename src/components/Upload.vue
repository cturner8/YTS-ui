<template>
  <div class="upload-file">
    <b-container v-if="!isLoading">
      <b-form-file
        class="file-selector"
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        accept=".json"
      ></b-form-file>
      <div class="upload-buttons">
        <b-button @click="clearFiles" class="mr-2">Clear file</b-button>
        <b-button
          :disabled="!file"
          @click="submitFiles(file)"
          class="mr-2"
          variant="success"
          >Submit</b-button
        >
      </div>
      <div class="selected-file mt-3">
        Selected file: {{ file ? file.name : "" }}
      </div>
    </b-container>
    <b-container v-else fluid>
      <b-spinner variant="danger" />
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Upload",
  data() {
    return {
      file: null,
    };
  },
  computed: {
    ...mapState(["isLoading"]),
  },
  methods: {
    ...mapActions(["searchReportData", "submitFiles"]),
    clearFiles() {
      this.file = null;
    },
  },
};
</script>
