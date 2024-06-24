import { CourseEnrollmentResponse, CourseEnrollmentRootDTO, CourseListResponse, CourseResponse, CourseRootDTO, CourseVideoResponse, SingleCourseRootDTO } from "../const/dtos";
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
        getCourse: builder.query<SingleCourseRootDTO<CourseResponse>, number>({
            query: (courseId: number) => ({
                url: `/courseapi/course/${courseId}`,
                method: "GET",
            }),
            providesTags: (result, error, args) => [{ type: "CourseVideo", id: result?.course.id }],
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
                    if (response.status !== 400) {
                        return "Something went wrong or you are not enroll this course";
                    }
                    const blob = new Blob([await response.arrayBuffer()], { type: 'video/mp4' });
                    return URL.createObjectURL(blob);
                },
            
            }),
        }),

        getListCourseEnroll: builder.query<CourseRootDTO<CourseListResponse>, { page: number, size: number}>({
            query: ({
                page, size
            }) => ({
                url: "/courseapi/course/enrolled",
                method: "GET",
                params: { page, size },
                transformResponse: (response: CourseRootDTO<CourseListResponse>) => {
                    return response.courses;
                }
            })
        }),

        getCoursesByTutorId: builder.query<CourseRootDTO<CourseListResponse>, { tutorId: string, page: number, size: number}>({
            query: ({ tutorId, page, size, }) => ({
                url: `/courseapi/course/tutor/${tutorId}`,
                method: "GET",
                params: { page, size },
            }),
            providesTags: ["Course"],
        }),

        createCourseVideo: builder.mutation<{
            course_video: CourseVideoResponse,
        }, FormData>({
            query: (body) => ({
                url: `/courseapi/video`,
                method: "POST",
                body: body,
            }),
            invalidatesTags: (result, error, args) => [{ type: "CourseVideo", id: result?.course_video.course_id }],
        }),

        createCourse: builder.mutation<CourseResponse, FormData>({
            query: (body) => ({
                url: `/courseapi/course/create`,
                method: "POST",
                body: body,
            }),
            invalidatesTags: (result, error, args) => [{ type: "Course"}],
        }),
    }),
    overrideExisting: false,
});

export const { useGetCoursesMutation, 
    useGetCourseThumbnailMutation, 
    useGetCourseQuery, 
    useEnrollCourseMutation, 
    useGetVideoQuery,
    useGetListCourseEnrollQuery,
    useGetCoursesByTutorIdQuery,
    useCreateCourseVideoMutation,
    useCreateCourseMutation
} = courseApiSlice;