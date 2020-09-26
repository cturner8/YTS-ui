<template>
  <div id="app">
    <Header id="nav" :signIn="signIn" :user="user" />
    <b-overlay :show="isLoading" spinner-variant="danger" :opacity="1" fluid>
      <router-view />
    </b-overlay>
  </div>
</template>

<script>
import { Header } from "./components";
import { mapState } from "vuex";

import { auth } from "./libs/firebase";

export default {
  name: "App",
  components: {
    Header
  },
  data() {
    return {
      user: null
    };
  },
  async mounted() {
    const authUser = await auth.currentUser;

    if (authUser) {
      this.user = authUser;
    }
  },
  computed: {
    ...mapState(["isLoading"])
  },
  methods: {
    async signIn() {
      try {
        await auth.signInAnonymously();

        await auth.onAuthStateChanged(user => {
          if (user) {
            this.user = user;
          } else {
            this.user = null;
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
