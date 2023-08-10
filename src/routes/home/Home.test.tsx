import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test.utils";
import { store } from "../../redux/store";
import { useSelector } from "react-redux/es/hooks/useSelector";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("Home page tests", () => {
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

  it("renders with user name", async () => {
    const { store } = renderWithProviders(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
      {
        preloadedState: {
          user: testDataNoLocation,
        },
      }
    );

    expect(store.getState().user.firstName).toContain("Austin");
  });
});
