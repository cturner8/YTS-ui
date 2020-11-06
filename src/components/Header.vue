<template>
  <div class="header">
    <b-navbar variant="dark" type="dark">
      <b-navbar-brand class="heading">
        <img src="../assets/youtube.svg" class="img-fluid" alt loading="lazy" />
        YouTube Data Analysis
      </b-navbar-brand>
      <b-nav-text>
        <b-nav-text v-if="displayName" class="ml-auto user-text" right
          >Welcome back {{ displayName }}!</b-nav-text
        >
        <b-nav-text v-else class="ml-auto" right
          >Gain insight into your YouTube data</b-nav-text
        >
      </b-nav-text>
      <b-navbar-nav v-if="user" class="ml-auto">
        <b-nav-item
          v-for="item in navItems"
          :key="item.text"
          :to="item.path"
          right
        >
          {{ item.text }}
        </b-nav-item>
        <b-button @click="signOut" class="logout">Logout</b-button>
      </b-navbar-nav>
      <b-navbar-nav v-else class="ml-auto">
        <b-button to="/login" class="login">Login</b-button>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Header",
  props: ["user", "signIn", "signOut"],
  data() {
    return {
      navItems: [
        { text: "Home", path: "/" },
        { text: "Upload", path: "/upload" },
        { text: "Reports", path: "/reports" },
        { text: "About", path: "/about" },
      ],
    };
  },
  computed: {
    displayName() {
      let displayName = "";
      if (!this.user) return displayName;

      if (this.user.displayName) {
        displayName = this.user.displayName;
      }

      return displayName;
    },
  },
});
</script>
