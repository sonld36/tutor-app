import { VNPayResponse } from "../const/dtos";
import { baseApiSlice } from "./baseService";

export const paymentApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation<VNPayResponse, { transactionId?: number, amount: number }>({
            query: ({ transactionId, amount }) => ({
                url: `/payment/integration/vn-pay/${transactionId}`,
                method: "GET",
                params: {amount, bank_code: "NCB"},
                
            }),
            transformResponse(baseQueryReturnValue: VNPayResponse, meta, arg) {
                if (baseQueryReturnValue.vnpay_response) {
                    window.location.href
                    = baseQueryReturnValue.vnpay_response.payment_url;
                }
                return baseQueryReturnValue;
            }
        }),
    }),
    overrideExisting: false,
});

export const { useCreatePaymentMutation } = paymentApiSlice;