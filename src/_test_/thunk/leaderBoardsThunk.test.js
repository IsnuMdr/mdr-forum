/**
 * scenario test for asyncReceiveLeaderboard thunk
 *
 * - asyncReceiveLeaderboard thunk
 *  - should dispatch action correctly when data leadeboards fetching success
 *  - should dispatch action and call alert correctly when data leaderboards fetching failed
 */
import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import {
  asyncReceiveLeaderboard,
  receiveLeaderboardsActionCreator,
} from "../../states/leaderboards/action";

const fakeLeaderboardsResponse = [
  {
    user: {
      id: "users-1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    },
    score: 10,
  },
];

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("asyncReceiveLeaderboard thunk", () => {
  beforeEach(() => {
    api._getLeadeboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeadeboards;

    delete api.getLeaderboards;
  });

  it("should dispatch action correctly when data leadeboards fetching success", async () => {
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);

    const dispatch = jest.fn();
    await asyncReceiveLeaderboard()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call alert correctly when data leaderboards fetching failed", async () => {
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();

    window.alert = jest.fn();

    await asyncReceiveLeaderboard()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
