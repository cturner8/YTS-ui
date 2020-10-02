import axios from "axios";
import { helpers } from "../libs";
import { auth } from "../libs/firebase";
import * as Vuex from "vuex";

type Context = Vuex.ActionContext<object, any>;

axios.interceptors.request.use(async (config: any) => {
  try {
    const { currentUser } = auth;
    if (!currentUser) throw "not logged in";

    const token = await currentUser.getIdToken();

    const { headers } = config;
    if (!headers.Authorization) {
      headers.Authorization = token;
    }
    return config;
  } catch (e) {
    console.log(e);
  }
});

const searchData = async (body: object) => {
  return await axios.post(`${process.env.VUE_APP_DATA_ENDPOINT}`, body);
};

export default {
  searchReportData: async ({ commit }: Context, body: object) => {
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
  submitFiles: async (
    { commit }: Context,
    { file, filter }: { file: Blob; filter: object }
  ) => {
    commit("setRequestProgress", undefined);

    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = async () => {
      try {
        const fileData = reader.result;
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
        console.log(e);
        commit("setRequestProgress", true);
      }
    };
  },
};
