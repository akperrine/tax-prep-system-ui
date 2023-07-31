import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test.utils";

describe("Home page tests", () => {
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
        <Home />
      </MemoryRouter>,
      {
        preloadedState: {
          user: testDataNoLocation,
        },
      }
    );
    expect(screen.getByText("Welcome Austin")).toBeInTheDocument();
  });
});
