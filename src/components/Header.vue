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
        <b-nav-text class="ml-auto" v-else right>Gain insight into your YouTube data</b-nav-text>
      </b-nav-text>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/" right>Home</b-nav-item>
        <b-nav-item to="/reports" right>Reports</b-nav-item>
        <b-nav-item to="/about" right>About</b-nav-item>
        <b-nav-item to="/upload" right>Upload</b-nav-item>
      </b-navbar-nav>
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
