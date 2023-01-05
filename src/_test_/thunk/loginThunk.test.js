/*
 Test Flow :
  * Async login user
    - success to receive user data will triggered addUserActionCreator- failed to receive user data due to non-API error will warning will be triggered
    - failed to receive user data caused API response will triggered alert
*/

import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { loginActionCreator, asyncLoginUser } from "../../states/auth/action";

const fakeSuccessfulLoginResponse = {
  token: "Y78TybuG5rfTFgtu5r5YECrfUG5HR6t7",
};

const fakeFailedLoginResponse = new Error("Ups, something went wrong");

const fakeSuccessGetUserResponse = {
  id: "john_doe",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://generated-image-url.jpg",
};

describe("test async login user", () => {
  beforeEach(() => {
    api._login = api.login;
    api._getUserLogged = api.getUserLogged;
  });

  afterEach(() => {
    api.login = api._login;
    api.getUserLogged = api._getUserLogged;

    delete api.login;
    delete api.getUserLogged;
  });

  it("success to receive user data and triggered loginActionCreator", async () => {
    // arrage
    api.login = () => Promise.resolve(fakeSuccessfulLoginResponse);
    api.getUserLogged = () => Promise.resolve(fakeSuccessGetUserResponse);

    const dispatch = jest.fn();

    // action
    await asyncLoginUser({
      email: "johndoe@gmail.com",
      password: "testpassword",
    })(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(loginActionCreator(fakeSuccessGetUserResponse));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it("failed to receive user data caused API response and triggered alert", async () => {
    // arrage
    api.login = () => Promise.reject(fakeFailedLoginResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    // action
    await asyncLoginUser({
      email: "johndoe@gmail.com",
      password: "testpassword",
    })(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(window.alert).toBeCalledWith("Login failed");
    expect(dispatch).toBeCalledWith(hideLoading());
  });
});
