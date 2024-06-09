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

