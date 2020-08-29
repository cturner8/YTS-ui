<template>
  <div class="table-container">
    <b-container fluid>
      <b-row>
        <b-col class="contentDivs" v-if="items.channels">
          <h2>Most popular channels</h2>
          <b-list-group>
            <b-list-group-item v-for="[key, value] in Object.entries(items.channels)" :key="key">
              <span class="leftAlign">{{ key }}</span>
              <span class="rightAlign">
                <strong>{{ value }}</strong>
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col class="contentDivs" v-if="items.raw_data">
          <h2>Videos watched</h2>
          <b-list-group v-for="(item, index) in items.raw_data" :key="index">
            <b-list-group-item v-if="item.subtitles">
              <span class="leftAlign">{{ item.title }}</span>
              <span class="rightAlign">
                <strong>{{ item.subtitles[0].name }}</strong>
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Tables",
  props: {
    items: Object
  },
  data() {
    return {};
  }
};
</script>