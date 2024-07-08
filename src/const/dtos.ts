import { Gender } from "./types";

export interface UserRoot<T> {
    user: T;
}

export interface RegisterDTO {
    username: string;
    email: string;
    password: string;
    firstName: string;
    gender?: Gender;
    lastName?: string;
    birth?: Date;
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
    code: string;
    message: string;
    payment_url: string;
}

export interface LoginResponse {
    login: {
        access_token: string;
    }
}

export interface AccountResponse {
    account: {
        id: number;
        fistname: string;
        lastname: string;
        user_id: string;
        role: string;
        email: string;
        birth: Date;
        gender: Gender;
        address: string;
        avatar_path: string;
        created_at: Date;
        modified_at: Date;
    }
}

export interface TimeDTO {
    hour_of_day: number;
    time_string: string;
    day_name: string;
    day_of_week: number;
    day_of_month: number;
    week_of_year: number;
    _month: number;
    month_name: string;
    quarter: number;
    _year: number;
}

export interface AvailabilityDTO {
    id: number;
    is_available: boolean;
    status: string;
    tutor: TutorResponse;
    time: TimeDTO;
}

export interface AvailabilityScheduleResponse {
    availabilities: {
        availabilities: AvailabilityDTO[];
    }
}

export interface AppointmentsResponse {
    appointment: {
        availabilities: AvailabilityDTO[];
    }
}

export interface Schedule {
    time_key: number;
            is_available: boolean;
}

export interface ScheduleCreateDTO {
    availability_schedules: {
        availabilities: Schedule[]
    }
}

export interface BookingResponse {
    availabilities_booked: {
        transaction_id: number;
    }
}
