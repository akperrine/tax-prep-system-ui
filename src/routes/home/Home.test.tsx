import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test.utils";
import { store } from "../../redux/store";
import * as reactRedux from "react-redux";

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

  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

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

    useSelectorMock.mockReturnValue(testDataNoLocation);
    console.log("SStore,", store);
    expect(screen.getByText("Welcome Austin")).toBeInTheDocument();
  });
});
