/* eslint-disable no-undef */
/**
 * test scenario for threadReducer
 *
 * -thread reducer function
 *  - should return the initial state when given uknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the threads with the new thread when given by ADD_THREAD action
 *  - should return the threads with the toggle upvote thread when given by
 *    VOTE_UP_THREAD action
 *  - should return the threads with the toggle downvote thread when given by
 *    DOWNVOTE_THREAD action
 *
 */

import { threadsReducer } from "../../states/threads/reducer";

describe("threadReducers function", () => {
  it("should return the initial state when given uknown action", () => {
    // arrange
    const initialState = [];
    const action = { type: "UKNOWN" };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return the threads when given by RECEIVE_THREADS action", () => {
    // arrange
    const initialState = [];
    const action = {
      type: "RECEIVE_THREADS",
      payload: {
        threads: [
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
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it("should return the threads with the new thread when given by ADD_THREAD action", () => {
    // arrange
    const initialState = [
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
    ];

    const action = {
      type: "ADD_THREAD",
      payload: {
        thread: [
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
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([...initialState, action.payload.thread]);
  });

  it("should return the threads with the upvote thread when given by VOTE_UP_THREAD action", () => {
    // arrange
    const initialState = [
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
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: "VOTE_UP_THREAD",
      payload: {
        userId: "users-1",
        threadId: "thread-1",
      },
    };

    // action : upVote
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState.find((thread) => thread.id === action.payload.threadId).upVotesBy).toContain(
      action.payload.userId
    );
  });

  it("should return the threads with the downvote thread when given by DOWNVOTE_THREAD action", () => {
    // arrange
    const initialState = [
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
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: "VOTE_DOWN_THREAD",
      payload: {
        userId: "users-1",
        threadId: "thread-2",
      },
    };

    // action : downVote
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState.find((thread) => thread.id === action.payload.threadId).downVotesBy).toContain(
      action.payload.userId
    );
  });

  it("should return threads not contain user id in upVotesBy and downVotesBy property when given action type NEUTRAL_THREAD", () => {
    // Arrange
    const initialState = [
      {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2022-06-21T07:00:00.000Z",
        ownerId: "users-404",
        upVotesBy: ["users-1"],
        downVotesBy: ["users-2"],
        totalComments: 0,
      },
    ];
    const actionNeutralUpVote = {
      type: "NEUTRAL_THREAD",
      payload: {
        threadId: initialState[0].id,
        userId: "users-1",
      },
    };
    const actionNeutralDownVote = {
      type: "NEUTRAL_THREAD",
      payload: {
        threadId: initialState[0].id,
        userId: "users-2",
      },
    };

    // Action
    const resultNeutralUpVote = threadsReducer(initialState, actionNeutralUpVote);
    const resultNeutralDownVote = threadsReducer(initialState, actionNeutralDownVote);

    // Assert
    expect(resultNeutralUpVote[0].upVotesBy).toEqual([]);
    expect(resultNeutralDownVote[0].downVotesBy).toEqual([]);
  });
});
