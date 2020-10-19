export type Error = boolean | undefined;
export type User = firebase.User | null;

export interface SignInData {
  email: string;
  password: string;
}

export interface State {
  isLoading: boolean;
  reportData: object;
  file: any;
  filter: object;
  error: Error;
  user: User;
}

export default {
  isLoading: false,
  reportData: {},
  file: null,
  filter: {},
  error: undefined,
  user: null,
};
