export interface UserState {
    username: string;
    email: string;
    userId: string;
    birth: string;
    gender: Gender;
    address: string;
    avatarPath: string;
}

export enum Gender {
    MALE, FEMALE, OTHER
}

