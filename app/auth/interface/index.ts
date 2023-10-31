export interface Profile {
  id: number;
  avatar: string;
  username: string;
  email: string;
  file_create: any;
  role_id: {
    id: number;
    role_name: string;
    created_at: string;
    updated_at: string;
  };
}

export interface GetProfileResponse {
  data: Profile;
}

export interface EditProfilePayload
  extends Pick<Profile, "username" | "email" | "file_create"> {}

export interface ChangePasswordPayload {
  password: string;
}
