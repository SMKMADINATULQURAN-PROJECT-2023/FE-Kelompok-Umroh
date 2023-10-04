export interface Profile {
  id: number;
  avatar: string;
  username: string;
  email: string;
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
