export interface Webinar {
    title: string;
    description: string;
    date: string;
    priceIndividual: number;
    id: number;
  }

  export interface  RegistrationService {
    name: string;
    description: string;
    image: string | null;
    priceCompany: number;
    id: number;
  }

  export interface NewsItem {
    id: number;
    title: string;
    description: string;
    priceCountry: number;
  }