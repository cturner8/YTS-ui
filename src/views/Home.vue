<template>
  <div class="main-content home">
    <Tables v-if="!loading" :items="items" />
    <b-container v-else fluid>
      <b-spinner variant="danger"></b-spinner>
    </b-container>
  </div>
</template>

<script>
import { Tables } from "../components";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Tables
  },
  data() {
    return {
      loading: false,
      items: {
        youtube_count: 0,
        youtube_music_count: 0,
        channels: [],
        raw_data: []
      }
    };
  },
  methods: {
    async searchData(body) {
      this.loading = true;
      await axios
        .post("http://localhost:5000/search", body)
        .then(res => (this.items = { ...res.data.items }))
        .catch(err => console.log(err));
      this.loading = false;
    }
  },
  async created() {
    await this.searchData({
      title: "rolex",
      dateTo: "",
      dateFrom: ""
    });
  }
};
</script>
