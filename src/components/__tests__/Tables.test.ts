import { mount, createLocalVue } from "@vue/test-utils";
import { BootstrapVue } from "bootstrap-vue";

import Tables from "../Tables.vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const testItems = {
  channels: {
    channel1: 50,
    channel2: 100,
  },
  raw_data: [
    {
      header: "YouTube",
      time: "2020-07-22T15:02:06.316Z",
      title: "Video 1",
      subtitles: [
        {
          name: "Test Channel 1",
        },
      ],
    },
    {
      header: "YouTube",
      time: "2020-07-22T15:02:06.316Z",
      title: "Video 2",
      subtitles: [
        {
          name: "Test Channel 2",
        },
      ],
    },
    {
      header: "YouTube",
      time: "2020-07-22T15:02:06.316Z",
      title: "Video 3",
      subtitles: [
        {
          name: "Test Channel 1",
        },
      ],
    },
  ],
};

const factory = ({ data = {}, props = {}, mocks = {} }) => {
  const method = mount;

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
      ...mocks,
    },
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
          channels: testItems.channels,
        },
      },
    };
    const wrapper = factory(input);
    const channelsSection = wrapper.find(".channels");
    expect(channelsSection.exists()).toBeTruthy();
    const listItems = wrapper.findAll(".list-group-item");
    expect(listItems.length).toBe(Object.keys(testItems.channels).length);
  });
  it("renders raw data section", () => {
    const input = {
      props: {
        items: {
          raw_data: testItems.raw_data,
        },
      },
    };
    const wrapper = factory(input);
    const dataSection = wrapper.find(".raw-data");
    expect(dataSection.exists()).toBeTruthy();
    const listItems = wrapper.findAll(".list-group-item");
    expect(listItems.length).toBe(testItems.raw_data.length);
  });
});
