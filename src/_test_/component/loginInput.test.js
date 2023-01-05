/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable quotes */
/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginInput from "../../components/LoginInput";

import "@testing-library/jest-dom";

describe("LoginInput component", () => {
  it("should handle username typing correctly", async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText("Input your email");

    // Action
    await userEvent.type(emailInput, "emailtest");

    // Assert
    expect(emailInput).toHaveValue("emailtest");
  });

  it("should handle password typing correctly", async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText("Input your password");

    // Action
    await userEvent.type(passwordInput, "passwordtest");

    // Assert
    expect(passwordInput).toHaveValue("passwordtest");
  });

  it("should call login function when login button is clicked", async () => {
    // Arrange
    const mockLogin = jest.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = await screen.getByPlaceholderText("Input your email");
    await userEvent.type(emailInput, "emailtest");
    const passwordInput = await screen.getByPlaceholderText("Input your password");
    await userEvent.type(passwordInput, "passwordtest");
    const loginButton = await screen.getByRole("button", { name: "Login" });

    // Action
    await userEvent.click(loginButton);

    // Assert
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: "emailtest",
      password: "passwordtest",
    });
  });
});
