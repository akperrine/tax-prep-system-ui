import { useSelector as useSelectorOriginal } from "react-redux";

export const useSelector = jest.fn();

useSelector.mockReturnValue({});
