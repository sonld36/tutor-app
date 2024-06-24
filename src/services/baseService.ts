import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080",
    prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem("token");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
     }),
    tagTypes: ["Course", "CourseVideo"],
    endpoints: () => ({}),
});