import axios from "axios";
const searchData = async (body) => {
  return await axios
    .post(`${process.env.VUE_APP_DATA_ENDPOINT}`, body)
    .then((res) => res.data.items)
    .catch((err) => console.log(err));
};

export default {
  searchReportData: async ({ commit }, body) => {
    commit("setLoading", true);
    const payload = await searchData(body);
    commit("setReportData", payload);

    commit("setLoading", false);
  },
  submitFiles: async ({ commit }, file) => {
    commit("setLoading", true);

    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = async () => {
      try {
        const fileData = JSON.parse(reader.result);
        const body = {
          fileData,
          title: "rolex",
        };

        const payload = await searchData(body);
        commit("setReportData", payload);
      } catch (e) {
        console.log("could not parse file");
      }
    };

    commit("setLoading", false);
  },
};
