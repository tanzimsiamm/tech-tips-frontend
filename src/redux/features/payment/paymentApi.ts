import baseApi from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentIntent: builder.mutation({
      query: (payload: { totalCost: number; currency: string }) => ({
        url: `/payments/create-payment-intent`,
        method: "POST",
        body: payload,
      }),
    }),

    savePayment: builder.mutation({
      query: (payload) => ({
        url: `/payments`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User", "Users"],
    }),

     getPaymentHistories: builder.query({
      query: (email: string) => ({
        url: `/payments?userEmail=${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPaymentIntentMutation, useSavePaymentMutation, useGetPaymentHistoriesQuery } = paymentApi;
export default paymentApi;
