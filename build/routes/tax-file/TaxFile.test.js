import { jsx as _jsx } from "react/jsx-runtime";
import { renderWithProviders } from "../../utils/test.utils";
import { MemoryRouter } from "react-router-dom";
import TaxFile from "./TaxFile";
describe("TaxFile tests", () => {
    const testDataNoTaxDoc = {
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
    beforeEach(() => { });
    test("r", () => {
        const { getByText, store } = renderWithProviders(_jsx(MemoryRouter, { children: _jsx(TaxFile, {}) }), {
            preloadedState: {
                user: testDataNoTaxDoc,
            },
        });
        console.log(store.getState());
        // Test whether navigation links are present
        const fileBtn = getByText("File your taxes");
        // const aboutLink = getByText("File Taxes");
        expect(fileBtn).toBeInTheDocument();
    });
});
