import { AccountResponse, AppointmentsResponse, AvailabilityScheduleResponse, BookingResponse, LoginDTO, LoginResponse, RegisterDTO, ScheduleCreateDTO, TutorListResponse, TutorResponse, UserResponse, UserRoot, VNPayResponse } from "../const/dtos";
import { baseApiSlice } from "./baseService";
import { paymentApiSlice } from "./paymentApi";

export const userApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data: RegisterDTO) => ({
                url: "/accounting/user/create",
                method: "POST",
                body: data,
            })
        }),
        login: builder.mutation<LoginResponse, UserRoot<LoginDTO>>({
            query: (data: UserRoot<LoginDTO>) => ({
                url: "/accounting/user/login",
                method: "POST",
                body: data,
            }),
            transformResponse(baseQueryReturnValue: LoginResponse) {
                if (baseQueryReturnValue.login) {
                    localStorage.setItem("token", baseQueryReturnValue.login.access_token);
                }
                
                return baseQueryReturnValue;
            },
        }),
        getTutors: builder.mutation<TutorListResponse, number>({
            query: (page: number) => ({
                url: "/accounting/tutor",
                params: { page },
                method: "GET",
            }),
        }),

        checkInitUser: builder.query<AccountResponse, void>({
            query: () => ({
                url: "/accounting/user",
                method: "GET",
            }),
        }),

        availableTimeBySelf: builder.query<AvailabilityScheduleResponse, null>({
            query: () => ({
                url: `/accounting/availability-schedule`,
                method: "GET",
            }),
        }),

        availableTimeByTimeKey: builder.query<AvailabilityScheduleResponse, { timeKey: number; tutorId: string }>({
            query: ({timeKey, tutorId}) => ({
                url: `/accounting/availability-schedule/${tutorId}`,
                method: "GET",
                params: { timeKey },
            }),
        }),
        createAvailabilityTime: builder.mutation<void, ScheduleCreateDTO>({
            query: (data: ScheduleCreateDTO) => ({
                url: "/accounting/availability-schedule",
                method: "PUT",
                body: data,
            }),
        }),
        bookingCall: builder.query<BookingResponse, { tutorId: string; timeKeys: number[] }>({
            query: ({ tutorId, timeKeys }) => ({
                url: `/accounting/availability-schedule/register/${tutorId}`,
                method: "GET",
                params: { timeKeys: timeKeys.join(",") },
            }),
        }),

        createBookingCall: builder.mutation<VNPayResponse, { tutorId: string; timeKeys: number[] }>({
            queryFn: async (props, { dispatch }) => {
                try {
                    const booking: BookingResponse = await dispatch(userApiSlice.endpoints.bookingCall.initiate({ tutorId: props.tutorId, timeKeys: props.timeKeys }, {subscribe: false, forceRefetch: true})).unwrap();
                    const transactionId = booking.availabilities_booked.transaction_id;
          
                    const payment = await dispatch(paymentApiSlice.endpoints.createPayment.initiate({ transactionId, amount: 100000 })).unwrap();
          
                    if (!payment) {
                      return { error: { status: 404, data: 'Payment not found' } };
                    }
          
                    return { data: payment as VNPayResponse };
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  } catch (error: any) {
                    if (error.status === 404) {
                      return { error: { status: 404, data: 'Payment not found' } };
                    }
                    return { error: { status: 500, data: error.message } };
                  }
            },
        }),

        getAppointments: builder.query<AppointmentsResponse, { page: number, size: number }>({
            query: (
                { page, size },
            ) => ({
                url: "/accounting/user/appointment",
                method: "GET",
                params: { page, size },
            }),
        }),
    }),
    overrideExisting: true,
});

export const { useLoginMutation, useGetTutorsMutation, useCheckInitUserQuery, useAvailableTimeBySelfQuery, useAvailableTimeByTimeKeyQuery, useCreateAvailabilityTimeMutation, useBookingCallQuery, useCreateBookingCallMutation, useGetAppointmentsQuery } = userApiSlice;