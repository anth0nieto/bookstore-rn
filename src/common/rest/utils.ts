import { HTTP_GET_METHOD } from "@bookstore/common/constants";

export type HttpOptions = {
  method: string;
  body?: any;
  headers?: { [key: string]: string };
};

export type FetchOptions = {
  baseUrl?: string;
  url: string;
  httpOptions?: HttpOptions;
};

export const buildRequest = (httpOptions?: HttpOptions) => {
  const defaultHeaders = {
    app: "APP_BCK",
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return {
    method: httpOptions?.method ?? HTTP_GET_METHOD,
    headers: {
      ...defaultHeaders,
      ...httpOptions?.headers,
    },
    body: JSON.stringify(httpOptions?.body),
  };
};

export const validateResponseStatus = async (response: Response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const executeFetch = async (url: URL, httpOptions?: HttpOptions) => {
  const requestInit = buildRequest(httpOptions);
  return fetch(url.toString(), requestInit)
    .then((response) => {
      if (response.ok) return response;
      throw Error(response.statusText);
    })
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
      }
    });
};
