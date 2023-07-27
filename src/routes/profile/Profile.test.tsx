import { MemoryRouter } from "react-router-dom";
import Profile from "./Profile";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test.utils";

describe("SignUpForm", () => {
  const testDataWithLocation = {
    id: 1,
    firstName: "Austin",
    lastName: "Perrine",
    email: "a@p.com",
    dob: null,
    ssn: null,
    location: {
      id: 1,
      address: "123 way",
      address2: null,
      city: "Scottsdale",
      state: "AZ",
      zipcode: "11222",
    },
    appUserInformation: {
      id: 1,
      taxDocuments: [],
    },
  };
  const testDataNoLocation = {
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

  it("renders", () => {
    renderWithProviders(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
      {
        preloadedState: {
          user: testDataNoLocation,
        },
      }
    );
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/SSN/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Street address 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Street address 2/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ZIP/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });
  it("renders", () => {
    renderWithProviders(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
      {
        preloadedState: {
          user: testDataNoLocation,
        },
      }
    );
    expect(
      screen.getByText("We're missing some information")
    ).toBeInTheDocument();
  });
});
