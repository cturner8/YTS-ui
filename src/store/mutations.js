export default {
  setLoading: (state, loading) => {
    state.isLoading = loading;
  },
  setReportData: (state, items) => {
    state.reportData = { ...items };
  },
};
