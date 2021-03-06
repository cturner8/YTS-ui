import axios from "axios";
import { helpers } from "@/libs";
import { auth } from "@/libs/firebase";
import * as Vuex from "vuex";
import { SignInData } from "./state";

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
        const fileData = JSON.parse(reader.result as any);
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
  anonymousSignIn: async () => {
    try {
      await auth.signInAnonymously();
    } catch (e) {
      console.log(e);
    }
  },
  signOut: async () => {
    try {
      await auth.signOut();
    } catch (e) {
      console.log(e);
    }
  },
  signIn: async ({ commit }: Context, { email, password }: SignInData) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      commit("setError", "");
    } catch (e) {
      console.log(e);
      commit("setError", e.message);
    }
  },
  signUp: async (
    { commit }: Context,
    { email, password, displayName }: SignInData
  ) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (displayName) {
        await user?.updateProfile({ displayName });
      }
      commit("setError", "");
    } catch (e) {
      console.log(e);
      commit("setError", e.message);
    }
  },
};
