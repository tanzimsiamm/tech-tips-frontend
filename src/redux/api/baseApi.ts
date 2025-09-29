import envConfig from "@/src/config/envConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../store";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: envConfig.baseApi,
    // baseUrl: 'https://tech-tips-tricks-backend.vercel.app/api',
    baseUrl: 'http://localhost:5000/api',

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  

  tagTypes: ["Posts", "Post", "Users", "User", "Comments", "Notifications"],
  endpoints: () => ({}),
});

export default baseApi;
