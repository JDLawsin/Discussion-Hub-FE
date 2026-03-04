import ApiRequestBuilder from "./axios";

export const fetcher = <T>(url: string) =>
  new ApiRequestBuilder<T>().setUrl(url).send();
