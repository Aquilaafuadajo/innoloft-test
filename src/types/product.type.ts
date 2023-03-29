export interface Item {
  name: string;
  id: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  sex: string;
  profilePicture: string;
  position: string;
}

export interface Company {
  name: string;
  logo: string;
  address: {
    country: {
      name: string;
    };
    city: {
      name: string;
    };
    street: string;
    house: string;
    zipCode: string;
    longitude: string;
    latitude: string;
  };
}

export interface Product {
  id?: string;
  name?: string;
  description?: string;
  picture?: string;
  type?: Item;
  categories?: Item[];
  implementationEffortText?: string;
  investmentEffort?: string;
  trl?: Item;
  video?: string;
  businessModels?: Item[];
  user?: User;
  company?: Company;
  [key: string]: any;
}
