import { Models } from 'appwrite';

export interface User extends Models.User<Models.Preferences> {
    $id: string;
    email: string;
    name: string;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}
