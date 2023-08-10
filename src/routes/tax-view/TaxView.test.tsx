import { renderWithProviders } from "../../utils/test.utils";
import { MemoryRouter } from "react-router-dom";
import TaxView from "./TaxView";

describe("TaxView tests", () => {
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

  beforeEach(() => {});

  test("r", () => {
    const { getByText, store } = renderWithProviders(
      <MemoryRouter>
        <TaxView />
      </MemoryRouter>,
      {
        preloadedState: {
          user: testDataNoLocation,
        },
      }
    );

    console.log(store.getState());

    // Test whether navigation links are present
    const fileBtn = getByText("There is currently no tax documents");
    // const aboutLink = getByText("File Taxes");

    expect(fileBtn).toBeInTheDocument();
  });
});
