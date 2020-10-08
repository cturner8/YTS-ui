const sortItems = (input: any = {}) => {
  let returnData: any = {};

  Object.keys(input)
    .sort((a, b) => input[b] - input[a])
    .forEach((key) => (returnData[key] = input[key]));

  return returnData;
};

export default {
  sortItems,
};
