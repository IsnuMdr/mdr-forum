/*
 Test Flow :
  * Async receive threads
    - should dispatch action correctly when data leadeboards fetching success will trigger receiveThreadsActionCreator and receiveUsersActionCreator
    - should dispatch action and call alert correctly when data threads and users fetching failed
*/

import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { receiveThreadsActionCreator } from "../../states/threads/action";
import { receiveUsersActionCreator } from "../../states/users/action";
import { asyncPopulateUsersAndThreads } from "../../states/shared/action";

const fakeUsersResponse = [
  {
    id: "john_doe",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://generated-image-url.jpg",
  },
  {
    id: "jane_doe",
    name: "Jane Doe",
    email: "jane@example.com",
    avatar: "https://generated-image-url.jpg",
  },
  {
    id: "fulan",
    name: "Si Fulan",
    email: "fulan@example.com",
    avatar: "https://generated-image-url.jpg",
  },
];

const fakeThreadsResponse = [
  {
    id: "thread-1",
    title: "Thread Pertama",
    body: "Ini adalah thread pertama",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    ownerId: "users-1",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: "thread-2",
    title: "Thread Kedua",
    body: "Ini adalah thread kedua",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    ownerId: "users-2",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("test async receive threads", () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    delete api.getAllUsers;
    delete api.getAllThreads;
  });

  it("should dispatch action correctly when data leadeboards fetching success will trigger receiveThreadsActionCreator and receiveUsersActionCreator", async () => {
    // arrage
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);

    const dispatch = jest.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toBeCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it("should dispatch action and call alert correctly when data threads and users fetching failed", async () => {
    // arrage
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(window.alert).toBeCalledWith(fakeErrorResponse.message);
    expect(dispatch).toBeCalledWith(hideLoading());
  });
});
