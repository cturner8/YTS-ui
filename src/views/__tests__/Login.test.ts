import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import { BootstrapVue } from "bootstrap-vue";
import Vuex, { Store } from "vuex";
import sinon from "sinon";

import { auth } from "@/libs/firebase";
import firebase from "firebase/app";

import Login from "../Login.vue";
import store from "@/store";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

const mockSignIn = jest.fn();
const mockSignOut = jest.fn();
const mockAnonymousSignIn = jest.fn();

const mockFirebase = () => {
  sinon.stub(auth);
  sinon.stub(firebase).initializeApp.resolves();

  auth.signInAnonymously = mockAnonymousSignIn;
  auth.signOut = mockSignOut;
  auth.signInWithEmailAndPassword = mockSignIn;
};

const factory = (
  { data = {}, props = {} },
  store: Store<object>,
  fullMount = false
) => {
  const method = fullMount ? mount : shallowMount;

  return method(Login, {
    store,
    localVue,
    data() {
      return {
        ...data,
      };
    },
    propsData: {
      ...props,
    },
  });
};

describe("Login.vue", () => {
  beforeAll(() => {
    jest.resetModules();
    mockFirebase();
  });

  it("renders successfully", () => {
    const wrapper = factory({}, store);
    expect(wrapper.exists()).toBeTruthy();
  });
  it("renders anonymous sign in button", () => {
    const wrapper = factory({}, store);
    const button = wrapper.find(".anon-signin");
    expect(button.exists()).toBeTruthy();
  });
  it("user can sign in annonymously", async () => {
    const input = {};

    const wrapper = factory(input, store, true);
    const button = wrapper.find(".anon-signin");
    await button.trigger("click");
    expect(mockAnonymousSignIn).toBeCalled();
  });
  it("renders main login form", () => {
    const input = {};

    const wrapper = factory(input, store);
    expect(wrapper.find(".signin-form").exists()).toBeTruthy();
  });
  it("user can sign in", async () => {
    const authData = { email: "test@test.com", password: "testPassword123" };
    const input = {
      data: {
        authData,
      },
    };

    const wrapper = factory(input, store, true);
    const form = wrapper.find(".signin-form");
    await form.trigger("submit");
    expect(mockSignIn).toHaveBeenCalled();
    expect(mockSignIn).toHaveBeenCalledWith(authData.email, authData.password);
  });
});
