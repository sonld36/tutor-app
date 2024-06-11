import { CourseEnrollmentResponse, CourseEnrollmentRootDTO, CourseListResponse, CourseResponse, CourseRootDTO, SingleCourseRootDTO } from "../const/dtos";
import { baseApiSlice } from "./baseService";

export const courseApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourses: builder.mutation<CourseRootDTO<CourseListResponse>, number>({
            query: (page: number) => ({
                url: "/courseapi/course",
                method: "GET",
                params: { page, size: 10 }
            })
        
        }),
        getCourseThumbnail: builder.mutation<Blob, string>({
            query: (thumbnailPath: string) => ({
                url: `/courseapi/course/thumbnail`,
                method: "GET",
                params: { thumbnailPath }
            })
        }),
        getCourse: builder.mutation<SingleCourseRootDTO<CourseResponse>, number>({
            query: (courseId: number) => ({
                url: `/courseapi/course/${courseId}`,
                method: "GET",
            }),
        }),
        enrollCourse: builder.mutation<CourseEnrollmentRootDTO<CourseEnrollmentResponse>, number>({
            query: (courseId: number) => ({
                url: `/courseapi/enrollment/${courseId}`,
                method: "GET",
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetCoursesMutation, useGetCourseThumbnailMutation, useGetCourseMutation, useEnrollCourseMutation } = courseApiSlice;