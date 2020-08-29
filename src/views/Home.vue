<template>
  <div class="main-content home">
    <Tables v-if="!loading" :items="items" />
    <b-jumbotron v-else>
      <b-overlay show rounded="sm">
        <b-card aria-hidden="true"></b-card>
      </b-overlay>
    </b-jumbotron>
  </div>
</template>

<script>
import Tables from "../components/Tables";
import axios from "axios";

export default {
  name: "Home",
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
  async created() {
    this.loading = true;
    await axios
      .get("http://localhost:5000/search")
      .then((res) => (this.items = { ...res.data.items }))
      .catch((err) => console.log(err));
    this.loading = false;
  },
};
</script>
