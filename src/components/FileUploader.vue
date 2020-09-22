<template>
  <div class="file-uploader flex-container column">
    <b-container class="upload-file">
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
      </div>
      <div class="selected-file mt-3">Selected file: {{ file ? file.name : "" }}</div>
    </b-container>
    <b-container class="filter-form mt-3">
      <b-form>
        <b-form-group label="Title:" label-for="title">
          <b-form-input id="title" v-model="filter.title" type="text" />
        </b-form-group>

        <b-form-group label="Date From:" label-for="dateFrom">
          <b-form-input id="dateFrom" v-model="filter.dateFrom" type="text" />
        </b-form-group>

        <b-form-group label="Date To:" label-for="dateTo">
          <b-form-input id="dateTo" v-model="filter.dateTo" type="text" />
        </b-form-group>

        <b-button
          @click.prevent="submitFiles({file, filter})"
          :disabled="!file"
          type="button"
          variant="danger"
        >Submit</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FileUploader",
  data() {
    return {
      file: null,
      filter: {}
    };
  },
  methods: {
    ...mapActions(["submitFiles"]),
    clearFiles() {
      this.file = null;
    }
  }
};
</script>
