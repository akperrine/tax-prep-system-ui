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
  id?: string;
  address: string;
  address2: string | null;
  city: string;
  state: string;
  zipcode: number;
}

export interface IAppUserInformation {
  taxDocuments: string[];
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  location: ILocation;
  ssn: string;
  taxInformation?: IAppUserInformation;
}
