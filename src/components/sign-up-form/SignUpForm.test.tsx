import { MemoryRouter } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import { fireEvent, render, screen } from "@testing-library/react";

const renderWithRouter = () => {
  return render(
    <MemoryRouter>
      <SignUpForm />
    </MemoryRouter>
  );
};

describe("SignUpForm", () => {
  test("renders the form inputs correctly", () => {
    renderWithRouter();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test("updates form input values correctly", () => {
    renderWithRouter();
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    // Type values into form inputs
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "secretpassword" } });

    // Assert that form input values have been updated
    expect(firstNameInput.value).toBe("John");
    expect(lastNameInput.value).toBe("Doe");
    expect(emailInput.value).toBe("john.doe@example.com");
    expect(passwordInput.value).toBe("secretpassword");
  });

  test('toggles password visibility when "Show password" link is clicked', () => {
    renderWithRouter();
    const passwordInput = screen.getByLabelText(/Password/i);
    const showPasswordLink = screen.getByText(/Show password/i);

    // Password input should initially be of type "password"
    expect(passwordInput.type).toBe("password");

    // Click "Show password" link
    fireEvent.click(showPasswordLink);

    // Password input should now be of type "text"
    expect(passwordInput.type).toBe("text");

    // Click "Show password" link again
    fireEvent.click(showPasswordLink);

    // Password input should revert to type "password"
    expect(passwordInput.type).toBe("password");
  });

  test("submits the form with correct values", () => {
    renderWithRouter();
    const firstNameInput = screen.getByLabelTest(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByText(/Sign in/i);

    // Type values into form inputs
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "secretpassword" } });

    // Submit the form
    fireEvent.click(submitButton);

    // Assert that the form input values are logged correctly in the handleSubmit function
    // You may want to mock console.log and verify the payload against your expectations
    // For this example, we'll just check that the submit event is prevented
    expect(console.log).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "secretpassword",
    });
  });

  // Add more tests as needed for other components or interactions
});
