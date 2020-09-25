export default {
  setLoading: (state, payload) => {
    state.isLoading = payload;
  },
  setReportData: (state, payload) => {
    state.reportData = { ...payload };
  },
  setFileData: (state, payload) => {
    state.file = payload;
  },
  setFilter: (state, payload) => {
    state.filter = payload;
  },
  setRequestProgress: (state, payload) => {
    if (state.isLoading) {
      state.isLoading = false;
    } else {
      state.isLoading = true;
    }

    state.error = payload;
  },
};
