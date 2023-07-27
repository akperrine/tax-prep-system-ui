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
import { renderWithProviders } from "../../utils/test.utils";

describe("Login Component", () => {
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
  it("should render", () => {
    renderWithProviders(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
      {
        preloadedState: {
          user: testDataEmpty,
        },
      }
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
  it("should update email and password", async () => {
    const { getByLabelText, getByRole } = renderWithProviders(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
      {
        preloadedState: {
          user: testDataEmpty,
        },
      }
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
    const { getByText, getByLabelText } = renderWithProviders(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
      {
        preloadedState: {
          user: testDataEmpty,
        },
      }
    );
    const passwordInput = getByLabelText(/password/i);
    const showPasswordButton = getByText(/show password/i);

    expect(passwordInput.type).toBe("password");
    fireEvent.click(showPasswordButton);
    expect(passwordInput.type).toBe("text");
    fireEvent.click(showPasswordButton);
    expect(passwordInput.type).toBe("password");
  });
});
