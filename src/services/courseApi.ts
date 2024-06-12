import { CourseEnrollmentResponse, CourseEnrollmentRootDTO, CourseListResponse, CourseResponse, CourseRootDTO, SingleCourseRootDTO } from "../const/dtos";
import { baseApiSlice } from "./baseService";
import { paymentApiSlice } from "./paymentApi";

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
            async onQueryStarted(courseId, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                if (data.course_enrollment) {
                    await dispatch(
                        paymentApiSlice.endpoints.createPayment
                        .initiate({ transactionId: data.course_enrollment.transaction_id, 
                            amount: 10000 }));
                    
                }
            }
        }),
        getVideo: builder.query<string, { courseId: number, videoId: number }>({
            query: ({ courseId, videoId }) => ({
                url: `/courseapi/video/stream/${courseId}/${videoId}`,
                method: "GET",
                responseHandler: async (response) => {
                    const blob = new Blob([await response.arrayBuffer()], { type: 'video/mp4' });
                    return URL.createObjectURL(blob);
                },
            })
        }),
    }),
    overrideExisting: false,
});

export const { useGetCoursesMutation, useGetCourseThumbnailMutation, useGetCourseMutation, useEnrollCourseMutation, useGetVideoQuery } = courseApiSlice;