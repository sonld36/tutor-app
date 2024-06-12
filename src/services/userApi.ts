import { AccountResponse, LoginDTO, LoginResponse, RegisterDTO, TutorListResponse, TutorResponse, UserResponse, UserRoot } from "../const/dtos";
import { baseApiSlice } from "./baseService";

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
            transformResponse(baseQueryReturnValue: LoginResponse, meta, arg) {
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
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useGetTutorsMutation, useCheckInitUserQuery } = userApiSlice;