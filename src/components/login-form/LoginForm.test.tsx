import "@testing-library/react";
import { fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("Login Component", () => {
  it("should submit email and password", () => {
    // Mock login function
    const mockLogin = jest.fn();
    render(<LoginForm />);

    // Render the Login component
    const { getByLabelText, getByText } = render(<LoginForm />);

    // Find input fields and submit button
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const signInButton = getByText("Sign In");

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Simulate form submission
    fireEvent.click(signInButton);

    // Check if login function was called with correct email and password
    expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
  });
});
