import { StateAbbreviation } from "./enums";

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

//Redux Store Types
export interface RootState {
  user: IUserState;
}

export interface IUserState {
  user: IUser | null;
}

export interface ILocation {
  id: number;
  address: string;
  address2: string | null;
  city: String;
  state: StateAbbreviation;
  zipcode: number;
}

export interface IAppUserInformation {
  ssn: number;
  taxDocuments: string[];
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  location: ILocation;
}
