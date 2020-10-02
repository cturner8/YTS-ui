export type Error = boolean | undefined;

export interface State {
  isLoading: boolean;
  reportData: object;
  file: any;
  filter: object;
  error: boolean | undefined;
}

export default {
  isLoading: false,
  reportData: {},
  file: null,
  filter: {},
  error: undefined,
};
