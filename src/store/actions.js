import axios from "axios";
const searchData = async (body) => {
  return await axios.post(`${process.env.VUE_APP_DATA_ENDPOINT}`, body);
};

export default {
  searchReportData: async ({ commit }, body) => {
    commit("setLoading", true);
    commit("setError", undefined);
    try {
      const { data } = await searchData(body);
      commit("setReportData", data.items);
      commit("setError", false);
    } catch (e) {
      console.log(e);
      commit("setError", true);
    }

    commit("setLoading", false);
  },
  submitFiles: async ({ commit }, { file, filter }) => {
    commit("setLoading", true);
    commit("setError", undefined);

    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = async () => {
      try {
        const fileData = JSON.parse(reader.result);
        const body = {
          fileData,
          ...filter,
        };

        const { data } = await searchData(body);
        commit("setError", false);
        commit("setReportData", data.items);
      } catch (e) {
        console.log("could not parse file");
        commit("setError", true);
      }
    };

    commit("setLoading", false);
  },
};
