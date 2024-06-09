import { LoginDTO, RegisterDTO, TutorListResponse, TutorResponse, UserResponse, UserRoot } from "../const/dtos";
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
        login: builder.mutation<UserRoot<UserResponse>, UserRoot<LoginDTO>>({
            query: (data: UserRoot<LoginDTO>) => ({
                url: "/accounting/user/login",
                method: "POST",
                body: data,
            })
        }),
        getTutors: builder.mutation<TutorListResponse, number>({
            query: (page: number) => ({
                url: "/accounting/tutor",
                params: { page },
                method: "GET",
            }),
           
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useGetTutorsMutation } = userApiSlice;