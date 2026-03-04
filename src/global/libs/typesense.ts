// typesense.ts
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const protocolAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY ?? "",
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST ?? "",
        port: parseInt(process.env.NEXT_PUBLIC_TYPESENSE_PORT ?? "443"),
        protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL ?? "http",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "title,tags,content",
    sort_by: "created_at:desc",
    prefix: true,
    per_page: 10,
  },
});

const threadAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY ?? "",
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST ?? "",
        port: parseInt(process.env.NEXT_PUBLIC_TYPESENSE_PORT ?? "443"),
        protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL ?? "http",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "title,tags,body",
    sort_by: "created_at:desc",
    prefix: true,
    per_page: 10,
  },
});

export const searchClients = {
  protocols: protocolAdapter.searchClient,
  threads: threadAdapter.searchClient,
};
