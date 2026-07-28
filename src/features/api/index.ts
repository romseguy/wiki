import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import baseQuery, { objectToQueryString } from "utils/query";

export const api = createApi({
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Orgs", "Events", "Projects", "Topics", "Users"],
  endpoints: (build) => ({
    getOrg: build.query<IOrg, GetOrgParams>({
      query: ({ orgUrl, ...query }) => {
        console.groupCollapsed("getOrg");
        console.log("orgUrl", orgUrl);
        console.log("hash", query.hash);
        console.log("populate", query.populate);
        console.groupEnd();

        return {
          url: `org/${orgUrl}${
            Object.keys(query).length > 0
              ? `?${objectToQueryString(query)}`
              : ""
          }`,
        };
      },
      providesTags: (result, error, params) => [
        { type: "Orgs" as const, id: result?._id },
      ],
    }),
    getTopics: build.query<ITopic, {}>({
      query: () => {
        return {
          url: "topics",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Topics" as const,
                id: _id,
              })),
              { type: "Topics", id: "LIST" },
            ]
          : [{ type: "Topics", id: "LIST" }],
    }),
  }),
});

export const {
  useGetOrgQuery,
  useGetTopicsQuery,
  util: { getRunningQueriesThunk },
} = api;

export const { getOrg } = api.endpoints;
