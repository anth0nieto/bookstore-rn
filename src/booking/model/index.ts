type TutenUserClient = {
  firstName: string;
  lastName: string;
};

type LocationId = {
  streetAddress: string;
};

export type Book = {
  id: number;
  bookingId: number;
  bookingPrice: number;
  bookingTime: string | null;
  tutenUserClient: TutenUserClient;
  locationId: LocationId;
};

export type BookFormated = {
  id: number;
  bookingId: number;
  bookingPrice: number;
  bookingTime: string | null;
  firstName: string;
  lastName: string;
  streetAddress: string;
};
