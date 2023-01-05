/* eslint-disable no-undef */
/**
 * test scenario for leadeboard
 *
 * leaderboardReducer function
 *  - should return the initial state when given uknown action
 *  - should return the leaderboards when given RECEIVE_LEADERBOARD action
 *
 */

import { leaderboardsReducer } from "../../states/leaderboards/reducer";

describe("leaderboards function", () => {
  it("should return the initial state when given uknown action", () => {
    const initialState = [];
    const action = { type: "UKNOWN" };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the leaderboards when given RECEIVE_LEADERBOARD action", () => {
    const initialState = [];
    const action = {
      type: "RECEIVE_LEADERBOARDS",
      payload: {
        leaderboards: [
          {
            user: {
              id: "users-1",
              name: "John Doe",
              email: "john@example.com",
              avatar: "https://generated-image-url.jpg",
            },
            score: 10,
          },
        ],
      },
    };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
