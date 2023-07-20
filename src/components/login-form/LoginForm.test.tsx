import "@testing-library/react";
import {
  fireEvent,
  getAllByText,
  getByLabelText,
  getByRole,
  render,
  screen,
} from "@testing-library/react";
import LoginForm from "./LoginForm";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

describe("Login Component", () => {
  it("should render", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const emailLabel = screen.getByLabelText("Email");
    const passwordLabel = screen.getByLabelText("Password");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const signInButton = screen.getByRole("button", { name: "Sign in" });

    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });
  it("should submit email and password", async () => {
    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    // Find input fields and submit button
    // const form = screen.getByTestId("custom-element");
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const signInButton = getByRole("button", { name: "Sign in" });

    // Simulate user input
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    });

    await act(async () => {
      fireEvent.click(signInButton);
    });

    // expect(console.log).toHaveBeenCalledWith("form submitted");
    // expect(console.log).toHaveBeenCalledWith("form submitted");
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("testpassword");
  });
  it("toggles password visibility", () => {
    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const passwordInput = getByLabelText(/password/i);
    const showPasswordButton = getByText(/show password/i);

    // Initially, the password input type should be "password"
    expect(passwordInput.type).toBe("password");

    // Click on the "Show password" link
    fireEvent.click(showPasswordButton);

    // After clicking, the password input type should be "text"
    expect(passwordInput.type).toBe("text");

    // Click on the "Hide password" link
    fireEvent.click(showPasswordButton);

    // After clicking again, the password input type should be "password"
    expect(passwordInput.type).toBe("password");
  });
});
