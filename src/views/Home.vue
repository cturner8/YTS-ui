<template>
  <div class="home">
    <Tables :items="items" />
  </div>
</template>

<script>
import Tables from "../components/Tables";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Tables
  },
  data() {
    return {
      items: {
        youtube_count: 0,
        youtube_music_count: 0,
        channels: [],
        raw_data: []
      }
    };
  },
  created() {
    axios
      .get("http://localhost:5000/search")
      .then(res => (this.items = { ...res.data.items }))
      .catch(err => console.log(err));
  }
};
</script>

<style>
.home {
  height: 100vh;
}

.mainContent {
  height: 100%;
}

.rightDiv,
.leftDiv {
  height: calc(100% - 7rem);
  width: 50%;
  overflow-y: scroll;
  max-height: 100vh;
}

.contentDivs {
  height: calc(100% - 7rem);
  overflow-y: scroll;
}

.leftAlign {
  float: left;
}

.rightAlign {
  float: right;
}
</style>
