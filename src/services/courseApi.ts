import { CourseEnrollmentResponse, CourseEnrollmentRootDTO, CourseListResponse, CourseResponse, CourseRootDTO, CourseVideoResponse, SingleCourseRootDTO, VNPayResponse } from "../const/dtos";
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
        enrollCourse: builder.query<CourseEnrollmentRootDTO<CourseEnrollmentResponse>, number>({
            query: (courseId) => ({
                url: `/courseapi/enrollment/${courseId}`,
                method: "GET",
            })
        }),
        createPaymentEnrollCourse: builder.mutation<VNPayResponse, { courseId: number, price: number }>({
            queryFn: async ({ courseId, price }, { dispatch }) => {
               try {
                const enrolled: CourseEnrollmentRootDTO<CourseEnrollmentResponse> = await dispatch(courseApiSlice.endpoints.enrollCourse.initiate(courseId)).unwrap();
                const createPayment: VNPayResponse = await dispatch(paymentApiSlice.endpoints.createPayment.initiate({ transactionId: enrolled.course_enrollment.transaction_id, amount: price })).unwrap();

                if (!createPayment) {
                    return { error: { status: 404, data: 'Payment not found' } };
                }

                return { data: createPayment as VNPayResponse }
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
               } catch (error: any) {
                if (error.status === 404) {
                  return { error: { status: 404, data: 'Payment not found' } };
                }
                return { error: { status: 500, data: error.message } };
              }


            },
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
    useEnrollCourseQuery, 
    useGetVideoQuery,
    useGetListCourseEnrollQuery,
    useGetCoursesByTutorIdQuery,
    useCreateCourseVideoMutation,
    useCreateCourseMutation, 
    useCreatePaymentEnrollCourseMutation
} = courseApiSlice;