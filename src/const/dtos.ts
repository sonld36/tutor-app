import { Gender } from "./types";

export interface UserRoot<T> {
    user: T;
}

export interface RegisterDTO {
    username: string;
    email: string;
    password: string;
    firstName: string;
    gender: Gender;
    lastName?: string;
    birth: Date;
    address?: string;
}

export interface LoginDTO {
    username: string;
    password: string;
}

export interface UserResponse {
    username: string;
    email: string;
    user_id: string;
    birth: string;
    gender: Gender;
    address: string;
    avatar_path: string;
}

export interface TutorResponse extends UserResponse {
    rating: number;
    description: string;
    first_name: string;
    last_name: string;
    teach_fee: number;
    subject: string;
}

export interface TutorRootDTO<T> {
    tutor: T;
}

export interface TutorListRootDTO<T> {
    tutors: T[];
    total: number;
    page: number;
}

export interface TutorListResponse {
    tutors: TutorListRootDTO<TutorResponse>;
}

export interface CourseRootDTO<T> {
    courses: T;
}

export interface SingleCourseRootDTO<T> {
    course: T;
}

export interface CourseListResponse {
    page: number;
    size: number;
    total_page: number;
    total_element: number;
    courses: CourseResponse[];
}

export interface CourseVideoResponse {
    id: number;
    course_id: number;
    title: string;
    description: string;
    video_url: string;
    status: string;
    duration: number;
    numberOfOrder: number;
    thumbnail_url: string;
    created_at: Date;
    modified_at: Date;
}


export interface CourseResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    thumbnail_path: string;
    status: string;
    subject: string;
    tutor: TutorResponse;
    course_videos: CourseVideoResponse[];
    created_at: Date;
    modified_at: Date;
}

export interface CourseEnrollmentResponse {
    
    id: number;
    course_id: number;
    student_id: number;
    transaction_id: number;
    enrollment_date: Date;
    status: string;
    created_at: Date;
    modified_at: Date;
}

export interface CourseEnrollmentRootDTO<T> {
    course_enrollment: T;
}

export interface VNPayResponse {
    vnpay_response: {
        code: string;
    message: string;
    payment_url: string;
    }
}

