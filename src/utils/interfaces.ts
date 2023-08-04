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
