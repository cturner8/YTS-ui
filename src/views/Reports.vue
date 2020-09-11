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
  name: "Reports",
  components: {
    Tables,
  },
  data() {
    return {
      loading: false,
      items: {
        youtube_count: 0,
        youtube_music_count: 0,
        channels: [],
        raw_data: [],
      },
    };
  },
  methods: {
    async searchData(body) {
      this.loading = true;
      await axios
        .post(`${process.env.VUE_APP_DATA_ENDPOINT}/search`, body)
        .then((res) => (this.items = { ...res.data.items }))
        .catch((err) => console.log(err));
      this.loading = false;
    },
  },
  async created() {
    console.log(process.env);
    await this.searchData({
      title: "rolex",
      dateTo: "",
      dateFrom: "",
    });
  },
};
</script>
