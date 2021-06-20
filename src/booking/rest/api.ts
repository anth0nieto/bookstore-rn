import { HTTP_GET_METHOD } from "@bookstore/common/constants";
import customFetch from "@bookstore/common/rest/custom-fetch";
import { Book, BookFormated } from "@bookstore/booking/model";

export const getBooks = async (token: string, adminemail: string) => {
  const httpOptions = {
    method: HTTP_GET_METHOD,
    headers: {
      token,
      adminemail,
    },
  };

  try {
    const data = await customFetch<Book[]>({
      url: `user/contacto%40tuten.cl/bookings?current=true`,
      httpOptions,
    });

    const booksFormated: BookFormated[] = data.map((book) => ({
      ...book,
      id: book.bookingId,
      firstName: book.tutenUserClient.firstName,
      lastName: book.tutenUserClient.lastName,
      streetAddress: book.locationId.streetAddress,
    }));

    return booksFormated;
  } catch (error) {
    throw error;
  }
};
