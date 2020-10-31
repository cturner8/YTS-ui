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
          <b-form class="signin-form" novalidate>
            <b-form-group
              v-if="!isLoggingIn"
              class="display-name"
              id="input-group-3"
              label="Display name:"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                v-model="authData.displayName"
                type="text"
                required
              />
            </b-form-group>
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

            <b-button
              class="mx-2 submit-button"
              @click="handleSubmit"
              type="button"
              variant="danger"
              >Submit</b-button
            >
            <b-button
              class="mx-2 toggle-button"
              @click="handleToggle"
              variant="outline-danger"
              >{{ isLoggingIn ? "Signup" : "Login" }}</b-button
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
  isLoggingIn: boolean;
}

export default Vue.extend({
  name: "Login",
  data(): IData {
    return {
      authData: {},
      isLoggingIn: true,
    };
  },
  methods: {
    ...mapActions(["anonymousSignIn", "signIn", "signUp"]),
    handleSubmit() {
      if (this.isLoggingIn) {
        this.signIn(this.authData);
      } else {
        this.signUp(this.authData);
      }
    },
    handleToggle() {
      this.isLoggingIn = !this.isLoggingIn;
    },
  },
});
</script>
