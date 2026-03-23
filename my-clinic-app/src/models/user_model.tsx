export interface UserModel {
    id: number;
    username: string;
    mobile: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    dob: string | null;
    gender: string | null;
    role: 'clinic_admin' | 'admin' | 'staff'; // Add other roles as needed
    profile_url: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface LoginResponse {
    message: string;
    tokens: {
        refresh: string;
        access: string;
    };
    user: UserModel;
}