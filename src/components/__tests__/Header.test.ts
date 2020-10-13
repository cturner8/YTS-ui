import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import { BootstrapVue } from "bootstrap-vue";

import Header from "../Header.vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const testUser = {
  displayName: "cturner",
  email: "cturner@test.com",
  phoneNumber: "+441111111111",
  uid: "75oZtbawx7Typ3A88ErHocNvFnG3",
  isAnonymous: false,
  emailVerified: true
};

const factory = ({ data = {}, props = {}, mocks = {} }, fullMount = false) => {
 const method = fullMount ? mount : shallowMount;
 
  return method(Header, {
    localVue,
    data() {
      return {
        ...data,
      };
    },
    propsData: {
      ...props,
    },
    mocks: {
      ...mocks
    }
  });
};

describe("Header.vue", () => {
  it("renders successfully", () => {
    const wrapper = factory({});
    expect(wrapper.exists()).toBeTruthy();
  });
  it("renders login button", () => {
    const wrapper = factory({});
    expect(wrapper.find(".login").exists()).toBeTruthy();
    expect(wrapper.find(".logout").exists()).toBeFalsy();
  });
  it("renders logout button", () => {
    const input = { 
      props: { 
        user: testUser 
      } 
    };
    const wrapper = factory(input);
    expect(wrapper.find(".login").exists()).toBeFalsy();
    expect(wrapper.find(".logout").exists()).toBeTruthy();
  });
  it("calls login function on click", async () => {
    const signIn = jest.fn();
    const input = {
        props: {
          signIn
      }
    };

    const wrapper = factory(input, true);
    const button = wrapper.find(".login");
    await button.trigger("click");
    expect(signIn).toBeCalled();
  });
  it("calls logout function on click", async () => {
    const signOut = jest.fn();
    const input = {
        props: {
          user: testUser,
          signOut
      }
    };

    const wrapper = factory(input, true);
    const button = wrapper.find(".logout");
    await button.trigger("click");
    expect(signOut).toBeCalled();
  });
});