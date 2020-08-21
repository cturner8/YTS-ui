<template>
  <div class="header">
    <b-navbar variant="dark" type="dark">
      <b-navbar-brand>
        <img src="../assets/youtube.svg" class="img-fluid" alt loading="lazy" />
        YouTube Data Analysis
      </b-navbar-brand>
      <b-nav-text>
        <span v-if="has_filters">
          <strong>Filters:</strong>
          <span v-for="[key, value] in Object.entries(filter)" :key="key">
            {{ key }} [
            <strong>{{ value }}</strong>
            ]
          </span>
        </span>
        <b-navbar-item class="ml-auto" v-else right>Gain insight into your YouTube data</b-navbar-item>
      </b-nav-text>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      has_filters: false,
      filter: {},
      name: "Cameron"
    };
  }
};
</script>
