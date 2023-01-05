/*
 Test Flow :
  * should return the initial state when given uknown action
  * should return the threads when given by RECEIVE_USERS action
*/

import { ActionType } from "../../states/users/action";
import { usersReducer } from "../../states/users/reducer";

const globalUsers = [
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
    id: "albert",
    name: "Albert Einstein",
    email: "albert@example.com",
    avatar: "https://generated-image-url.jpg",
  },
];

describe("usersReducers function", () => {
  it("should return the initial state when given uknown action", () => {
    // arrage
    const initialState = {};
    const action = { type: "UNKNOWN" };

    // action
    const nextState = usersReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return the threads when given by RECEIVE_USERS action", () => {
    // arrage
    const initialState = {};
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users: globalUsers,
      },
    };

    // action
    const nextState = usersReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.users);
  });
});
