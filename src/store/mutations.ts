import { State, Error, User } from "./state";

export default {
  setLoading: (state: State, payload: boolean) => {
    state.isLoading = payload;
  },
  setReportData: (state: State, payload: object) => {
    state.reportData = { ...payload };
  },
  setFileData: (state: State, payload: any) => {
    state.file = payload;
  },
  setFilter: (state: State, payload: object) => {
    state.filter = payload;
  },
  setRequestProgress: (state: State, payload: Error) => {
    if (state.isLoading) {
      state.isLoading = false;
    } else {
      state.isLoading = true;
    }

    state.error = payload;
  },
  setAuthUser: (state: State, user: User) => {
    state.user = user;
  },
};
