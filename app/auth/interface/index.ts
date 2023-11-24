export interface Profile {
  id: number;
  avatar: string;
  username: string;
  email: string;
  refresh_token: string;
  file_create: any;
  file_edit_profile: any;
  role_id: {
    id: number;
    role_name: string;
    created_at: string;
    updated_at: string;
  };
}

export interface resetPassword {
  refresh_token: string;
  new_password: string;
  confirm_password: string;
}

export interface GetProfileResponse {
  data: Profile;
}

export interface EditProfilePayload
  extends Pick<Profile, "username" | "email" | "file_edit_profile"> {}

export interface ChangePasswordPayload {
  password: string;
}
