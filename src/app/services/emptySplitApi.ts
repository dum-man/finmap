import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const emptySplitApi = createApi({
  reducerPath: "emptySplitApi",
  tagTypes: ["Accounts", "Transactions", "Transfers", "Categories"],
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
});
