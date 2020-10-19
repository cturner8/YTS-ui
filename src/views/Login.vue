<template>
  <div>
    <div>
      <b-button class="anon-signin" @click="anonymousSignIn"
        >Login anonymously</b-button
      >
    </div>

    <div>
      <b-container fluid="md">
        <b-row align-h="center">
          <b-form class="signin-form" novalidate @submit.prevent="handleSignIn">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="authData.email"
                type="email"
                required
              />
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Password:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="authData.password"
                type="password"
                required
              />
            </b-form-group>

            <b-button class="mx-2 submit-button" type="submit" variant="danger"
              >Submit</b-button
            >
            <b-button class="mx-2" type="reset" variant="outline-danger"
              >Signup</b-button
            >
          </b-form>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

interface IData {
  authData: object;
}

export default Vue.extend({
  name: "Login",
  data(): IData {
    return {
      authData: {},
    };
  },
  methods: {
    ...mapActions(["anonymousSignIn", "signIn"]),
    handleSignIn() {
      this.signIn(this.authData);
    },
  },
});
</script>
