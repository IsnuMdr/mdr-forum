export const ActionType = {
  SET_CATEGORY: "SET_CATEGORY",
};

export const setCategoryActionCreator = (category) => ({
  type: ActionType.SET_CATEGORY,
  payload: {
    category,
  },
});
