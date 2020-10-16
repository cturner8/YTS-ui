import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import { BootstrapVue } from "bootstrap-vue";

import Tables from "../Tables.vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const testItems = {
  channels: {
    channel1: 50,
    channel2: 100
  },
  raw_data: [
    { header: "YouTube", time: "2020-07-22T15:02:06.316Z", title: "Video 1" },
    { header: "YouTube", time: "2020-07-22T15:02:06.316Z", title: "Video 2" },
    { header: "YouTube", time: "2020-07-22T15:02:06.316Z", title: "Video 3" },
  ]
};

const factory = ({ data = {}, props = {}, mocks = {} }, fullMount = false) => {
 const method = fullMount ? mount : shallowMount;
 
  return method(Tables, {
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

describe("Tables.vue", () => {
  it("renders successfully", () => {
    const input = {};
    const wrapper = factory(input);
    expect(wrapper.exists()).toBeTruthy();
  });
  it("renders channels section", () => {
    const input = {
      props: {
        items: {
          channels: testItems.channels
        }
      }
    };
    const wrapper = factory(input);
    const channelsSection = wrapper.find("")
    expect(wrapper.exists()).toBeTruthy();
  });
});
