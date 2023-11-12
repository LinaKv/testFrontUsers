export interface UserInt {
    id?: number | string;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    last_login?: string | null;
    is_superuser?: boolean;
    password: string;
}

export interface userReq {
    username: string;
    password: string;
}

export interface UserInfo {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    last_login: string | null;
    is_superuser: boolean;
}

export interface UserChangeInfo {
    id?: number | string;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    password?: string;
}

export interface ChangeInfo {
    newUserData: UserChangeInfo;
    id: number;
}
