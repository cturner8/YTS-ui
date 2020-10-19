import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import { BootstrapVue } from "bootstrap-vue";
import Vuex, { Store, ActionTree } from "vuex";

import Login from "../Login.vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

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

describe("Header.vue", () => {
  let actions: ActionTree<object, object>;
  let store: Store<object>;

  beforeEach(() => {
    actions = {
      anonymousSignIn: jest.fn(),
      signIn: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  afterEach(() => {
    actions = {};
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
    expect(actions.anonymousSignIn).toBeCalled();
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
    expect(actions.signIn).toHaveBeenCalled();
    // expect(actions.signIn).toHaveBeenCalledWith(authData);
  });
});
