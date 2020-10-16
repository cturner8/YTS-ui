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
      <div class="selected-file mt-3">
        Selected file: {{ file ? file.name : "" }}
      </div>
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
          @click.prevent="handleClick"
          :disabled="!file"
          type="button"
          variant="danger"
          >Submit</b-button
        >
        <div class="m-3 feedbackMessage" :class="getErrorClass()">
          {{ feedbackMessage }}
        </div>
      </b-form>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "FileUploader",
  data() {
    return {
      file: null,
      filter: {},
    };
  },
  computed: {
    ...mapState(["error"]),
    feedbackMessage() {
      switch (this.error) {
        case true:
          return "Upload Failed";
        case false:
          return "Upload Successful";
        default:
          return "";
      }
    },
  },
  methods: {
    ...mapActions(["submitFiles"]),
    clearFiles() {
      this.file = null;
    },
    handleClick() {
      const { file, filter } = this;

      this.submitFiles({ file, filter });
    },
    getErrorClass() {
      switch (this.error) {
        case true:
          return "error";
        case false:
          return "success";
        default:
          return;
      }
    },
  },
});
</script>
