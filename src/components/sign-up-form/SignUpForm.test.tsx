import { MemoryRouter } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test.utils";

describe("SignUpForm", () => {
  const testDataEmpty = null;
  const testData = {
    id: 1,
    firstName: "Austin",
    lastName: "Perrine",
    email: "a@p.com",
    dob: null,
    ssn: null,
    location: null,
    appUserInformation: {
      id: 1,
      taxDocuments: [],
    },
  };
  test("renders the form inputs correctly", () => {
    renderWithProviders(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>,
      {
        preloadedState: {
          user: testData,
        },
      }
    );

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test("updates form input values correctly", () => {
    renderWithProviders(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>,
      {
        preloadedState: {
          user: testDataEmpty,
        },
      }
    );

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
    renderWithProviders(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>,
      {
        preloadedState: {
          user: testDataEmpty,
        },
      }
    );
    const passwordInput = screen.getByLabelText(/Password/i);
    const showPasswordLink = screen.getByText(/Show password/i);

    // Password input should initially be of type "password"
    expect(passwordInput.type).toBe("password");
    fireEvent.click(showPasswordLink);
    expect(passwordInput.type).toBe("text");
    fireEvent.click(showPasswordLink);
    expect(passwordInput.type).toBe("password");
  });
});
