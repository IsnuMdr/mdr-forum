/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable quotes */
/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should handle failed register and call alert when password and password confirm doesn't match
 *   - should call login function when login button is clicked
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterInput from "../../components/RegisterInput";

import "@testing-library/jest-dom";

describe("RegisterInput component", () => {
  it("should handle name typing correctly", async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText("Name");

    // Action
    await userEvent.type(nameInput, "nametest");

    // Assert
    expect(nameInput).toHaveValue("nametest");
  });

  it("should handle email typing correctly", async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText("Email");

    // Action
    await userEvent.type(emailInput, "emailtest");

    // Assert
    expect(emailInput).toHaveValue("emailtest");
  });

  it("should handle failed register and call alert when password and password confirm doesn't match", async () => {
    // Arrange
    const mockRegister = jest.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = await screen.getByPlaceholderText("Name");
    await userEvent.type(nameInput, "nametest");
    const emailInput = await screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "emailtest");
    const passwordInput = await screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "passwordtest");
    const passwordConfirmInput = await screen.getByPlaceholderText("Password confirm");
    await userEvent.type(passwordConfirmInput, "passwordtest2");
    const registerButton = await screen.getByRole("button", { name: "Register" });

    window.alert = jest.fn();

    // Action
    await userEvent.click(registerButton);

    // Assert
    await userEvent.click(registerButton);

    // Assert
    expect(window.alert).toBeCalledWith("Password doesn't match");
  });

  it("should call login function when register button is clicked", async () => {
    // Arrange
    const mockRegister = jest.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = await screen.getByPlaceholderText("Name");
    await userEvent.type(nameInput, "nametest");
    const emailInput = await screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "emailtest");
    const passwordInput = await screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "passwordtest");
    const passwordConfirmInput = await screen.getByPlaceholderText("Password confirm");
    await userEvent.type(passwordConfirmInput, "passwordtest");
    const registerButton = await screen.getByRole("button", { name: "Register" });

    // Action
    await userEvent.click(registerButton);

    // Assert
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toBeCalledWith({
      name: "nametest",
      email: "emailtest",
      password: "passwordtest",
    });
  });
});
