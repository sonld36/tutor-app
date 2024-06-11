import { VNPayResponse } from "../const/dtos";
import { baseApiSlice } from "./baseService";

export const paymentApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation<VNPayResponse, { transactionId: number, amount: number }>({
            query: ({ transactionId, amount }) => ({
                url: `/payment/integration/vn-pay/${transactionId}`,
                method: "GET",
                params: {amount, bank_code: "NCB"},
                
            })
        }),
    }),
    overrideExisting: false,
});

export const { useCreatePaymentMutation } = paymentApiSlice;