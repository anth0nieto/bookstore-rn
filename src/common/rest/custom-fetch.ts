import { FetchOptions, executeFetch } from "./utils";
import { BASE_URL } from "./base-url";

const customFetch = async <T>(options: FetchOptions): Promise<T> => {
  const { httpOptions, url } = options;
  const targetUrl = new URL(`${url}`, BASE_URL);
  const result = await executeFetch(targetUrl, httpOptions);
  return result;
};

export default customFetch;
