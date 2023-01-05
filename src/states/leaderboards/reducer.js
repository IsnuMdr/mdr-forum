import { ActionType } from "./action";

export const leaderboardsReducer = (leaderboards = [], action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_LEADERBOARDS:
      return action.payload.leaderboards;

    default:
      return leaderboards;
  }
};
