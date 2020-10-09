import { shallowMount, createLocalVue } from "@vue/test-utils";
import { BootstrapVue } from "bootstrap-vue";

import Header from "../Header.vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const factory = (values = {}, props = {}) => {
  return shallowMount(Header, {
    localVue,
    data() {
      return {
        ...values,
      };
    },
    propsData: {
      ...props,
    },
  });
};

describe("Header.vue", () => {
  it("renders successfully", () => {
    const wrapper = factory();
    expect(wrapper.find(".heading").exists()).toBeTruthy();
  });
});
