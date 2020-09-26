import axios from "axios";
import { helpers } from "../libs";
import { auth } from "../libs/firebase";

axios.interceptors.request.use(async (config) => {
  try {
    const token = await auth.currentUser.getIdToken();

    const { headers } = config;
    if (!headers.Authorization) {
      headers.Authorization = token;
    }
    return config;
  } catch (e) {
    console.log(e);
  }
});

const searchData = async (body) => {
  return await axios.post(`${process.env.VUE_APP_DATA_ENDPOINT}`, body);
};

export default {
  searchReportData: async ({ commit }, body) => {
    commit("setRequestProgress", undefined);
    try {
      const { data } = await searchData(body);
      commit("setReportData", data.items);
      commit("setRequestProgress", false);
    } catch (e) {
      console.log(e);
      commit("setRequestProgress", true);
    }
  },
  submitFiles: async ({ commit }, { file, filter }) => {
    commit("setRequestProgress", undefined);

    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = async () => {
      try {
        const fileData = JSON.parse(reader.result);
        const body = {
          fileData,
          ...filter,
        };

        const { data = {} } = await searchData(body);
        const { items = {} } = data;
        items.channels = helpers.sortItems(items.channels);

        commit("setReportData", items);
        commit("setRequestProgress", false);
      } catch (e) {
        console.log("could not parse file");
        commit("setRequestProgress", true);
      }
    };
  },
};
