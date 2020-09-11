<template>
  <div class="upload-file">
    <b-container>
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
        <b-button :disabled="!file" @click="submitFiles" class="mr-2" variant="success">Submit</b-button>
      </div>
      <div class="selected-file mt-3">Selected file: {{ file ? file.name : '' }}</div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Upload",
  data() {
    return {
      file: null
    };
  },
  methods: {
    clearFiles() {
      this.file = null;
    },
    async submitFiles() {
      this.loading = true;
      const reader = new FileReader();

      reader.readAsText(this.file);
      reader.onload = async () => {
        try {
          const fileData = JSON.parse(reader.result);
          const body = {
            fileData,
            title: "rolex"
          };

          await axios
            .post("http://localhost:5000/search", body)
            .then(() => console.log("success"))
            .catch(err => console.log(err));
        } catch (e) {
          console.log("could not parse file");
        }
      };
      this.loading = false;
    }
  }
};
</script>