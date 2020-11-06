<template>
  <div>
    <div>
      <b-container>
        <div class="d-flex justify-content-center">
          <b-card title="Fast login" :class="cardStyle">
            <b-button
              class="anon-signin"
              variant="danger"
              @click="anonymousSignIn"
              >Login anonymously</b-button
            >
          </b-card>
          <b-card :title="title" :class="cardStyle">
            <b-form class="signin-form" novalidate>
              <b-form-group
                v-if="!isLoggingIn"
                class="display-name py-3"
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
                class="py-3"
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
                class="py-3"
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
          </b-card>
        </div>
        <b-alert v-if="message" class="mt-3" variant="danger" show>{{
          message
        }}</b-alert>
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";

interface IData {
  authData: object;
  isLoggingIn: boolean;
  cardStyle: string;
}

export default Vue.extend({
  name: "Login",
  data(): IData {
    return {
      authData: {},
      isLoggingIn: true,
      cardStyle: "text-center w-50",
    };
  },
  computed: {
    ...mapState(["message"]),
    title() {
      if (this.isLoggingIn) {
        return "Already have an account? Login here...";
      } else {
        return "Signup here...";
      }
    },
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
