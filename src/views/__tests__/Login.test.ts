import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import { BootstrapVue } from "bootstrap-vue";
import Vuex from "vuex";
import sinon from "sinon";

import { auth } from "@/libs/firebase";
import firebase from "firebase/app";

import Login from "../Login.vue";
import actions from "@/store/actions";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

const mockSignIn = jest.fn();
const mockSignOut = jest.fn();
const mockAnonymousSignIn = jest.fn();
const mockCreateUser = jest.fn(
  () =>
    ({
      user: {
        email: "test@test.com",
        uid: "test",
        updateProfile: mockUpdateProfile,
      },
    } as any)
);
const mockUpdateProfile = jest.fn();

const mockFirebase = () => {
  sinon.stub(auth);
  sinon.stub(firebase).initializeApp.resolves();

  auth.signInAnonymously = mockAnonymousSignIn;
  auth.signOut = mockSignOut;
  auth.signInWithEmailAndPassword = mockSignIn;
  auth.createUserWithEmailAndPassword = mockCreateUser;
};

const factory = ({ data = {}, props = {} }, fullMount = false) => {
  const method = fullMount ? mount : shallowMount;
  const store = new Vuex.Store({ actions });

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
    const wrapper = factory({});
    expect(wrapper.exists()).toBeTruthy();
  });
  it("renders anonymous sign in button", () => {
    const wrapper = factory({});
    const button = wrapper.find(".anon-signin");
    expect(button.exists()).toBeTruthy();
  });
  it("user can sign in annonymously", async () => {
    const input = {};

    const wrapper = factory(input, true);
    const button = wrapper.find(".anon-signin");
    await button.trigger("click");
    expect(mockAnonymousSignIn).toBeCalled();
  });
  it("renders main login form", () => {
    const input = {};

    const wrapper = factory(input);
    expect(wrapper.find(".signin-form").exists()).toBeTruthy();
  });
  it("user can sign in", async () => {
    const authData = { email: "test@test.com", password: "testPassword123" };
    const input = {
      data: {
        authData,
      },
    };

    const wrapper = factory(input, true);
    expect(wrapper.vm.$data.isLoggingIn).toBe(true);
    const button = wrapper.find(".submit-button");
    await button.trigger("click");
    expect(mockSignIn).toHaveBeenCalled();
    expect(mockSignIn).toHaveBeenCalledWith(authData.email, authData.password);
  });
  it("user can sign up", async () => {
    const authData = {
      email: "test@test.com",
      password: "testPassword123",
      displayName: "test",
    };
    const input = {
      data: {
        authData,
      },
    };

    const wrapper = factory(input, true);
    const toggleButton = wrapper.find(".toggle-button");
    await toggleButton.trigger("click");
    expect(wrapper.vm.$data.isLoggingIn).toBe(false);
    const displayName = wrapper.find(".display-name");
    expect(displayName.exists()).toBeTruthy();
    const submitButton = wrapper.find(".submit-button");
    await submitButton.trigger("click");
    expect(mockCreateUser).toHaveBeenCalled();
    expect(mockCreateUser).toHaveBeenCalledWith(
      authData.email,
      authData.password
    );
    expect(mockUpdateProfile).toHaveBeenCalled();
    expect(mockUpdateProfile).toHaveBeenCalledWith({
      displayName: authData.displayName,
    });
  });
});
