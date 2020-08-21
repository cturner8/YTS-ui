<template>
  <div class="home">
    <Header />
    <b-row>
      <b-col class="contentDivs" v-if="ytData.channels">
        <h2>Most popular channels</h2>
        <b-list-group>
          <b-list-group-item v-for="[key, value] in Object.entries(ytData.channels)" :key="key">
            <span class="leftAlign">{{ key }}</span>
            <span class="rightAlign">
              <strong>{{ value }}</strong>
            </span>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col class="contentDivs" v-if="ytData.raw_data">
        <h2>Videos watched</h2>
        <b-list-group v-for="(item, index) in ytData.raw_data" :key="index">
          <b-list-group-item v-if="item.subtitles">
            <span class="leftAlign">{{ item.title }}</span>
            <span class="rightAlign">
              <strong>{{ item.subtitles[0].name }}</strong>
            </span>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Header from "../components/Header";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Header
  },
  data() {
    return {
      ytData: {
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
      .then(res => (this.ytData = { ...res.data.items }))
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

.leftDiv {
  height: calc(100% - 7rem);
  overflow-y: scroll;
}

.rightDiv {
  height: calc(100% - 7rem);
  overflow-y: scroll;
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
