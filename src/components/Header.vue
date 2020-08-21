<template>
  <div class="header">
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand">
        <img src="../assets/youtube.svg" class="img-fluid" alt loading="lazy" />
        YouTube Data Analysis
      </a>
      <span class="navbar-text">
        <span v-if="has_filters">
          <strong>Filters:</strong>
          <span v-for="[key, value] in Object.entries(filter)" :key="key">
            {{ key }} [
            <strong>{{ value }}</strong>
            ]
          </span>
        </span>
        <a href="/upload" id="test" v-else
          >Gain insight into your YouTube data</a
        >
      </span>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      has_filters: false,
      filter: {},
      name: "Cameron",
    };
  },
};
</script>
