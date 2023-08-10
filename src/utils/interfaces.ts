import { Dispatch, SetStateAction } from "react";

//DTOs
export interface ILoginUserDTO {
  email: string;
  password: string;
}

export interface ISignUpUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ITaxDocumentsDto {
  userId: string;
  maritalStatus: string;
  formW2s: IW2[];
  form1099s: I1099[];
}

//Redux Store Types
export interface RootState {
  user: IUserState;
}

export interface IUserState {
  user: IUser | null;
}

export interface ILocation {
  id?: string;
  address: string;
  address2: string | null;
  city: string;
  state: string;
  zipcode: number;
}

export interface ITaxDocuments {
  taxesOwed: number;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  location: ILocation;
  ssn: string;
  taxDocuments?: ITaxDocuments[];
}

export interface IW2 {
  employerEIN: string;
  income: number;
  witheld?: number;
  location: ILocation;
}

export interface I1099 {
  payerTIN: string;
  income: number;
  decductions?: number;
  location: ILocation;
}

export interface ITaxFormData {
  filingStatus: string;
  w2Income: string;
  w2Witheld: string;
  w2Address1: string;
  w2Address2: string;
  w2City: string;
  w2State: string;
  w2Zipcode: string;
  ten99Income: string;
  ten99Deductions: string;
  ten99Address1: string;
  ten99Address2: string;
  ten99City: string;
  ten99State: string;
  ten99Zipcode: string;
}

export interface IProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  day: string;
  month: string;
  year: string;
  ssn: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
}

// Props

export interface IW2FormProps {}

export interface ITen99FormProps {
  formData: ITaxFormData;
  handleChange: () => {};
  setIsInvalid: Dispatch<SetStateAction<boolean>>;
}
